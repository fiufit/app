import {singIn} from "../../firebase";

class AuthenticationController{
    constructor(user) {
        this.user = user;
    }

    async getUserData(){
        const {uid, stsTokenManager} = this.user;
        const userResponse = await fetch(`https://fiufit-gateway.fly.dev/v1/users/${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${stsTokenManager.accessToken}`
            },
        });

        return await userResponse.json();
    }

    async sendVerificationMail(){
        const {stsTokenManager} = this.user;
        //TODO: add apikey to .env file
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${'AIzaSyDbXF3gPXW-uggq-Fhsu_ANVgE-1mCYLcI'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: stsTokenManager.accessToken
            })
        });
        const data = await response.json()
        console.log(data)
        return data;
    }

    async startRegister(email, password){
        const response = await fetch(`https://fiufit-gateway.fly.dev/v1/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password.trim()
            })
        });
        const data = await response.json();
        if(data.error){
            throw data.error
        } else {
            await singIn(email, password);
        }
    }

    async finishRegister(userData){
        const accessToken = this.user.stsTokenManager.accessToken;
        const response = await fetch(`https://fiufit-gateway.fly.dev/v1/users/finish-register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(data)
        if(data.error){
            throw data.error
        } else {
            return data;
        }
    }


}

export default AuthenticationController;


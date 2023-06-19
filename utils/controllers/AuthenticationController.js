import {singIn} from "../../firebase";
import RequestController from "./RequestController";
import Constants from 'expo-constants';
const {emailVerifyUrl} = Constants.manifest.extra;

class AuthenticationController{
    constructor(user) {
        this.user = user;
        this.requestController = new RequestController(user);
    }

    async sendVerificationMail(){
        const {stsTokenManager} = this.user;
        //TODO: add apikey to .env file
        const response = await fetch(emailVerifyUrl, {
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
        const data = await this.requestController
            .fetch('users/register', "POST", {
                email: email.trim(),
                password: password.trim()
            });

        if(data.error){
            throw data.error
        } else {
            await singIn(email, password);
        }
    }

    async finishRegister(userData){
        const data = await this.requestController
            .fetch('users/finish-register', "POST", userData);

        console.log(data)
        if(data.error){
            throw data.error
        } else {
            return data;
        }
    }


}

export default AuthenticationController;


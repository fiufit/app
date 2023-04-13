class ProfileController{
    constructor(user) {
        this.user = user;
    }

    async updateProfile(updatedProfileData){
        const {stsTokenManager} = this.user;
        const patchResponse = await fetch(`https://fiufit-gateway.fly.dev/v1/users`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${stsTokenManager.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProfileData)
        });

        return await patchResponse.json();
    }
}

export default ProfileController;

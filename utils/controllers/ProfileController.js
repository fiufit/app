import RequestController from "./RequestController";

class ProfileController {
    constructor(user) {
        this.user = user;
        this.requestController = new RequestController(user);
    }

    async updateProfile(updatedProfileData) {
        return await this.requestController
            .fetch('users', "PATCH", updatedProfileData)
    }

    async getFollowers(userId = null){
        return await this.requestController
            .fetch(`users/${userId ?? this.user.uid}/followers`, "GET");
    }
}

export default ProfileController;

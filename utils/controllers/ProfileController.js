import RequestController from "./RequestController";

class ProfileController {
    constructor(user) {
        this.user = user;
        this.requestController = new RequestController(user);
    }

    async getProfileData(){
        return await this.requestController
            .fetch(`users/${this.user.uid}`, "GET");
    }

    async updateProfile(updatedProfileData) {
        return await this.requestController
            .fetch('users', "PATCH", updatedProfileData)
    }

    async getFollowers(userId = null){
        return await this.requestController
            .fetch(`users/${userId ?? this.user.uid}/followers`, "GET");
    }

    async getFollowing(userId = null){
        return await this.requestController
            .fetch(`users/${userId ?? this.user.uid}/followed`, "GET");
    }

    async followUser(userId) {
        return await this.requestController
            .fetch(`users/${userId}/followers`, "POST");
    }

    async unfollowUser(userId) {
        return await this.requestController
            .fetch(`users/${userId}/followers`, "DELETE");
    }
}

export default ProfileController;

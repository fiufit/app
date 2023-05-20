import RequestController from "./RequestController";

class ReviewController {
  constructor(user) {
    this.user = user;
    this.requestController = new RequestController(user);
  }

  async getReviews(trainingId) {
    return await this.requestController.fetch(
      `trainings/${trainingId}/reviews`,
      "GET"
    );
  }
}

export default ReviewController;

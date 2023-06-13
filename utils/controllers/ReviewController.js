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

  async postReview(trainingId, rating, comment) {
    return await this.requestController.fetch(
      `trainings/${trainingId}/reviews`,
      "POST",
      { score: rating, comment }
    );
  }

  async updateReview(trainingId, reviewId, rating, comment) {
    return await this.requestController.fetch(
      `trainings/${trainingId}/reviews/${reviewId}`,
      "PATCH",
      { score: rating, comment }
    );
  }
}

export default ReviewController;

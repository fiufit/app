import { uploadImage } from "../../firebase";
import RequestController from "./RequestController";

class TrainingController {
  constructor(user) {
    this.user = user;
    this.requestController = new RequestController(user);
  }

  async getTrainings(userId = null) {
    const { data } = await this.requestController.fetch(
      `trainings?trainer_id=${userId ?? this.user.uid}`,
      "GET"
    );

    return data.trainings;
  }

  async createTraining(trainingData, trainingImage) {
    try {
      const createdTrainingData = await this.requestController.fetch(
        "trainings",
        "POST",
        trainingData
      );

      let PictureUrl;
      if (createdTrainingData?.data?.training_plan?.ID) {
        PictureUrl = await uploadImage(
          trainingImage,
          `training_pictures/${this.user.uid}/${createdTrainingData.data.training_plan.ID}/training.png`
        );
      }
      return [createdTrainingData, PictureUrl];
    } catch (e) {
      console.log(e);
      return [
        { error: { description: "Something went wrong, try again later!" } },
      ];
    }
  }

  needsPictureUpdate(originalTrainingData, updatedTrainingData) {
    return originalTrainingData.PictureUrl !== updatedTrainingData.pictureUrl;
  }

  async updateTrainingPictureIfNeeded(
    originalTrainingData,
    updatedTrainingData
  ) {
    try {
      if (this.needsPictureUpdate(originalTrainingData, updatedTrainingData)) {
        return await uploadImage(
          updatedTrainingData.pictureUrl,
          `training_pictures/${this.user.uid}/${originalTrainingData.ID}/training.png`
        );
      } else {
        return originalTrainingData.PictureUrl;
      }
    } catch (e) {
      console.log(e);
      throw `There was an error updating ${originalTrainingData.Name} training picture`;
    }
  }

  async editTraining(
    originalTrainingData,
    updatedTrainingData,
    exercisesToUpload,
  ) {
    try {
      let updatedData = {};

      const { data, error } = await this.requestController.fetch(
          `trainings/${originalTrainingData.ID}`,
          "PUT",
          {
            name: updatedTrainingData.name,
            duration: Number(updatedTrainingData.duration),
            difficulty: updatedTrainingData.difficulty,
            description: "to-do",
            tags: updatedTrainingData.tags,
            exercises: exercisesToUpload.map((exercise) => {
              return { title: exercise.title, description: exercise.description };
            }),
          }
      );

      if (error) {
        console.log(error);
        throw `There was an error updating ${originalTrainingData.Name} training`;
      }

      updatedData.training = data;

      updatedData.training.PictureUrl =
        await this.updateTrainingPictureIfNeeded(
          originalTrainingData,
          updatedTrainingData
        );

      return updatedData;
    } catch (e) {
      console.log(e);
      return {
        error: e,
      };
    }
  }

  async getRecommendedTrainings() {
    const { data } = await this.requestController.fetch(
      `trainings?user_id=${this.user.uid}`,
      "GET"
    );

    return data.trainings.filter(
      (training) => training.TrainerID !== this.user.uid
    );
  }

  async getTrainingSessions() {
    const { data } = await this.requestController.fetch(
      `training_sessions`,
      "GET"
    );

    return data.training_sessions;
  }

  async startTrainingSession(trainingId) {
    const { data } = await this.requestController.fetch(
      `training_sessions?training_id=${trainingId}`,
      "POST"
    );

    return data.training_session;
  }

  async updateTrainingSession(trainingSessionId, trainingSessionData) {
    const { data } = await this.requestController.fetch(
      `training_sessions/${trainingSessionId}`,
      "PUT",
      trainingSessionData
    );

    return data.training_session;
  }

  async getGoals() {
    const { data } = await this.requestController.fetch(`goals`, "GET");

    return data.goals;
  }

  async createGoal(goalData) {
    return await this.requestController.fetch(`goals`, "POST", goalData);
  }

  async updateGoal(goalId, goalData) {
    return await this.requestController.fetch(
        `goals/${goalId}`,
        "PATCH",
        goalData
    );
  }
}

export default TrainingController;

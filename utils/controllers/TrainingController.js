import { getImageUrl, uploadImage } from "../../firebase";
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
}

export default TrainingController;

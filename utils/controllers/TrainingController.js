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

  needsTrainingDataEdit(originalTrainingData, updatedTrainingData) {
    return !(
      originalTrainingData.Name === updatedTrainingData.name &&
      originalTrainingData.Difficulty === updatedTrainingData.difficulty &&
      originalTrainingData.Duration === updatedTrainingData.duration
    );
  }

  needsPictureUpdate(originalTrainingData, updatedTrainingData) {
    return originalTrainingData.PictureUrl !== updatedTrainingData.pictureUrl;
  }

  async updateTrainingIfNeeded(originalTrainingData, updatedTrainingData) {
    try {
      if (
        this.needsTrainingDataEdit(originalTrainingData, updatedTrainingData)
      ) {
        const trainingUpdateData = await this.requestController.fetch(
          `trainings/${originalTrainingData.ID}`,
          "PATCH",
          {
            name: updatedTrainingData.name,
            duration: Number(updatedTrainingData.duration),
            difficulty: updatedTrainingData.difficulty,
          }
        );

        if (trainingUpdateData.error) {
          console.log(trainingUpdateData.error);
          throw `There was an error updating ${originalTrainingData.Name} training`;
        }

        return trainingUpdateData.data;
      } else {
        return originalTrainingData;
      }
    } catch (e) {
      console.log(e);
      throw `There was an error updating ${originalTrainingData.Name} training`;
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

  async deleteExercises(exercisesToDelete) {
    for (const exercise of exercisesToDelete) {
      const deletedData = await this.requestController.fetch(
        `trainings/${exercise.exerciseOldData.TrainingPlanID}/exercises/${exercise.exerciseOldData.ID}`,
        "DELETE"
      );

      if (deletedData.error) {
        console.log(deletedData.error);
        throw `There was an error deleting ${exercise.exerciseOldData.Title} exercise`;
      }
    }
  }

  async handleExercise(exercise, trainingPlanId) {
    if (!exercise?.exerciseOldData) {
      return await this.requestController.fetch(
        `trainings/${trainingPlanId}/exercises`,
        "POST",
        {
          title: exercise.title,
          description: exercise.description,
        }
      );
    } else {
      const needsUpdate = !(
        exercise?.exerciseOldData?.Description === exercise.description &&
        exercise?.exerciseOldData?.Title === exercise.title
      );
      if (needsUpdate) {
        return await this.requestController.fetch(
          `trainings/${trainingPlanId}/exercises/${exercise.exerciseOldData.ID}`,
          "PATCH",
          {
            title: exercise.title,
            description: exercise.description,
          }
        );
      } else {
        return { data: exercise.exerciseOldData };
      }
    }
  }

  async updateExercises(exercisesToUpdate, trainingPlanId) {
    let updatedExercises = [];
    for (const exercise of exercisesToUpdate) {
      const { data, error } = await this.handleExercise(
        exercise,
        trainingPlanId
      );
      if (error) {
        console.log(error);
        throw `There was an error updating exercises`;
      }
      updatedExercises.push(data);
    }
    return updatedExercises;
  }

  async editTraining(
    originalTrainingData,
    updatedTrainingData,
    exercisesToUpload,
    exercisesToDelete
  ) {
    try {
      let updatedData = {};

      updatedData.training = await this.updateTrainingIfNeeded(
        originalTrainingData,
        updatedTrainingData
      );

      updatedData.training.PictureUrl =
        await this.updateTrainingPictureIfNeeded(
          originalTrainingData,
          updatedTrainingData
        );

      await this.deleteExercises(exercisesToDelete);

      updatedData.training.Exercises = await this.updateExercises(
        exercisesToUpload,
        originalTrainingData.ID
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

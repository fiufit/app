import { getImageUrl, uploadImage } from "../../firebase";

class TrainingController {
  constructor(user) {
    this.user = user;
  }

  async getTrainings(userId = null) {
    const { stsTokenManager } = this.user;

    const response = await fetch(
      `https://fiufit-gateway.fly.dev/v1/trainings?trainer_id=${
        userId ?? this.user.uid
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stsTokenManager.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();
    return data.trainings;
  }

  async createTraining(trainingData, trainingImage) {
    try {
      const { stsTokenManager } = this.user;

      const response = await fetch(
        `https://fiufit-gateway.fly.dev/v1/trainings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${stsTokenManager.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trainingData),
        }
      );

      const createdTrainingData = await response.json();

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
        const { stsTokenManager } = this.user;
        const trainingResponse = await fetch(
          `https://fiufit-gateway.fly.dev/v1/trainings/${originalTrainingData.ID}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${stsTokenManager.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: updatedTrainingData.name,
              duration: Number(updatedTrainingData.duration),
              difficulty: updatedTrainingData.difficulty,
            }),
          }
        );

        const trainingUpdateData = await trainingResponse.json();
        if (trainingUpdateData.error) {
          console.log(trainingUpdateData.error)
          throw `There was an error updating ${originalTrainingData.Name} training`;
        }

        return trainingUpdateData.data;
      } else {
        return originalTrainingData;
      }
    } catch (e) {
      console.log(e)
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
    const { stsTokenManager } = this.user;
    for (const exercise of exercisesToDelete) {
      const deleteResponse = await fetch(
        `https://fiufit-gateway.fly.dev/v1/trainings/${exercise.exerciseOldData.TrainingPlanID}/exercises/${exercise.exerciseOldData.ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${stsTokenManager.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const deletedData = await deleteResponse.json();
      if (deletedData.error) {
        console.log(deletedData.error)
        throw `There was an error deleting ${exercise.exerciseOldData.Title} exercise`;
      }
    }
  }

  async handleExercise(exercise, trainingPlanId){
    const { stsTokenManager } = this.user;
    if(!exercise?.exerciseOldData){
      const createResponse = await fetch(
          `https://fiufit-gateway.fly.dev/v1/trainings/${trainingPlanId}/exercises`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stsTokenManager.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: exercise.title,
              description: exercise.description
            })
          }
      );

      return await createResponse.json();
    } else {
      const needsUpdate = !(
          exercise?.exerciseOldData?.Description === exercise.description &&
          exercise?.exerciseOldData?.Title === exercise.title
      );
      if (needsUpdate) {
        const updateResponse = await fetch(
            `https://fiufit-gateway.fly.dev/v1/trainings/${exercise.exerciseOldData.TrainingPlanID}/exercises/${exercise.exerciseOldData.ID}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${stsTokenManager.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: exercise.title,
                description: exercise.description
              })
            }
        );
        return await updateResponse.json();
      } else {
        return {data: exercise.exerciseOldData}
      }
    }
  }

  async updateExercises(exercisesToUpdate, trainingPlanId) {
    let updatedExercises = [];
    for (const exercise of exercisesToUpdate) {
      const {data, error} = await this.handleExercise(exercise, trainingPlanId);
      if(error){
        console.log(error);
        throw `There was an error updating exercises`;
      }
      updatedExercises.push(data)
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

      updatedData.training.Exercises = await this.updateExercises(exercisesToUpload, originalTrainingData.ID);

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

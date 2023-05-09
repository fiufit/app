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

    let trainings = [];
    for (const training of data.trainings) {
      //TODO receive PictureUrl in response
      const PictureUrl = await getImageUrl(
        `training_pictures/${training.TrainerID}/${training.ID}/training.png`
      );
      trainings.push({ ...training, PictureUrl });
    }

    return trainings;
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
      console.log(createdTrainingData);

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

  async editTraining(
    originalTrainingData,
    updatedTrainingData,
    exercisesToUpload,
    exercisesToDelete
  ) {
    console.log(
      originalTrainingData,
      updatedTrainingData,
      exercisesToUpload,
      exercisesToDelete
    );
  }
}

export default TrainingController;

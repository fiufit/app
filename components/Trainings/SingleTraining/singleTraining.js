import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style.single-training";
import Back from "../../Shared/Back/back";
import trainingImage from "../../../assets/images/examples/woman.png";
import FavouriteIcon from "../../../assets/images/general/favouriteIcon.svg";
import StarIcon from "../../../assets/images/general/star.svg";
import ChartIcon from "../../../assets/images/general/bar-chart.svg";
import PencilIcon from "../../../assets/images/general/pencilIcon.svg";
import { React, useEffect, useState } from "react";
import { DARK_BLUE, WHITE } from "../../../utils/colors";
import Exercise from "./Exercise/exercise";
import Button from "../../Shared/Button/button";
import {
  isTrainingInFavorites,
  parseExercises,
} from "../../../utils/trainings";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  createdTrainingsState,
  favoriteTrainingsState,
  selectedSessionState,
  selectedTrainingState,
  trainingSessionsState,
} from "../../../atoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import TrainingController from "../../../utils/controllers/TrainingController";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";

const SingleTraining = ({ navigation, route }) => {
  const [user] = useAuthState(auth);
  const [selectedTraining, setSelectedTraining] = useRecoilState(selectedTrainingState);
  const [createdTrainings, setCreatedTrainings] = useRecoilState(createdTrainingsState);
  const [favoriteTrainings, setFavoriteTrainings] = useRecoilState(
    favoriteTrainingsState
  );
  const {
    Name: title,
    Duration: duration,
    Difficulty: difficulty,
    Exercises: trainingExercises,
    PictureUrl: pictureUrl,
    MeanScore: meanScore,
    Tags: tags,
    ID: trainingId,
  } = selectedTraining;
  const { start, createdTrainingIndex, userTraining } = route.params;
  const [trainingSessions, setTrainingSessions] = useRecoilState(
    trainingSessionsState
  );
  const setSelectedSession = useSetRecoilState(selectedSessionState);
  const [favourite, setFavourite] = useState(
    isTrainingInFavorites(trainingId, favoriteTrainings)
  );
  const [exercises, setExercises] = useState(parseExercises(trainingExercises));
  const [loading, setLoading] = useState(false);

  const handleStartPress = async () => {
    setLoading(true);
    const controller = new TrainingController(user);
    let session = await controller.startTrainingSession(trainingId);
    session.TrainingPlan.PictureUrl = pictureUrl;
    setLoading(false);
    setSelectedSession(session);
    setTrainingSessions([...trainingSessions, session]);

    navigation.navigate({
      name: "Training Attempt",
      merge: true,
      params: { session: session },
    });
  };

  const handleTopButtonPress = () => {
    if (userTraining) {
      navigation.navigate({
        name: "Edit Training",
        merge: true,
        params: { edit: true, createdTrainingIndex },
      });
    } else {
      navigation.navigate({
        name: "Ratings",
        merge: true,
        params: { training: route.params.training, userTraining: false },
      });
    }
  };

  const handleFavoritePress = () => {
    const controller = new TrainingController(user);
    if (favourite) {
      controller.removeTrainingFromFavorites(trainingId).then((res) => {
        console.log("Remove training from favorites", res);
        setFavoriteTrainings(
          favoriteTrainings.filter((training) => training.ID !== trainingId)
        );
      });
      if(userTraining) {
        setSelectedTraining({...selectedTraining, FavoritesCount: selectedTraining.FavoritesCount - 1})
        setCreatedTrainings(createdTrainings.map((training) => {
            if(training.ID === trainingId) {
                return {...training, FavoritesCount: training.FavoritesCount - 1}
            }
            return training;
        }));
      }
    } else {
      controller.addTrainingToFavorites(trainingId).then((res) => {
        console.log("Add training to favorites", res);
        setFavoriteTrainings([...favoriteTrainings, selectedTraining]);
      });
      if(userTraining) {
        setSelectedTraining({...selectedTraining, FavoritesCount: selectedTraining.FavoritesCount + 1})
        setCreatedTrainings(createdTrainings.map((training) => {
            if(training.ID === trainingId) {
                return {...training, FavoritesCount: training.FavoritesCount + 1}
            }
            return training;
        }));
      }
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    setFavourite(isTrainingInFavorites(trainingId, favoriteTrainings));
  }, [trainingId]);

  useEffect(() => {
    setExercises(parseExercises(trainingExercises));
  }, [trainingExercises]);

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <TouchableOpacity
          style={styles.ratingContainer}
          onPress={handleTopButtonPress}
        >
          <Text style={styles.rating}>
            {userTraining
              ? "Edit"
              : meanScore > 0
              ? meanScore.toFixed(1)
              : "Rate"}
          </Text>
          {Boolean(userTraining) ? (
            <PencilIcon color={WHITE} width={12} height={12} />
          ) : (
            <StarIcon color={WHITE} width={12} height={12} />
          )}
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={pictureUrl ? { uri: pictureUrl } : trainingImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleAndIconContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconsContainer}>
              {userTraining && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate({
                      name: "Ratings",
                      merge: true,
                      params: {
                        training: selectedTraining,
                        userTraining: true,
                      },
                    })
                  }
                >
                  <ChartIcon color={DARK_BLUE} width={25} height={25} />
                </TouchableOpacity>
              )}
              <FavouriteIcon
                color={favourite ? "#000000" : WHITE}
                onPress={handleFavoritePress}
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>{difficulty}</Text>
            <Text style={styles.detail}>{duration} min</Text>
          </View>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => {
              return (
                <Text key={index} style={styles.tag}>
                  {tag.Name.charAt(0).toUpperCase() + tag.Name.slice(1)}
                </Text>
              );
            })}
          </View>
          <Text style={styles.start}>{"Let's Start!"}</Text>
          <View style={{ height: start ? "30%" : "45%", width: "100%" }}>
            <ScrollView
              style={styles.exercisesContainer}
              contentContainerStyle={{ gap: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {Boolean(exercises?.length) &&
                exercises.map((exercise, index) => {
                  return (
                    <Exercise
                      exerciseData={exercise}
                      number={index + 1}
                      key={index}
                      last={exercises.length - 1 === index}
                      start={start}
                    />
                  );
                })}
            </ScrollView>
          </View>
        </View>
        {start && (
          <View style={styles.buttonContainer}>
            <Button
              style={styles.startButton}
              fontSize={16}
              textColor={WHITE}
              onPress={handleStartPress}
            >
              Start!
            </Button>
          </View>
        )}
      </View>
      {loading && <LoadingModal text={"Setting up your training..."} />}
    </>
  );
};

export default SingleTraining;

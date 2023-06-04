import {Image, Pressable, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { styles } from "./style.single-training";
import Back from "../../Shared/Back/back";
import trainingImage from "../../../assets/images/examples/woman.png";
import FavouriteIcon from "../../../assets/images/general/favouriteIcon.svg";
import StarIcon from "../../../assets/images/general/star.svg";
import { React, useState } from "react";
import {WHITE} from "../../../utils/colors";
import Exercise from "./Exercise/exercise";
import Button from "../../Shared/Button/button";
import {parseExercises} from "../../../utils/trainings";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {selectedSessionState, selectedTrainingState, trainingSessionsState} from "../../../atoms";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase";
import TrainingController from "../../../utils/controllers/TrainingController";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";

const SingleTraining = ({ navigation, route }) => {
  const [user] = useAuthState(auth);
  const selectedTraining = useRecoilValue(selectedTrainingState);
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
  const start = route.params.start;
  const { isFavourite } = route.params;
  const [trainingSessions, setTrainingSessions] = useRecoilState(trainingSessionsState);
  const setSelectedSession = useSetRecoilState(selectedSessionState);
  const [favourite, setFavourite] = useState(isFavourite);
  const exercises = parseExercises(trainingExercises);
  const [loading, setLoading] = useState(false);

  const handleStartPress = async () => {
    setLoading(true)
    const controller = new TrainingController(user);
    let session = await controller.startTrainingSession(trainingId);
    session.TrainingPlan.PictureUrl = pictureUrl;
    setLoading(false)
    setSelectedSession(session);
    setTrainingSessions([...trainingSessions, session])

    navigation.navigate({name: "Training Attempt", merge: true, params: {session: session}})
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <Pressable
          style={styles.ratingContainer}
          onPress={() =>
            navigation.navigate({
              name: "Ratings",
              merge: true,
              params: { training: route.params.training, userTraining: false },
            })
          }
        >
          <Text style={styles.rating}>
            {meanScore > 0 ? meanScore.toFixed(1) : "Rate"}
          </Text>
          <StarIcon color={WHITE} width={12} height={12} />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={pictureUrl ? { uri: pictureUrl } : trainingImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleAndIconContainer}>
            <Text style={styles.title}>{title}</Text>
            <FavouriteIcon
              color={favourite ? "#000000" : WHITE}
              onPress={() => setFavourite(!favourite)}
            />
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
              {exercises?.length &&
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
      {loading && <LoadingModal text={"Setting up your training..."}/>}
    </>
  );
};

export default SingleTraining;

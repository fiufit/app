import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./style.single-training";
import Back from "../../Shared/Back/back";
import trainingImage from "../../../assets/images/examples/woman.png";
import FavouriteIcon from "../../../assets/images/general/favouriteIcon.svg";
import { React, useState } from "react";
import { WHITE } from "../../../utils/colors";
import Exercise from "./Exercise/exercise";
import Button from "../../Shared/Button/button";
import {parseExercises} from "../../../utils/trainings";

const SingleTraining = ({ navigation, route }) => {
  const {
    Name: title,
    Duration: duration,
    Difficulty: difficulty,
    Exercises: trainingExercises,
    PictureUrl: pictureUrl
  } = route.params.training;
  const start = route.params.start;
  const { isFavourite } = route.params;
  const [favourite, setFavourite] = useState(isFavourite);
  const exercises = parseExercises(trainingExercises);

  const handleStartPress = () => {
    //TODO
    navigation.navigate({name: "Training Attempt", merge: true, params: {training: route.params.training}})
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={pictureUrl ? {uri: pictureUrl} : trainingImage} />
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
          <Text style={styles.start}>{"Let's Start!"}</Text>
          <View style={{ height: start ? "35%" : "45%", width: "100%" }}>
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
    </>
  );
};

export default SingleTraining;

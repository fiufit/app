import { Pressable, Text, View } from "react-native";
import { styles } from "./styles.exercise-attempt";
import DoneIcon from "../../../assets/images/general/doneIcon.svg";

import { useState } from "react";

const ExerciseAttempt = ({
  last,
  exerciseData,
  number,
  isTrainingActive,
  setExercises,
  exercises,
  trainingCompleted
}) => {
  const [done, setDone] = useState(exerciseData.done);
  const handleDone = () => {
    if(!trainingCompleted){
        setDone(!done);
        setExercises(
            exercises.map((exercise, index) => {
                if (number - 1 === index) {
                    exercise.done = !exercise.done;
                }
                return exercise;
            })
        );
    }
    //TODO post setting exercise done in db
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
        {!last && (
          <View style={styles.barContainer}>
            <View style={styles.bar} />
          </View>
        )}
      </View>
      <View>
        <Text style={styles.title}>{exerciseData.title}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {exerciseData.description}
        </Text>
      </View>
      {(isTrainingActive || trainingCompleted) && (
        <DoneIcon
          style={styles.done}
          opacity={done ? 1 : 0.1}
          onPress={handleDone}
        />
      )}
    </Pressable>
  );
};

export default ExerciseAttempt;

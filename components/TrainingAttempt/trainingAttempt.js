import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles.training-attempt";
import Back from "../Shared/Back/back";
import trainingImage from "../../assets/images/examples/woman.png";
import { React, useEffect, useState } from "react";
import { parseExercises } from "../../utils/trainings";
import ExerciseAttempt from "./ExerciseAttempt/exerciseAttempt";
import { Accelerometer } from "expo-sensors";
import PlayIcon from "../../assets/images/general/playIcon.svg";
import StopIcon from "../../assets/images/general/stopIcon.svg";
import TrainingCompleteModal from "../Shared/Modals/TrainingCompleteModal/trainingCompleteModal";
import { useRecoilState } from "recoil";
import { selectedSessionState, trainingSessionsState } from "../../atoms";
import TrainingController from "../../utils/controllers/TrainingController";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const TrainingAttempt = ({ navigation, route }) => {
  const [user] = useAuthState(auth);
  const [trainingSessions, setTrainingSessions] = useRecoilState(
    trainingSessionsState
  );
  const [selectedSession, setSelectedSession] =
    useRecoilState(selectedSessionState);
  const {
    Name: title,
    Duration: duration,
    Difficulty: difficulty,
    PictureUrl: pictureUrl,
  } = selectedSession.TrainingPlan;
  const {
    Done: done,
    ID: sessionId,
    SecondsCount: secondsCount,
    StepCount: stepCount,
    ExerciseSessions: exercisesSessions,
  } = selectedSession;

  const [exercises, setExercises] = useState(
    parseExercises(exercisesSessions, true)
  );
  const [subscription, setSubscription] = useState(null);
  const [currentStepCount, setCurrentStepCount] = useState(stepCount);
  const [seconds, setSeconds] = useState(secondsCount);
  const [isActive, setIsActive] = useState(false);
  const [completed, setCompleted] = useState(done);
  const [showTrainingCompleteModal, setShowTrainingCompleteModal] =
    useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        if (Math.abs(accelerometerData.z) > 1.15) {
          if (isActive) {
            setCurrentStepCount((steps) => steps + 1);
          }
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    if (isActive) {
      _subscribe();
    } else {
      _unsubscribe();
    }
    return () => _unsubscribe();
  }, [isActive]);

  useEffect(() => {
    if (exercises.every((exercise) => exercise.done) && !completed) {
      setShowTrainingCompleteModal(true);
      setIsActive(false);
    }
  }, [exercises]);

  const handlePlayPress = () => {
    setIsActive(!isActive);
  };

  const updateSession = (trainingDone = false) => {
    const controller = new TrainingController(user);
    if(trainingDone) {
      setCompleted(true)
    }

    controller
        .updateTrainingSession(sessionId, {
          done: trainingDone,
          step_count: currentStepCount,
          seconds_count: seconds,
          exercise_sessions: exercises.map((exercise) => {
            return {
              id: exercise.id,
              done: exercise.done,
            };
          }),
        })
        .then((response) => {
          console.log(response);
          setSelectedSession(response);
          setCompleted(response.Done);
          setTrainingSessions(
              trainingSessions.map((session) => {
                if (session.ID === response.ID) {
                  return response;
                }
                return session;
              })
          );
        });
  }

  const handleStopPress = () => {
    setIsActive(!isActive);
    updateSession();
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <View style={styles.imageContainer}>
          <View style={styles.playAndInfoContainer}>
            {completed ? (
              <Text style={styles.completedText}>Training Completed!</Text>
            ) : (
              <>
                <Text style={styles.trainingTime}>{formatTime(seconds)}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ width: "20%", height: "20%" }}
                  onPress={() => {
                    if (!isActive) {
                      handlePlayPress();
                    } else {
                      handleStopPress();
                    }
                  }}
                >
                  {!isActive ? (
                    <PlayIcon width={"100%"} height={"100%"} />
                  ) : (
                    <StopIcon width={"100%"} height={"100%"} />
                  )}
                </TouchableOpacity>
                <View style={styles.trainingSteps}>
                  <Text style={styles.trainingStepsText}>
                    {currentStepCount}
                  </Text>
                  <Text style={styles.trainingStepsText}>steps</Text>
                </View>
              </>
            )}
          </View>
          <Image
            style={styles.image}
            source={pictureUrl ? { uri: pictureUrl } : trainingImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleAndIconContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detail}>{difficulty}</Text>
            <Text style={styles.detail}>{duration} min</Text>
          </View>
          <Text style={styles.start}>{"Let's Start!"}</Text>
          <View style={{ height: "45%", width: "100%" }}>
            <ScrollView
              style={styles.exercisesContainer}
              contentContainerStyle={{ gap: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {exercises?.length &&
                exercises.map((exercise, index) => {
                  return (
                    <ExerciseAttempt
                      exerciseData={exercise}
                      number={index + 1}
                      key={index}
                      last={exercises.length - 1 === index}
                      isTrainingActive={isActive}
                      setExercises={setExercises}
                      exercises={exercises}
                      trainingCompleted={completed}
                    />
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
      {showTrainingCompleteModal && (
        <TrainingCompleteModal
          onSubmit={() => {
            updateSession(true);
            setShowTrainingCompleteModal(false);
          }}
          onClose={() => {
            setIsActive(true);
            setShowTrainingCompleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default TrainingAttempt;

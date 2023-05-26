import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles.training-attempt";
import Back from "../Shared/Back/back";
import trainingImage from "../../assets/images/examples/woman.png";
import {React, useEffect, useState} from "react";
import {parseExercises} from "../../utils/trainings";
import ExerciseAttempt from "./ExerciseAttempt/exerciseAttempt";
import { Accelerometer } from 'expo-sensors';
import PlayIcon from '../../assets/images/general/playIcon.svg'
import StopIcon from '../../assets/images/general/stopIcon.svg'

const TrainingAttempt = ({ navigation, route }) => {
    const {
        Name: title,
        Duration: duration,
        Difficulty: difficulty,
        Exercises: trainingExercises,
        PictureUrl: pictureUrl
    } = route.params.training;
    const exercises = parseExercises(trainingExercises);
    const [subscription, setSubscription] = useState(null);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                if (Math.abs(accelerometerData.z) > 1.15) {
                    if(isActive){
                        setCurrentStepCount(steps => steps + 1);
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
        if(isActive){
            _subscribe();
        } else {
            _unsubscribe();
        }
        return () => _unsubscribe();
    }, [isActive]);

    return (
        <>
            <View style={styles.container}>
                <Back onPress={() => navigation.goBack()} />
                <View style={styles.imageContainer}>
                    <View style={styles.playAndInfoContainer}>
                        <Text style={styles.trainingTime}>{formatTime(seconds)}</Text>
                        <TouchableOpacity activeOpacity={.7} style={{width: "20%", height: "20%"}} onPress={() => setIsActive(!isActive)}>
                            {!isActive ? <PlayIcon width={"100%"} height={"100%"}/> : <StopIcon width={"100%"} height={"100%"}/>}
                        </TouchableOpacity>
                        <View style={styles.trainingSteps}>
                            <Text style={styles.trainingStepsText}>{currentStepCount}</Text>
                            <Text style={styles.trainingStepsText}>steps</Text>
                        </View>

                    </View>
                    <Image style={styles.image} source={pictureUrl ? {uri: pictureUrl} : trainingImage} />
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
                                        />
                                    );
                                })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </>
    );
};

export default TrainingAttempt;

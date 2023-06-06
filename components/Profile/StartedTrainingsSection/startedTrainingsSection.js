import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.started-trainings-section";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";
import NoTrainingsMessage from "../NoTrainingsMessage/noTrainingsMessage";
import {useSetRecoilState} from "recoil";
import {selectedSessionState} from "../../../atoms";

const StartedTrainingsSection = ({ navigation, startedTrainings, loading }) => {
    const setSelectedSession = useSetRecoilState(selectedSessionState);

    const handleSeeAll = () => {
        if(!loading){
            navigation.navigate({
                name: "Session List",
                merge: true,
            });
        }
    };

    return (
        <View style={styles.trainingsSection}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Your trainings</Text>
                {startedTrainings.length > 0 && (
                    <TouchableOpacity onPress={handleSeeAll}>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>
            {loading ? (
                <TrainingCard />
            ) : startedTrainings.length ? (
                <TrainingCard
                    title={startedTrainings[0].TrainingPlan.Name}
                    imageSource={{ uri: startedTrainings[0].TrainingPlan.PictureUrl }}
                    duration={startedTrainings[0].TrainingPlan.Duration}
                    difficulty={startedTrainings[0].TrainingPlan.Difficulty}
                    onPress={() => {
                        setSelectedSession(startedTrainings[0]);
                        navigation.navigate({
                            name: "Training Attempt",
                            merge: true,
                            params: { session: startedTrainings[0] },
                        });
                    }}
                />
            ) : (
                <NoTrainingsMessage
                    title={"You didn't start any trainings yet."}
                    callToActionText={"Start one!"}
                    onPress={() =>
                        navigation.navigate({ name: "Trainings", merge: true })
                    }
                />
            )}
        </View>
    );
};

export default StartedTrainingsSection;


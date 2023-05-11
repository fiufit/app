import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.started-trainings-section";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";
import NoTrainingsMessage from "../NoTrainingsMessage/noTrainingsMessage";

const StartedTrainingsSection = ({ navigation, startedTrainings, loading }) => {
    const handleSeeAll = () => {
        navigation.navigate({
            name: "Training List",
            merge: true,
            params: { trainings: startedTrainings, title: "Started Trainings"},
        });
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
                    title={startedTrainings[0].Name}
                    imageSource={{ uri: startedTrainings[0].PictureUrl }}
                    duration={startedTrainings[0].Duration}
                    difficulty={startedTrainings[0].difficulty}
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


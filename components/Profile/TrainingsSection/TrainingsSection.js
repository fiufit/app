import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.trainings-section";
import trainingImage from "../../../assets/images/examples/training.png";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";

const TrainingsSection = ({athleteProfileSelected}) => {
    return <View style={styles.trainingsSection}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{athleteProfileSelected ? `Your` : `Created`} trainings</Text>
            <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
        </View>
        <TrainingCard title={'Hand Training'} duration={40} imageSource={trainingImage}/>
    </View>;
}

export default TrainingsSection;

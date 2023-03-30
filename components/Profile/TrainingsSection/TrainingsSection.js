import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.trainings-section";
import trainingImage from "../../../assets/images/examples/training.png";
import ClockIcon from "../../../assets/images/profile/clockIcon.svg"

const TrainingsSection = ({athleteProfileSelected}) => {
    return <View style={styles.trainingsSection}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{athleteProfileSelected ? `Your` : `Created`} trainings</Text>
            <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.trainingCard}>
            <Image source={trainingImage} style={styles.trainingImage}/>
            <Text style={styles.trainingTitle}>Hand Training</Text>
            <View style={styles.trainingDurationContainer}>
                <ClockIcon color={"#000000"}/>
                <Text style={styles.trainingDurationText}>40 min</Text>
            </View>
        </View>
    </View>;
}

export default TrainingsSection;

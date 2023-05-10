import {Image, Text, View} from "react-native";
import ClockIcon from "../../../assets/images/profile/clockIcon.svg";
import {styles} from "./styles.training-card";
const TrainingCard = ({imageSource, title, duration}) => {
    return <View style={styles.trainingCard}>
        <Image source={imageSource} style={styles.trainingImage}/>
        <Text style={styles.trainingTitle}>{title}</Text>
        <View style={styles.trainingDurationContainer}>
            <ClockIcon color={"#000000"}/>
            <Text style={styles.trainingDurationText}>{duration} min</Text>
        </View>
    </View>
}

export default TrainingCard

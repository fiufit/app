import {styles} from "./styles.goal-card";
import {Text, View} from "react-native";

const GoalCard = ({title, description, progress}) => {


    return <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>{title}</Text>
        <Text style={styles.goalDescription}>{description}</Text>
        <View style={styles.progressBar}>
            <View style={{...styles.progress, width: `${progress}%`}}></View>
            <Text style={styles.progressText}>
                {progress}%
            </Text>
        </View>
    </View>
}

export default GoalCard;

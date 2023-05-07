import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style.recommended-training";
import trainingImage from "../../../assets/images/examples/woman.png";
import SeeMoreIcon from "../../../assets/images/general/seeMoreIcon.svg"
const RecommendedTraining = ({training, onTrainingPress}) => {

    return(
        <View style={styles.trainingCard}>
            <Image source={trainingImage} style={styles.trainingImage}/>
            <View style={styles.filter}/>
            <Text style={styles.recommendTitle}>Check this {training.Name.toLowerCase()} training!</Text>
            <TouchableOpacity style={styles.seeMoreContainer} onPress={() => onTrainingPress(training)}>
                <Text style={styles.seeMore}>See more </Text>
                <View style={{paddingTop: 3}}>
                    <SeeMoreIcon width={8} height={8}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RecommendedTraining;

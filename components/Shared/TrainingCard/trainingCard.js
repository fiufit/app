import {Image, Text, TouchableOpacity, View} from "react-native";
import ClockIcon from "../../../assets/images/profile/clockIcon.svg";
import trainingImage from "../../../assets/images/examples/training.png";
import { styles } from "./styles.training-card";

const TrainingCard = ({ imageSource, title, duration, create, onPress }) => {
  return (
    <TouchableOpacity style={styles.trainingCard} onPress={onPress}>
      <Image
        source={!create ? imageSource : trainingImage}
        style={styles.trainingImage}
      />
      {title && <View style={styles.filter}/>}
      {title ? (
        <Text style={styles.trainingTitle}>{title}</Text>
      ) : (
        <View style={styles.loadingTitle} />
      )}
      {duration && (
        <View style={styles.trainingDurationContainer}>
          <ClockIcon color={"#000000"} />
          <Text style={styles.trainingDurationText}>{duration} min</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TrainingCard;

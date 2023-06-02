import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style.recommended-training";
import trainingImage from "../../../assets/images/examples/woman.png";
import SeeMoreIcon from "../../../assets/images/general/seeMoreIcon.svg";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";

const RecommendedTraining = ({ training, onTrainingPress, loading }) => {
  const textToShow = () => {
    if(training?.Name?.toLowerCase().includes("training")){
        return `Check this ${training?.Name?.toLowerCase()}!`
    } else {
        return `Check this ${training?.Name?.toLowerCase()} training!`
    }
  }

  return (
    <View style={styles.trainingCard}>
      {!loading ? (
        <>
          <Image
            source={{ uri: training?.PictureUrl }}
            style={styles.trainingImage}
          />
          <View style={styles.filter} />
          <Text style={styles.recommendTitle}>
            {textToShow()}
          </Text>
          <TouchableOpacity
            style={styles.seeMoreContainer}
            onPress={() => onTrainingPress(training)}
          >
            <Text style={styles.seeMore}>See more </Text>
            <View style={{ paddingTop: 3 }}>
              <SeeMoreIcon width={8} height={8} />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TrainingCard />
      )}
    </View>
  );
};

export default RecommendedTraining;

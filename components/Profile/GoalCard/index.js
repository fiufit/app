import { styles } from "./styles.goal-card";
import {Text, TouchableOpacity, View} from "react-native";

const GoalCard = ({ title, description, progress, loading, index, navigation }) => {
  const handlePress = () => {
      if(!loading) navigation.navigate("Update Goal", {goalIndex: index, edit: true});
  }

  return loading ? (
    <View style={styles.loadingGoalCard}></View>
  ) : (
    <TouchableOpacity style={styles.goalCard} activeOpacity={0.6} onPress={handlePress}>
      <Text style={styles.goalTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.goalDescription}>{description}</Text>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progress, width: `${progress}%` }}></View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalCard;

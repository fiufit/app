import { styles } from "./styles.goal-card";
import {Text, TouchableOpacity, View} from "react-native";

const GoalCard = ({ title, description, progress, loading, index, navigation, extended, valueDone }) => {
  const handlePress = () => {
      if(!loading) navigation.navigate("Update Goal", {goalIndex: index, edit: true});
  }

  return loading ? (
    <View style={styles.loadingGoalCard}></View>
  ) : (
    <TouchableOpacity style={{...styles.goalCard, width: extended ? "100%" : "48%"}} activeOpacity={0.6} onPress={handlePress}>
      <Text style={styles.goalTitle} numberOfLines={1}>{title}</Text>
      <Text style={styles.goalDescription}>{description} {extended ? `| ${valueDone} done` : ""}</Text>
      <View style={styles.progressBar}>
        <View style={{ ...styles.progress, width: `${progress.toFixed(0)}%` }}></View>
        <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalCard;

import { BLACK, LIGHT_BLUE } from "../../../utils/colors";
import { Share, Text, TouchableOpacity, View } from "react-native";

import Button from "../../Shared/Button/button";
import { styles } from "./styles.goal-card";

const GoalCard = ({
  title,
  description,
  progress,
  loading,
  index,
  navigation,
  extended,
  valueDone,
  shareButtonVisible,
}) => {
  const PROGRESS_COMPLETED = 100;

  const handlePress = () => {
    if (!loading)
      navigation.navigate("Update Goal", { goalIndex: index, edit: true });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey, I've just finished my goal: " +
          title +
          ", whose main objective was: " +
          description +
          ". Looking forward to the next one!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {}
  };

  return loading ? (
    <View style={styles.loadingGoalCard}></View>
  ) : (
    <TouchableOpacity
      style={{
        ...styles.goalCard,
        width: extended ? "100%" : "48%",
        height:
          progress == PROGRESS_COMPLETED && shareButtonVisible
            ? "120%"
            : "100%",
      }}
      activeOpacity={0.6}
      onPress={handlePress}
    >
      <Text style={styles.goalTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.goalDescription}>
        {description} {extended ? `| ${valueDone} done` : ""}
      </Text>
      <View style={styles.progressBar}>
        <View
          style={{ ...styles.progress, width: `${progress.toFixed(0)}%` }}
        ></View>
        <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
      </View>
      {progress == PROGRESS_COMPLETED && shareButtonVisible && (
        <Button
          textColor={BLACK}
          fontSize={16}
          buttonColor={LIGHT_BLUE}
          style={{ borderRadius: 10, marginTop: 5 }}
          onPress={() => {
            onShare();
          }}
        >
          Share achievement!
        </Button>
      )}
    </TouchableOpacity>
  );
};

export default GoalCard;

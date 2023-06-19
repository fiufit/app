import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.goals-section";
import GoalCard from "../GoalCard";
import NoTrainingsMessage from "../NoTrainingsMessage/noTrainingsMessage";
import {getGoalDescription} from "../../../utils/trainings";

const GoalsSection = ({ goals, loading, navigation }) => {
  const handleCreateGoal = () => {
    navigation.navigate("Create Goal", { merge: true, edit: false });
  };

  return (
    <View style={styles.goalsSection}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your goals</Text>
        {goals.length > 0 && !loading && (
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <View style={styles.goalCardsContainer}>
          <GoalCard loading={true} />
          <GoalCard loading={true} />
        </View>
      ) : goals.length > 0 ? (
        <View style={styles.goalCardsContainer}>
            {goals.slice(0, 2).map((goal, index) => (
                <GoalCard
                    index={index}
                    key={goal.ID}
                    title={goal.title}
                    description={getGoalDescription(goal)}
                    progress={goal.progress / goal.value * 100}
                    navigation={navigation}
                />
            ))}
        </View>
      ) : (
        <NoTrainingsMessage
          title={"You didn't set any goals yet"}
          callToActionText={"Set one!"}
          onPress={handleCreateGoal}
        />
      )}
    </View>
  );
};

export default GoalsSection;

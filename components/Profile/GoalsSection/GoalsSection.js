import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.goals-section";
import GoalCard from "../GoalCard";
import NoTrainingsMessage from "../NoTrainingsMessage/noTrainingsMessage";

const GoalsSection = ({ goals, loading }) => {
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
          <GoalCard
            title={"The burnout"}
            description={"Burn 20000 calories"}
            progress={20}
          />
          <GoalCard
            title={"Walking Queen"}
            description={"Walk 200000 steps"}
            progress={48}
          />
        </View>
      ) : (
        <NoTrainingsMessage
          title={"You didn't set any goals yet"}
          callToActionText={"Set one!"}
          onPress={null}
        />
      )}
    </View>
  );
};

export default GoalsSection;

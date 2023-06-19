import { ScrollView, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import Back from "../../Shared/Back/back";
import Button from "../../Shared/Button/button";
import { WHITE } from "../../../utils/colors";
import { styles } from "./styles.goal-list";
import { goalsState } from "../../../atoms";
import GoalCard from "../../Profile/GoalCard";
import { getGoalDescription } from "../../../utils/trainings";

const GoalList = ({ navigation }) => {
  const goals = useRecoilValue(goalsState);
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <Text style={styles.title}>Your goals</Text>
      <View
        style={{
          width: "100%",
          height: "72%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={styles.goalsContainer}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {goals.map((goal, index) => {
            return (
              <View style={{ width: "90%", height: 150 }}>
                <GoalCard
                  title={goal.title}
                  index={index}
                  navigation={navigation}
                  description={getGoalDescription(goal)}
                  progress={(goal.progress / goal.value) * 100}
                  valueDone={goal.progress}
                  extended
                />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.createButton}
          fontSize={16}
          textColor={WHITE}
          onPress={() =>
            navigation.navigate({
              name: "Create Goal",
              merge: true,
              params: { edit: false },
            })
          }
        >
          Create more!
        </Button>
      </View>
    </View>
  );
};

export default GoalList;

import { ScrollView, Text, View } from "react-native";

import Back from "../../Shared/Back/back";
import Button from "../../Shared/Button/button";
import GoalCard from "../../Profile/GoalCard";
import { WHITE } from "../../../utils/colors";
import { getGoalDescription } from "../../../utils/trainings";
import { goalsState } from "../../../atoms";
import { styles } from "./styles.goal-list";
import { useRecoilValue } from "recoil";

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
          height: "70%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={styles.goalsContainer}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {goals.map((goal, index) => {
            return (
              <View
                style={{
                  width: "90%",
                  height: 150,
                  marginBottom:
                    (goal.progress / goal.value) * 100 == 100 ? 50 : 20,
                }}
                key={goal.ID}
              >
                <GoalCard
                  title={goal.title}
                  index={index}
                  navigation={navigation}
                  description={getGoalDescription(goal)}
                  progress={(goal.progress / goal.value) * 100}
                  valueDone={goal.progress}
                  shareButtonVisible={true}
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

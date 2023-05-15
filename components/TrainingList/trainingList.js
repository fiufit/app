import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles.training-list";
import Back from "../Shared/Back/back";
import TrainingCard from "../Shared/TrainingCard/trainingCard";
import Button from "../Shared/Button/button";
import { WHITE } from "../../utils/colors";
import {useRecoilValue} from "recoil";
import {createdTrainingsState} from "../../atoms";

const TrainingList = ({ navigation, route }) => {
  const createdTrainings = useRecoilValue(createdTrainingsState);
  const { paramTrainings, created, title } = route.params;
  const trainings = created ? createdTrainings : paramTrainings;
  const handleBack = () => {
    navigation.goBack();
  };

  const handleTrainingPress = (training, index) => {
    navigation.navigate({
      name: "Edit Training",
      params: { edit: true, createdTrainingIndex: index},
    });
  };

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: "100%",
          height: "72%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={styles.trainingsContainer}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {trainings.map((training, index) => {
            return (
              <TrainingCard
                imageSource={{ uri: training?.PictureUrl }}
                title={training.Name}
                duration={training.Duration}
                key={training.ID}
                difficulty={training.Difficulty}
                onPress={() => handleTrainingPress(training, index)}
              />
            );
          })}
        </ScrollView>
      </View>
      {created && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.createButton}
            fontSize={16}
            textColor={WHITE}
            onPress={() =>
              navigation.navigate({ name: "New Training", merge: true })
            }
          >
            Create more!
          </Button>
        </View>
      )}
    </View>
  );
};

export default TrainingList;
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles.training-list";
import Back from "../Shared/Back/back";
import TrainingCard from "../Shared/TrainingCard/trainingCard";
import Button from "../Shared/Button/button";
import { WHITE } from "../../utils/colors";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  createdTrainingsState,
  favoriteTrainingsState,
  selectedTrainingState,
  userDataState,
} from "../../atoms";

const TrainingList = ({ navigation, route }) => {
  const userData = useRecoilValue(userDataState);
  const setSelectedTraining = useSetRecoilState(selectedTrainingState);
  const createdTrainings = useRecoilValue(createdTrainingsState);
  const favoriteTrainings = useRecoilValue(favoriteTrainingsState);
  const { paramTrainings, created, title, favorites } = route.params;
  const trainings = created
    ? createdTrainings
    : favorites
    ? favoriteTrainings
    : paramTrainings;
  const handleBack = () => {
    navigation.goBack();
  };

  const handleTrainingPress = (training, index) => {
    if (created) {
      setSelectedTraining(training);
      navigation.navigate({
        name: "Single Training",
        params: {
          start: true,
          userTraining: true,
          createdTrainingIndex: index,
        },
      });
    } else {
      setSelectedTraining(training);
      navigation.navigate({
        name: "Single Training",
        params: {
          training,
          start: true,
          userTraining: training.TrainerID === userData.ID,
          createdTrainingIndex:
            createdTrainings.findIndex(
              (createdTraining) => createdTraining.ID === training.ID
            ) < 0
              ? undefined
              : createdTrainings.findIndex(
                  (createdTraining) => createdTraining.ID === training.ID
                ),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: "100%",
          height: created ? "72%" : "80%",
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

import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.trainings-section";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";
import NoTrainingsMessage from "../NoTrainingsMessage/noTrainingsMessage";
import {selectedTrainingState} from "../../../atoms";
import {useSetRecoilState} from "recoil";

const CreatedTrainingsSection = ({ navigation, createdTrainings, loading }) => {
  const setSelectedTraining = useSetRecoilState(selectedTrainingState);

  const handleSeeAll = () => {
    navigation.navigate({
      name: "Training List",
      merge: true,
      params: { trainings: createdTrainings, title: "Created Trainings", created: true},
    });
  };

  const handleTrainingPress = () => {
    setSelectedTraining(createdTrainings[0])
    navigation.navigate({
      name: "Single Training",
      params: { createdTrainingIndex: 0, start: true, userTraining: true},
    });
  }

  return (
    <View style={styles.trainingsSection}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Created trainings</Text>
        {createdTrainings.length > 0 && (
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <TrainingCard />
      ) : createdTrainings.length ? (
        <TrainingCard
          title={createdTrainings[0].Name}
          imageSource={{ uri: createdTrainings[0].PictureUrl }}
          duration={createdTrainings[0].Duration}
          difficulty={createdTrainings[0].Difficulty}
          onPress={handleTrainingPress}
        />
      ) : (
        <NoTrainingsMessage
          title={"You don't have any trainings created yet."}
          callToActionText={"Create one!"}
          onPress={() =>
            navigation.navigate({ name: "New Training", merge: true })
          }
        />
      )}
    </View>
  );
};

export default CreatedTrainingsSection;

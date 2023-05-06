import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.trainings-section";
import TrainingCard from "../../Shared/TrainingCard/trainingCard";
import { useEffect, useState } from "react";
import TrainingController from "../../../utils/controllers/TrainingController";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import CreateTrainingCard from "../CreateTrainingCard/createTrainingCard";

const CreatedTrainingsSection = ({ navigation }) => {
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCreatedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainings();
  };

  useEffect(() => {
    fetchCreatedTrainings().then((trainings) => {
      setCreatedTrainings(trainings);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.trainingsSection}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Created trainings</Text>
        {createdTrainings.length > 0 && (
          <TouchableOpacity>
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
        />
      ) : (
        <CreateTrainingCard
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

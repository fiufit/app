import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles.view-profile";
import DataSection from "../Profile/DataSection";
import Back from "../Shared/Back/back";
import TrainingCard from "../Shared/TrainingCard/trainingCard";
import trainingImage from "../../assets/images/examples/training.png";
import { useEffect, useState } from "react";
import TrainingController from "../../utils/controllers/TrainingController";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const ViewProfile = ({ navigation, route }) => {
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTrainingPress = (training) => {
      navigation.navigate({
          name: "Single Training",
          merge: true,
          params: { training, start: true },
      });
  }

  const fetchUserCreatedTrainings = async () => {
    const controller = new TrainingController(user);

    return await controller.getTrainings(route.params.userData.ID);
  };

  useEffect(() => {
    fetchUserCreatedTrainings().then((trainings) => {
      setCreatedTrainings(trainings);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <DataSection otherUserData={route.params.userData} other />
      <View
        style={{
          height: "78%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Created trainings</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 10 }}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <>
              <TrainingCard />
              <TrainingCard />
              <TrainingCard />
            </>
          ) : (
            createdTrainings.length > 0 &&
            createdTrainings.map((training) => {
              return (
                <TrainingCard
                  title={training.Name}
                  duration={training.Duration}
                  imageSource={{uri: training.PictureUrl}}
                  difficulty={training.Difficulty}
                  key={training.ID}
                  onPress={() => {handleTrainingPress(training)}}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewProfile;

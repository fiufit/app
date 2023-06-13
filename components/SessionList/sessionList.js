import { ScrollView, Text, View } from "react-native";
import { styles } from "./style.session-list";
import Back from "../Shared/Back/back";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    selectedSessionState,
    trainingSessionsState,
} from "../../atoms";
import { SessionCard } from "../Trainings/TrainingAttempts/trainingAttempts";
import { getPercentageDone, phraseToShow } from "../../utils/trainings";
import { useState } from "react";

const SessionList = ({ navigation }) => {
  const trainingSessions = useRecoilValue(trainingSessionsState);
  const setSelectedSession = useSetRecoilState(selectedSessionState);
  const [startedSelected, setStartedSelected] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSessionPress = (session) => {
      setSelectedSession(session);
      navigation.navigate({
          name: "Training Attempt",
          merge: true,
          params: { session: session },
      });
  }

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <View style={styles.titleContainer}>
        <Text
          style={{
            ...styles.title,
            color: startedSelected ? "#000000" : "rgba(0,0,0,0.22)",
          }}
          onPress={() => setStartedSelected(true)}
        >
          Started Trainings
        </Text>
        <Text
          style={{
            ...styles.title,
            color: !startedSelected ? "#000000" : "rgba(0,0,0,0.22)",
          }}
          onPress={() => setStartedSelected(false)}
        >
          Done Trainings
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={styles.trainingsContainer}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {trainingSessions.filter(session => {
            return startedSelected ? !session.Done : session.Done;
          }).map((session, index) => {
            return (
              <SessionCard
                key={session.ID}
                onPress={() => {handleSessionPress(session)}}
                detail={phraseToShow(session)}
                percentageDone={getPercentageDone(session)}
                title={session.TrainingPlan.Name}
                difficulty={session.TrainingPlan.Difficulty}
                imageSource={{ uri: session.TrainingPlan.PictureUrl }}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SessionList;

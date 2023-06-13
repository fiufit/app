import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./style.training-attemtps";
import trainingImage from "../../../assets/images/examples/woman.png";
import { useEffect, useState } from "react";
import { getPercentageDone, phraseToShow } from "../../../utils/trainings";

export const SessionCard = ({
  last,
  difficulty,
  title,
  detail,
  percentageDone,
  onPress,
  imageSource,
  loading,
}) => {
  return loading ? (
    <View style={styles.loadingAttemptCard} />
  ) : (
    <TouchableOpacity
      style={{
        ...styles.attemptCard,
        marginBottom: last ? 100 : 15,
      }}
      onPress={onPress}
    >
      <Text style={styles.difficulty}>{difficulty}</Text>
      <Image source={imageSource} style={styles.trainingImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.trainingTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.trainingDetail}>{detail}</Text>
        <View style={styles.progressBar}>
          <View
            style={{
              ...styles.progress,
              width: `${percentageDone}%`,
            }}
          ></View>
          <Text style={styles.progressText}>{percentageDone}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TrainingAttempts = ({
  navigation,
  onSessionPress,
  sessions,
  loading,
}) => {
  const [sessionsToShow, setSessionsToShow] = useState([]);

  useEffect(() => {
    if(sessions){
      setSessionsToShow(sessions.filter((session) => session.Done === false).slice(0, 3));
    }
  }, [sessions]);

  const showSeeAll = () => {
    return !loading && sessions.length > 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {loading ? (
          <View style={styles.loadingTitle} />
        ) : (
          <Text style={styles.title}>{"Continue your work"}</Text>
        )}

        {showSeeAll() && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({ name: "Session List", merge: true });
            }}
          >
            <Text style={styles.seeAll}>{"See all"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.trainingsContainer}>
        {loading && (
          <>
            <SessionCard loading={true} />
            <SessionCard loading={true} />
          </>
        )}
        {!loading && sessionsToShow.length === 0 && (
            <View style={styles.noSessionsContainer}>
                <Text style={styles.noSessionsText}>
                    {"You have no sessions to continue :("}
                </Text>
            </View>
        )}
        {!loading &&
          sessionsToShow.map((session, index) => {
            return (
              <SessionCard
                key={session.ID}
                last={sessionsToShow.length - 1 === index}
                onPress={() => onSessionPress(session, index)}
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
  );
};

export default TrainingAttempts;

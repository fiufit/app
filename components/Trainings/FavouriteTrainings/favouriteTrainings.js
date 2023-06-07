import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { styles } from "./style.favourite-trainings";
import trainingImage from "../../../assets/images/examples/woman.png";
import { useEffect, useState } from "react";

const FavouriteTrainings = ({
  favourite,
  recommended,
  onTrainingPress,
  loading,
}) => {
  const loadingPlaceholder = [{ ID: 1 }, { ID: 2 }, { ID: 3 }, { ID: 4 }];
  const [trainingsToShow, setTrainingsToShow] = useState([]);

  useEffect(() => {
    if (loading) {
      setTrainingsToShow(loadingPlaceholder);
    } else if (favourite.length) {
      setTrainingsToShow(favourite);
    } else {
      setTrainingsToShow(recommended);
    }
  }, [favourite, recommended, loading]);

  const transformTrainings = (trainings) => {
    const transformedTrainings = [];
    if (trainings.length <= 2) {
      return trainings.map((training) => [training]);
    }
    for (let i = 0; i < trainings.length; i += 2) {
      if (i + 1 < trainings.length) {
        transformedTrainings.push([trainings[i], trainings[i + 1]]);
      } else {
        transformedTrainings.push([trainings[i]]);
      }
    }
    return transformedTrainings;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {loading ? (
          <View style={styles.loadingCardTitle} />
        ) : (
          <Text style={styles.title}>
            {favourite.length
              ? "Favourite Trainings"
              : "Add these to favourites!"}
          </Text>
        )}
        <TouchableOpacity>
          <Text style={styles.seeAll}>{favourite.length ? "See all" : ""}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        style={styles.trainingsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {transformTrainings(trainingsToShow).map((trainingColumn, idx) => (
          <View style={styles.cardColumn} key={idx}>
            {trainingColumn.map((training) => (
              <TouchableOpacity
                style={
                  loading ? styles.loadingTrainingCard : styles.trainingCard
                }
                key={training.ID}
                onPress={() => onTrainingPress(training)}
              >
                {!loading ? (
                  <Image
                    source={{ uri: training?.PictureUrl }}
                    style={styles.trainingImage}
                  />
                ) : (
                  <View style={styles.loadingImage} />
                )}
                <View style={styles.infoContainer}>
                  <Text
                    style={loading ? styles.loadingTitle : styles.trainingTitle}
                    numberOfLines={1}
                  >
                    {loading ? "" : training.Name}
                  </Text>
                  <View style={styles.detailsContainer}>
                    <Text
                      style={
                        loading
                          ? styles.trainingDetailLoading
                          : styles.trainingDetail
                      }
                    >
                      {loading ? "" : `${training.Duration} min`}
                    </Text>
                    <Text
                      style={
                        loading
                          ? styles.trainingDetailLoading
                          : styles.trainingDetail
                      }
                    >
                      {loading ? "" : `${training.Difficulty}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FavouriteTrainings;

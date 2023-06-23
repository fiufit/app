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
import {isTrainingInFavorites} from "../../../utils/trainings";

const FavouriteTrainings = ({
  favorite,
  recommended,
  onTrainingPress,
  onSeeAllPress,
  loading,
}) => {
  const loadingPlaceholder = [{ ID: 1 }, { ID: 2 }, { ID: 3 }, { ID: 4 }];
  const [trainingsToShow, setTrainingsToShow] = useState([]);

  const transformTrainings = (trainings) => {
    let combinedTrainings = [...trainings];
    if (favorite.length < 4 && favorite.length !== 0) {
      combinedTrainings = combinedTrainings.concat(
        recommended
          .filter((training) => !isTrainingInFavorites(training.ID, favorite))
          .slice(0, 4 - favorite.length)
          .map((training) => ({ ...training, isRecommended: true }))
      );
    }

    const transformedTrainings = [];
    if (combinedTrainings.length <= 2) {
      return combinedTrainings.map((training) => [training]);
    }
    for (let i = 0; i < combinedTrainings.length; i += 2) {
      if (i + 1 < combinedTrainings.length) {
        transformedTrainings.push([
          combinedTrainings[i],
          combinedTrainings[i + 1],
        ]);
      } else {
        transformedTrainings.push([combinedTrainings[i]]);
      }
    }
    return transformedTrainings;
  };

  useEffect(() => {
    if (loading) {
      setTrainingsToShow(transformTrainings(loadingPlaceholder));
    } else if (favorite.length) {
      setTrainingsToShow(transformTrainings(favorite));
    } else {
      setTrainingsToShow(transformTrainings(recommended));
    }
  }, [favorite, recommended, loading]);


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {loading ? (
          <View style={styles.loadingCardTitle} />
        ) : (
          <Text style={styles.title}>
            {favorite.length ? "Favorite Trainings" : "Add these to favorites!"}
          </Text>
        )}
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>
            {favorite.length && !loading ? "See all" : ""}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        style={styles.trainingsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {trainingsToShow.map((trainingColumn, idx) => (
          <View style={styles.cardColumn} key={idx}>
            {trainingColumn.map((training) => (
              <TouchableOpacity
                style={
                  loading ? styles.loadingTrainingCard : styles.trainingCard
                }
                key={training.ID}
                onPress={() => onTrainingPress({...training, isRecommended: false})}
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
                    {loading
                      ? ""
                      : training.isRecommended
                      ? "Add this one!"
                      : training.Name}
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

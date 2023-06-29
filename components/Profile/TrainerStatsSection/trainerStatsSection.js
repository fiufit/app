import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.trainer-stats-section";
import FavoriteIcon from "../../../assets/images/general/favourite-outline.svg";
import StarIcon from "../../../assets/images/general/star-outline.svg";
import ReviewIcon from "../../../assets/images/general/review.svg";
import SessionIcon from "../../../assets/images/general/barbell-outline.svg";
import { useEffect, useState } from "react";
import { DARK_BLUE, LIGHT_GREY, WHITE } from "../../../utils/colors";
import { useRecoilValue } from "recoil";
import { createdTrainingsState } from "../../../atoms";
import {
  trainingsAverageRating,
  trainingsTotalFavorites,
  trainingsTotalReviews,
  trainingsTotalSessions,
} from "../../../utils/trainings";

const Stat = ({ icon, backgroundColor, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.stat} onPress={onPress}>
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: loading ? LIGHT_GREY : backgroundColor,
        }}
      >
        {!loading && icon}
      </View>
    </TouchableOpacity>
  );
};

const TrainerStatsSection = ({ loading }) => {
  const [selectedStat, setSelectedStat] = useState(0);
  const createdTrainings = useRecoilValue(createdTrainingsState);
  const [totalFavorites, setTotalFavorites] = useState(
    trainingsTotalFavorites(createdTrainings)
  );
  const [averageRating, setAverageRating] = useState(
    trainingsAverageRating(createdTrainings)
  );
  const [totalReviews, setTotalReviews] = useState(
    trainingsTotalReviews(createdTrainings)
  );
  const [totalSessions, setTotalSessions] = useState(
    trainingsTotalSessions(createdTrainings)
  );

  useEffect(() => {
    setTotalFavorites(trainingsTotalFavorites(createdTrainings));
    setAverageRating(trainingsAverageRating(createdTrainings));
    setTotalReviews(trainingsTotalReviews(createdTrainings));
    setTotalSessions(trainingsTotalSessions(createdTrainings));
  }, [createdTrainings]);

  const stats = [
    {
      icon: (color) => <FavoriteIcon color={color} height={20} width={30} />,
      value: totalFavorites,
      text: `total favorite${totalFavorites === 1 ? "" : "s"}`,
    },
    {
      icon: (color) => <StarIcon color={color} height={25} width={30} />,
      text: averageRating > 0 ? "average rating" : "no ratings yet",
      value: averageRating > 0 ? averageRating.toFixed(1) : "",
    },
    {
      icon: (color) => <ReviewIcon color={color} height={25} width={30} />,
      text: `total review${totalReviews === 1 ? "" : "s"}`,
      value: totalReviews,
    },
    {
      icon: (color) => <SessionIcon color={color} height={25} width={30} />,
      text: `total session${totalSessions === 1 ? "" : "s"} of your trainings`,
      value: totalSessions,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your stats</Text>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          return (
            <Stat
              icon={stat.icon(index === selectedStat ? "white" : "black")}
              backgroundColor={index === selectedStat ? DARK_BLUE : WHITE}
              onPress={() => {
                if (!loading) setSelectedStat(index);
              }}
              key={index}
              loading={loading}
            />
          );
        })}
      </View>
      {!loading && (
        <Text style={styles.statDetail}>
          <Text style={styles.statValue}>{stats[selectedStat].value}</Text>{" "}
          {stats[selectedStat].text}
        </Text>
      )}
    </View>
  );
};

export default TrainerStatsSection;

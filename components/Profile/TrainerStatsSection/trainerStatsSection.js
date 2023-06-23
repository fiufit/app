import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.trainer-stats-section";
import FavoriteIcon from "../../../assets/images/general/favourite-outline.svg";
import StarIcon from "../../../assets/images/general/star-outline.svg";
import HeartIcon from "../../../assets/images/general/heart-outline.svg";
import TrophyIcon from "../../../assets/images/general/trophy-outline.svg";
import { useState } from "react";
import { DARK_BLUE, WHITE } from "../../../utils/colors";
import { useRecoilValue } from "recoil";
import { createdTrainingsState } from "../../../atoms";

const Stat = ({ icon, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.stat} onPress={onPress}>
      <View style={{ ...styles.iconContainer, backgroundColor }}>{icon}</View>
    </TouchableOpacity>
  );
};

const TrainerStatsSection = ({ loading }) => {
  const [selectedStat, setSelectedStat] = useState(0);
  const createdTrainings = useRecoilValue(createdTrainingsState);
  const totalFavorites = createdTrainings
    .map((training) => training.FavoritesCount)
    .reduce((a, b) => a + b, 0);
  const averageRating =
    createdTrainings
      .map((training) => training.MeanScore)
      .reduce((a, b) => a + b, 0) / createdTrainings.length;
  const totalReviews = createdTrainings
    .map((training) => training.Reviews.length)
    .reduce((a, b) => a + b, 0);
  const maxTrainingRating = createdTrainings
    .map((training) => training.MeanScore)
    .reduce((a, b) => (a > b ? a : b), 0);

  const stats = [
    {
      icon: (color) => <FavoriteIcon color={color} height={20} width={30} />,
      value: totalFavorites,
      text: `total favorite${totalFavorites === 1 ? "" : "s"}`,
    },
    {
      icon: (color) => <StarIcon color={color} height={25} width={30} />,
      text: "average rating",
      value: averageRating.toFixed(1),
    },
    {
      icon: (color) => <HeartIcon color={color} height={25} width={30} />,
      text: `total review${totalReviews === 1 ? "" : "s"}`,
      value: totalReviews,
    },
    {
      icon: (color) => <TrophyIcon color={color} height={25} width={30} />,
      text: "max training rating",
      value: maxTrainingRating.toFixed(1),
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
              onPress={() => setSelectedStat(index)}
              key={index}
            />
          );
        })}
      </View>
      <Text style={styles.statDetail}>
        <Text style={styles.statValue}>{stats[selectedStat].value}</Text>{" "}
        {stats[selectedStat].text}
      </Text>
    </View>
  );
};

export default TrainerStatsSection;

import {ScrollView, View, Text, RefreshControl} from "react-native";
import { styles } from "./style.trainings";
import Button from "../Shared/Button/button";
import { GREEN, WHITE } from "../../utils/colors";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import FilterIcon from "../../assets/images/general/filterIcon.svg";
import RecommendedTraining from "./RecommendedTraining/recommendedTraining";
import FavouriteTrainings from "./FavouriteTrainings/favouriteTrainings";
import SearchBar from "../Shared/SearchBar/searchBar";
import TrainingAttempts from "./TrainingAttempts/trainingAttempts";
import {useSetRecoilState} from "recoil";
import {selectedTrainingState} from "../../atoms";
import {useEffect, useState} from "react";
import TrainingController from "../../utils/controllers/TrainingController";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase";

const Trainings = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const setSelectedTraining = useSetRecoilState(selectedTrainingState);
  const [recommendedTrainings, setRecommendedTrainings] = useState([]);
  const [favouriteTrainings, setFavouriteTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getRecommendedTrainings();
  }

  const fetchData = () => {
    setLoading(true);
    fetchRecommendedTrainings().then((trainings) => {
      setRecommendedTrainings(trainings);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleTrainingPress = (training) => {
    setSelectedTraining(training);
    navigation.navigate({
      name: "Single Training",
      merge: true,
      params: { training, start: true },
    });
  };

  const handleSeeMore = () => {
    navigation.navigate({
      name: "Training List",
      merge: true,
      params: { title: "Recommended Trainings", paramTrainings: recommendedTrainings, created: false },
    });
  }
  const handleAddTraining = () => {
    navigation.navigate({ name: "New Training", merge: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputAndButtonContainer}>
        <SearchBar
          placeholder={"Search"}
          height={48}
          width={"82%"}
          marginTop={0}
          backgroundColor={WHITE}
          left={<SearchIcon />}
          right={<FilterIcon />}
          fontFamily={"Lato_400Regular"}
          fontSize={14}
          navigation={navigation}
          redirect
          searchForUsers
          searchForTrainings
        />
        <Button
          style={styles.addButton}
          buttonColor={GREEN}
          fontSize={25}
          fontFamily={"Lato_400Regular"}
          onPress={handleAddTraining}
        >
          +
        </Button>
      </View>
      <ScrollView
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} />
        }
      >
        <RecommendedTraining
          training={recommendedTrainings[0] ?? null}
          onTrainingPress={handleSeeMore}
          loading={loading}
        />
        <FavouriteTrainings
          favourite={favouriteTrainings}
          recommended={recommendedTrainings.slice(1, 5)}
          onTrainingPress={handleTrainingPress}
          loading={loading}
        />
        <TrainingAttempts attempts={[]}/>
      </ScrollView>
    </View>
  );
};

export default Trainings;

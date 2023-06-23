import { ScrollView, View, Text, RefreshControl } from "react-native";
import { styles } from "./style.trainings";
import Button from "../Shared/Button/button";
import { GREEN, WHITE } from "../../utils/colors";
import SearchIcon from "../../assets/images/general/searchIcon.svg";
import FilterIcon from "../../assets/images/general/filterIcon.svg";
import RecommendedTraining from "./RecommendedTraining/recommendedTraining";
import FavouriteTrainings from "./FavouriteTrainings/favouriteTrainings";
import SearchBar from "../Shared/SearchBar/searchBar";
import TrainingAttempts from "./TrainingAttempts/trainingAttempts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  createdTrainingsState,
  favoriteTrainingsState,
  selectedSessionState,
  selectedTrainingState,
  trainingSessionsState,
} from "../../atoms";
import { useEffect, useState } from "react";
import TrainingController from "../../utils/controllers/TrainingController";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Trainings = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const setSelectedTraining = useSetRecoilState(selectedTrainingState);
  const setSelectedSession = useSetRecoilState(selectedSessionState);
  const [trainingSessions, setTrainingSessions] = useRecoilState(
    trainingSessionsState
  );
  const [favoriteTrainings, setFavoriteTrainings] = useRecoilState(
    favoriteTrainingsState
  );
  const [createdTrainings, setCreatedTrainings] = useRecoilState(
    createdTrainingsState
  );
  const [recommendedTrainings, setRecommendedTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getRecommendedTrainings();
  };

  const fetchTrainingSessions = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainingSessions();
  };

  const fetchFavoriteTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getFavoriteTrainings();
  };

  const fetchCreatedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainings();
  };

  const fetchUserTrainingsData = async () => {
    const promises = [
      fetchRecommendedTrainings(),
      fetchTrainingSessions(),
      fetchFavoriteTrainings(),
      fetchCreatedTrainings(),
    ];

    const [
      recommendedTrainings,
      trainingSessions,
      favoriteTrainings,
      userCreatedTrainings,
    ] = await Promise.all(promises);
    return {
      recommendedTrainings,
      trainingSessions,
      favoriteTrainings,
      userCreatedTrainings,
    };
  };

  const fetchData = () => {
    setLoading(true);

    fetchUserTrainingsData().then(
      ({
        recommendedTrainings,
        trainingSessions,
        favoriteTrainings,
        userCreatedTrainings,
      }) => {
        setRecommendedTrainings(recommendedTrainings);
        setTrainingSessions(trainingSessions);
        setFavoriteTrainings(favoriteTrainings);
        setCreatedTrainings(userCreatedTrainings);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTrainingPress = (training) => {
    if (!loading) {
      setSelectedTraining(training);
      navigation.navigate({
        name: "Single Training",
        merge: true,
        params: {
          training,
          start: true,
          userTraining: training.TrainerID === user.uid,
          createdTrainingIndex: createdTrainings.findIndex(
            (t) => t.id === training.id
          ),
        },
      });
    }
  };

  const handleSeeMore = () => {
    navigation.navigate({
      name: "Training List",
      merge: true,
      params: {
        title: "Recommended Trainings",
        paramTrainings: recommendedTrainings,
        created: false,
        favorites: false,
      },
    });
  };
  const handleAddTraining = () => {
    navigation.navigate({ name: "New Training", merge: true });
  };

  const handleSessionPress = (session, index) => {
    if (!loading) {
      setSelectedSession(session);
      navigation.navigate({
        name: "Training Attempt",
        merge: true,
        params: { session: session },
      });
    }
  };

  const handleFavoritesSeeAll = () => {
    navigation.navigate({
      name: "Training List",
      merge: true,
      params: {
        title: "Favorite Trainings",
        created: false,
        favorites: true,
      },
    });
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
          favorite={favoriteTrainings.slice(0, 4)}
          recommended={recommendedTrainings.slice(1, 5)}
          onTrainingPress={handleTrainingPress}
          loading={loading}
          onSeeAllPress={handleFavoritesSeeAll}
        />
        <TrainingAttempts
          navigation={navigation}
          sessions={trainingSessions}
          onSessionPress={handleSessionPress}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

export default Trainings;

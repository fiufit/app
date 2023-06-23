import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles.profile";
import DataSection from "./DataSection";
import MenuIcon from "../../assets/images/general/menuIcon.svg";
import { DARK_BLUE } from "../../utils/colors";
import { useEffect, useState } from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import CreatedTrainingsSection from "./CreatedTrainingsSection/CreatedTrainingsSection";
import GoalsSection from "./GoalsSection/GoalsSection";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import TrainingController from "../../utils/controllers/TrainingController";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  createdTrainingsState,
  favoriteTrainingsState,
  goalsState,
  trainingSessionsState,
  userDataState,
} from "../../atoms";
import StartedTrainingsSection from "./StartedTrainingsSection/startedTrainingsSection";
import ProfileController from "../../utils/controllers/ProfileController";
import TrainerStatsSection from "./TrainerStatsSection/trainerStatsSection";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [athleteProfileSelected, setAthleteProfileSelected] = useState(true);
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useRecoilState(
    createdTrainingsState
  );
  const [startedTrainings, setStartedTrainings] = useRecoilState(
    trainingSessionsState
  );
  const setFavoriteTrainings = useSetRecoilState(favoriteTrainingsState);
  const [goals, setGoals] = useRecoilState(goalsState);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCreatedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainings();
  };

  const fetchStartedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainingSessions();
  };

  const fetchFavoriteTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getFavoriteTrainings();
  };

  const fetchUserTrainings = async () => {
    const promises = [
      fetchCreatedTrainings(),
      fetchStartedTrainings(),
      fetchGoals(),
      fetchFavoriteTrainings(),
    ];

    const [createdTrainings, startedTrainings, goals, favoriteTrainings] =
      await Promise.all(promises);

    return { createdTrainings, startedTrainings, goals, favoriteTrainings };
  };

  const fetchFollowers = async () => {
    const controller = new ProfileController(user);
    const { data } = await controller.getFollowers();
    return data.followers;
  };

  const fetchFollowing = async () => {
    const controller = new ProfileController(user);
    const { data } = await controller.getFollowing();
    return data.followed;
  };

  const fetchGoals = async () => {
    const controller = new TrainingController(user);
    return await controller.getGoals();
  };

  const refreshData = async () => {
    setRefreshing(true);
    const promises = [fetchUserTrainings(), fetchFollowers(), fetchFollowing()];
    const [
      { createdTrainings, startedTrainings, goals, favoriteTrainings },
      followers,
      following,
    ] = await Promise.all(promises);
    setCreatedTrainings(createdTrainings);
    setStartedTrainings(startedTrainings);
    setGoals(goals);
    setFavoriteTrainings(favoriteTrainings);
    setUserData({ ...userData, followers, following });
    setRefreshing(false);
  };

  const fetchData = async () => {
    setLoading(true);

    const { createdTrainings, startedTrainings, goals, favoriteTrainings } =
      await fetchUserTrainings();

    setCreatedTrainings(createdTrainings);
    setStartedTrainings(startedTrainings);
    setGoals(goals);
    setFavoriteTrainings(favoriteTrainings);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          navigation.navigate({ name: "Profile Settings", merge: true })
        }
      >
        <MenuIcon color={DARK_BLUE} />
      </TouchableOpacity>
      <DataSection navigation={navigation} />
      <ProfileSwitcher
        setAthleteProfileSelected={setAthleteProfileSelected}
        athleteProfileSelected={athleteProfileSelected}
      />
      <View style={{ height: "90%", width: "100%" }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        >
          {athleteProfileSelected && (
            <StartedTrainingsSection
              navigation={navigation}
              startedTrainings={startedTrainings}
              loading={loading || refreshing}
            />
          )}
          {!athleteProfileSelected && (
            <CreatedTrainingsSection
              navigation={navigation}
              createdTrainings={createdTrainings}
              loading={loading || refreshing}
            />
          )}
          {athleteProfileSelected && (
            <GoalsSection
              goals={goals}
              loading={loading || refreshing}
              navigation={navigation}
            />
          )}
          {!athleteProfileSelected && createdTrainings.length > 0 && (
            <TrainerStatsSection />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

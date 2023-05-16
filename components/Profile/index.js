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
import WalletSection from "./WalletSection/WalletSection";
import GoalsSection from "./GoalsSection/GoalsSection";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import TrainingController from "../../utils/controllers/TrainingController";
import { useRecoilState } from "recoil";
import {
  createdTrainingsState,
  startedTrainingsState,
  userDataState,
} from "../../atoms";
import StartedTrainingsSection from "./StartedTrainingsSection/startedTrainingsSection";
import ProfileController from "../../utils/controllers/ProfileController";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [athleteProfileSelected, setAthleteProfileSelected] = useState(true);
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useRecoilState(
    createdTrainingsState
  );
  const [startedTrainings, setStartedTrainings] = useRecoilState(
    startedTrainingsState
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCreatedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainings();
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

  const refreshData = async () => {
    setRefreshing(true);
    const promises = [fetchCreatedTrainings(), fetchFollowers(), fetchFollowing()];
    const [trainings, followers, following] = await Promise.all(promises);
    setCreatedTrainings(trainings);
    setUserData({ ...userData, followers, following });
    setRefreshing(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const trainings = await fetchCreatedTrainings();
    setCreatedTrainings(trainings);
    setLoading(false);
  };

  useEffect(() => {
    //TODO fetch started trainings
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
        <DataSection navigation={navigation}/>
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
            {athleteProfileSelected && <GoalsSection />}
            <WalletSection />
          </ScrollView>
        </View>
      </View>
  );
};

export default Profile;

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { createdTrainingsState, startedTrainingsState } from "../../atoms";
import StartedTrainingsSection from "./StartedTrainingsSection/startedTrainingsSection";

const Profile = ({ navigation }) => {
  const [athleteProfileSelected, setAthleteProfileSelected] = useState(true);
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useRecoilState(
    createdTrainingsState
  );
  const [startedTrainings, setStartedTrainings] = useRecoilState(
    startedTrainingsState
  );
  const [loading, setLoading] = useState(true);
  const fetchCreatedTrainings = async () => {
    const controller = new TrainingController(user);
    return await controller.getTrainings();
  };

  useEffect(() => {
    //TODO fetch started trainings
    fetchCreatedTrainings().then((trainings) => {
      setCreatedTrainings(trainings);
      setLoading(false);
    });
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
      <DataSection
        onEditProfilePress={() =>
          navigation.navigate({ name: "Edit Profile", merge: true })
        }
      />
      <ProfileSwitcher
        setAthleteProfileSelected={setAthleteProfileSelected}
        athleteProfileSelected={athleteProfileSelected}
      />
      <View style={{ height: "90%", width: "100%" }}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}
          style={styles.scrollView}
        >
          {athleteProfileSelected && (
            <StartedTrainingsSection
              navigation={navigation}
              startedTrainings={startedTrainings}
              loading={loading}
            />
          )}
          {!athleteProfileSelected && (
            <CreatedTrainingsSection
              navigation={navigation}
              createdTrainings={createdTrainings}
              loading={loading}
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

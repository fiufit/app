import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.profile";
import DataSection from "./DataSection";
import MenuIcon from "../../assets/images/general/menuIcon.svg";
import { DARK_BLUE } from "../../utils/colors";
import { useState } from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import CreatedTrainingsSection from "./CreatedTrainingsSection/CreatedTrainingsSection";
import WalletSection from "./WalletSection/WalletSection";
import GoalsSection from "./GoalsSection/GoalsSection";

const Profile = ({ navigation }) => {
  const [athleteProfileSelected, setAthleteProfileSelected] = useState(true);
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
          {!athleteProfileSelected && <CreatedTrainingsSection navigation={navigation}/>}
          {athleteProfileSelected && <GoalsSection />}
          <WalletSection />
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

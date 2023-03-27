import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.profile-switcher";

const ProfileSwitcher = ({athleteProfileSelected, setAthleteProfileSelected}) => {

    const switchProfile = () => {
        setAthleteProfileSelected(!athleteProfileSelected);
    }

    return <View style={styles.profileSwitcher}>
        <TouchableOpacity style={athleteProfileSelected ? styles.profileSelected : styles.profileUnselected}
                          onPress={switchProfile} disabled={athleteProfileSelected}>
            <Text
                style={athleteProfileSelected ? styles.profileSelectedText : styles.profileUnselectedText}>
                Athlete
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={!athleteProfileSelected ? styles.profileSelected : styles.profileUnselected}
                          onPress={switchProfile} disabled={!athleteProfileSelected}>
            <Text
                style={!athleteProfileSelected ? styles.profileSelectedText : styles.profileUnselectedText}>
                Trainer
            </Text>
        </TouchableOpacity>
    </View>;
}

export default ProfileSwitcher;

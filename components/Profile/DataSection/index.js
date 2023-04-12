import {styles} from "./styles.data-section";
import {Image, Text, TouchableOpacity, View} from "react-native";
import exampleProfilePic from "../../../assets/images/examples/woman.png";
import VerifiedIcon from "../../../assets/images/profile/verifiedIcon.svg";
import {DARK_BLUE} from "../../../utils/colors";
import {useRecoilValue} from "recoil";
import {userDataState} from "../../../atoms";

const DataSection = ({onEditProfilePress}) => {
    const userData = useRecoilValue(userDataState);

    return(
        <View style={styles.profileDataSection}>
            <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/fiufit.appspot.com/o/profile_pictures%2Fdefault.png?alt=media&token=8242ac98-c07e-4217-8f07-3fddc5a727bc"}} style={styles.profilePicture}/>
            <View style={styles.nameAndFollowersContainer}>
                <View style={styles.upperSection}>
                    <Text style={styles.name}>{userData.DisplayName}</Text>
                    {userData.IsVerifiedTrainer && <VerifiedIcon color={DARK_BLUE}/>}
                </View>
                <View style={styles.lowerSection}>
                    <Text style={styles.followers}>127 followers</Text>
                    <TouchableOpacity  style={styles.editProfileButton} onPress={onEditProfilePress}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )

}

export default DataSection;

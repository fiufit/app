import {styles} from "./styles.data-section";
import {Image, Text, TouchableOpacity, View} from "react-native";
import exampleProfilePic from "../../../assets/images/examples/woman.png";
import VerifiedIcon from "../../../assets/images/profile/verifiedIcon.svg";
import {DARK_BLUE} from "../../../utils/colors";
import {useRecoilValue} from "recoil";
import {userDataState} from "../../../atoms";
import {DEFAULT_PROFILE_PICTURE} from "../../../firebase";

const DataSection = ({onEditProfilePress, other, otherUserData}) => {
    const userData = useRecoilValue(userDataState);
    const getImageToShow = () => {
        if (other){
            return otherUserData?.profilePictureUrl ?? DEFAULT_PROFILE_PICTURE;
        } else {
            return  userData?.profilePictureUrl ?? DEFAULT_PROFILE_PICTURE
        }
    }

    const handleFollow = () => {

    }

    return(
        <View style={styles.profileDataSection}>
            <Image source={{uri: getImageToShow()}} style={styles.profilePicture}/>
            <View style={styles.nameAndFollowersContainer}>
                <View style={styles.upperSection}>
                    <Text style={styles.name}>{other ? otherUserData.DisplayName : userData.DisplayName}</Text>
                    {!other && userData.IsVerifiedTrainer && <VerifiedIcon color={DARK_BLUE}/>}
                    {other && otherUserData.IsVerifiedTrainer && <VerifiedIcon color={DARK_BLUE}/>}
                </View>
                <View style={styles.lowerSection}>
                    <Text style={styles.followers}>127 followers</Text>
                    {!other && <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfilePress}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>}

                    {other && <TouchableOpacity style={styles.editProfileButton} onPress={handleFollow}>
                        <Text style={styles.editProfileText}>Follow</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )

}

export default DataSection;

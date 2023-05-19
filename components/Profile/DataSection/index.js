import { styles } from "./styles.data-section";
import { Image, Text, TouchableOpacity, View } from "react-native";
import VerifiedIcon from "../../../assets/images/profile/verifiedIcon.svg";
import { DARK_BLUE } from "../../../utils/colors";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../atoms";

const DataSection = ({ navigation, other, otherUserData, followsLoading }) => {
  const userData = useRecoilValue(userDataState);
  const getImageToShow = () => {
    return other ? otherUserData?.PictureUrl : userData.PictureUrl;
  };

  const handleFollowersPress = () => {
    if (!other) {
      if (userData.followers.length) {
        navigation.push("User List", {
          title: "Followers",
          showFollowers: true,
          other: false,
        });
      }
    } else {
      if (otherUserData.followers.length) {
        navigation.push("User List", {
          other: true,
          users: otherUserData.followers,
          title: `${otherUserData.Nickname}'s followers`,
        });
      }
    }
  };

  const handleFollowingPress = () => {
    if (!other) {
      if (userData.following.length) {
        navigation.push("User List", {
          name: "User List",
          title: "Following",
          showFollowers: false,
          other: false,
        });
      }
    } else {
      if (otherUserData.following.length) {
        navigation.push("User List", {
          other: true,
          users: otherUserData.following,
          title: `${otherUserData.Nickname} is following`,
        });
      }
    }
  };

  return (
    <View style={styles.profileDataSection}>
      <Image source={{ uri: getImageToShow() }} style={styles.profilePicture} />
      <View style={styles.nameAndFollowersContainer}>
        <View style={styles.upperSection}>
          <Text style={styles.name}>
            {other ? otherUserData.DisplayName : userData.DisplayName}
          </Text>
          {!other && userData.IsVerifiedTrainer && (
            <VerifiedIcon color={DARK_BLUE} />
          )}
          {other && otherUserData.IsVerifiedTrainer && (
            <VerifiedIcon color={DARK_BLUE} />
          )}
        </View>
        <View style={styles.lowerSection}>
          <View style={styles.followersContainer}>
            {!followsLoading && (
              <>
                <Text style={styles.followers} onPress={handleFollowersPress}>
                  {other
                    ? otherUserData?.followers?.length
                    : userData.followers.length}{" "}
                  followers
                </Text>
                <Text style={styles.followers} onPress={handleFollowingPress}>
                  {other
                    ? otherUserData?.following?.length
                    : userData.following.length}{" "}
                  following
                </Text>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default DataSection;

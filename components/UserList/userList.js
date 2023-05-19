import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles.user-list";
import Back from "../Shared/Back/back";
import { DARK_BLUE, WHITE } from "../../utils/colors";
import { DEFAULT_PROFILE_PICTURE } from "../../firebase";
import VerifiedIcon from "../../assets/images/profile/verifiedIcon.svg";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const UserList = ({ navigation, route }) => {
  const { users, title, showFollowers } = route.params;
  const userData = useRecoilValue(userDataState);
  const getUsersToShow = () => {
      return users ?? (showFollowers ? userData.followers : userData.following)
  }
  const handleBack = () => {
    navigation.goBack();
  };

  const handleUserCardPress = (user) => {
    if (user.ID === userData.ID) {
      navigation.navigate({ name: "ProfileView", merge: true });
    } else {
      navigation.navigate('Trainings', {
        screen: "View Profile",
        merge: true,
        params: { userData: user },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          width: "100%",
          height: "72%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ScrollView
          style={styles.usersContainer}
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {getUsersToShow().map((user) => {
            return (
              <TouchableOpacity
                style={styles.userCard}
                key={user.ID}
                onPress={() => handleUserCardPress(user)}
              >
                <Image
                  source={{ uri: user?.PictureUrl ?? DEFAULT_PROFILE_PICTURE }}
                  style={styles.profilePicture}
                />
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.nickname}>{user.Nickname}</Text>
                    {user.IsVerifiedTrainer && (
                      <VerifiedIcon color={DARK_BLUE} height={12} width={12} />
                    )}
                  </View>
                  <Text style={styles.name}>{user.DisplayName}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default UserList;

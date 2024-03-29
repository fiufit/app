import { RefreshControl, ScrollView, Text, View } from "react-native";
import { styles } from "./styles.view-profile";
import DataSection from "../Profile/DataSection";
import Back from "../Shared/Back/back";
import TrainingCard from "../Shared/TrainingCard/trainingCard";
import { useEffect, useState } from "react";
import TrainingController from "../../utils/controllers/TrainingController";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import ProfileController from "../../utils/controllers/ProfileController";
import Button from "../Shared/Button/button";
import { DARK_BLUE, LIGHT_GREY, MEDIUM_GREY, WHITE } from "../../utils/colors";
import { useRecoilState, useSetRecoilState } from "recoil";
import { selectedTrainingState, userDataState } from "../../atoms";
import { useIsFocused } from "@react-navigation/native";

const ViewProfile = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [user] = useIdToken(auth);
  const otherUserData = route.params.userData;
  const [createdTrainings, setCreatedTrainings] = useState([]);
  const [trainingsLoading, setTrainingsLoading] = useState(true);
  const [followsLoading, setFollowsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userData, setUserData] = useRecoilState(userDataState);
  const setSelectedTraining = useSetRecoilState(selectedTrainingState);

  const userIsFollowing = () => {
    return userData.following.some(
      (followed) => followed.ID === otherUserData.ID
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTrainingPress = (training) => {
    setSelectedTraining(training);
    navigation.navigate({
      name: "Single Training",
      merge: true,
      params: { training, start: true, userTraining: false },
    });
  };

  const handleFollow = async () => {
    setUserData({
      ...userData,
      following: [...userData.following, otherUserData],
    });
    setFollowers([...followers, userData]);

    const controller = new ProfileController(user);

    const data = await controller.followUser(otherUserData.ID);

    console.log("FOLLOW", data);
  };

  const handleUnfollow = async () => {
    setUserData({
      ...userData,
      following: userData.following.filter(
        (followed) => followed.ID !== otherUserData.ID
      ),
    });
    setFollowers(followers.filter((follower) => follower.ID !== userData.ID));

    const controller = new ProfileController(user);

    const data = await controller.unfollowUser(otherUserData.ID);

    console.log("UNFOLLOW", data);
  };

  const handleMessage = () => {
    navigation.navigate("Conversation", {
      otherUserName: otherUserData.DisplayName,
      otherUserId: otherUserData.ID,
      otherUserProfilePicture: otherUserData.PictureUrl,
    });
  };

  const fetchUserCreatedTrainings = async () => {
    const controller = new TrainingController(user);

    return await controller.getTrainings(otherUserData.ID);
  };

  const fetchUserFollows = async () => {
    const controller = new ProfileController(user);
    const promises = [
      controller.getFollowers(otherUserData.ID),
      controller.getFollowing(otherUserData.ID),
    ];
    const [{ data: followersData }, { data: followingData }] =
      await Promise.all(promises);

    return {
      followers: followersData.followers,
      following: followingData.followed,
    };
  };

  const refreshData = () => {
    setTrainingsLoading(true);
    fetchUserCreatedTrainings().then((trainings) => {
      setCreatedTrainings(trainings);
      setTrainingsLoading(false);
    });
    fetchUserFollows().then(({ followers, following }) => {
      setFollowers(followers);
      setFollowing(following);
      setFollowsLoading(false);
    });
  };

  useEffect(() => {
    if (isFocused) {
      setTrainingsLoading(true);
      setFollowsLoading(true);
      fetchUserCreatedTrainings().then((trainings) => {
        setCreatedTrainings(trainings);
        setTrainingsLoading(false);
      });
      fetchUserFollows().then(({ followers, following }) => {
        setFollowers(followers);
        setFollowing(following);
        setFollowsLoading(false);
      });
    }
  }, [otherUserData, isFocused]);

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <DataSection
        otherUserData={{ ...otherUserData, followers, following }}
        other
        followsLoading={followsLoading}
        navigation={navigation}
      />
      <View
        style={{
          height: "78%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            textColor={userIsFollowing() ? WHITE : MEDIUM_GREY}
            buttonColor={userIsFollowing() ? DARK_BLUE : LIGHT_GREY}
            onPress={!userIsFollowing() ? handleFollow : handleUnfollow}
          >
            {userIsFollowing() ? "Unfollow" : "Follow"}
          </Button>
          <Button
            style={styles.button}
            textColor={MEDIUM_GREY}
            buttonColor={LIGHT_GREY}
            onPress={handleMessage}
          >
            {"Message"}
          </Button>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Created trainings</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={followsLoading || trainingsLoading}
              onRefresh={refreshData}
            />
          }
          contentContainerStyle={{ alignItems: "center", flexGrow: 1, gap: 10 }}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {trainingsLoading ? (
            <>
              <TrainingCard />
              <TrainingCard />
              <TrainingCard />
            </>
          ) : (
            createdTrainings.length > 0 &&
            createdTrainings.map((training) => {
              return (
                <TrainingCard
                  title={training.Name}
                  duration={training.Duration}
                  imageSource={{ uri: training.PictureUrl }}
                  difficulty={training.Difficulty}
                  key={training.ID}
                  onPress={() => {
                    handleTrainingPress(training);
                  }}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewProfile;

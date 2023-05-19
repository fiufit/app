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
import { useRecoilState } from "recoil";
import { userDataState } from "../../atoms";

const ViewProfile = ({ navigation, route }) => {
  const [user] = useIdToken(auth);
  const [createdTrainings, setCreatedTrainings] = useState([]);
  const [trainingsLoading, setTrainingsLoading] = useState(true);
  const [followsLoading, setFollowsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userData, setUserData] = useRecoilState(userDataState);

  const userIsFollowing = () => {
    return userData.following.some(
      (followed) => followed.ID === route.params.userData.ID
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleTrainingPress = (training) => {
    navigation.navigate({
      name: "Single Training",
      merge: true,
      params: { training, start: true },
    });
  };

  const handleFollow = async () => {
    setUserData({
      ...userData,
      following: [...userData.following, route.params.userData],
    });
    setFollowers([...followers, userData]);

    const controller = new ProfileController(user);

    const data = await controller.followUser(route.params.userData.ID);

    console.log("FOLLOW", data);
  };

  const handleUnfollow = async () => {
    setUserData({
      ...userData,
      following: userData.following.filter(
        (followed) => followed.ID !== route.params.userData.ID
      ),
    });
    setFollowers([followers.filter((follower) => follower.ID !== userData.ID)]);

    const controller = new ProfileController(user);

    const data = await controller.unfollowUser(route.params.userData.ID);

    console.log("UNFOLLOW", data);
  };

  const fetchUserCreatedTrainings = async () => {
    const controller = new TrainingController(user);

    return await controller.getTrainings(route.params.userData.ID);
  };

  const fetchUserFollows = async () => {
    const controller = new ProfileController(user);
    const promises = [
      controller.getFollowers(route.params.userData.ID),
      controller.getFollowing(route.params.userData.ID),
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
  }, [route.params.userData]);

  return (
    <View style={styles.container}>
      <Back onPress={handleBack} />
      <DataSection
        otherUserData={{ ...route.params.userData, followers, following }}
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

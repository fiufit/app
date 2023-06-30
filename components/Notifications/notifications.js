import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles.notifications";
import { useRecoilState } from "recoil";
import { notificationsState } from "../../atoms";
import GoalIcon from "../../assets/images/general/trophy-outline.svg";
import VerifiedIcon from "../../assets/images/general/verified-notification.svg";
import RejectedIcon from "../../assets/images/general/rejected-notification.svg";
import {DARK_BLUE, GREY, LIGHT_GREY, WHITE} from "../../utils/colors";
import NotificationController from "../../utils/controllers/NotificationController";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { uniqueNotifications } from "../../utils/notifications";
import NoTrainingsMessage from "../Profile/NoTrainingsMessage/noTrainingsMessage";

const Notifications = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const handleNotificationPress = (notification) => {
    if (!notification.read) {
      const controller = new NotificationController(user);
      controller.markNotificationAsRead(notification.id).then((data) => {
        console.log("Notification read", data);
      });
    }
    setNotifications(
      notifications.map((n) => {
        if (n.id === notification.id) {
          return {
            ...n,
            read: true,
          };
        }

        return n;
      })
    );

    navigation.navigate(notification.data.redirectTo, notification.data.params);
  };

  const notificationIcon = (type) => {
    switch (type) {
      case "VERIFICATION_APPROVED":
        return <VerifiedIcon height={30} width={30} color={DARK_BLUE} />;
      case "VERIFICATION_REJECTED":
        return <RejectedIcon height={30} width={30} color={DARK_BLUE} />;
      default:
        return <GoalIcon height={30} width={30} color={DARK_BLUE} />;
    }
  };

  return (
      <View style={styles.container}>
          <View
              style={{
                  width: "100%",
                  height: "88%",
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 50,

              }}
          >
              <Text style={styles.title}>Notifications</Text>
              <ScrollView
                  style={styles.scrollContainer}
                  contentContainerStyle={{
                      alignItems: "center",
                      gap: 10,
                      display: "flex",
                  }}
              >
                  {uniqueNotifications(notifications).length > 0 &&
                      uniqueNotifications(notifications).map((notification) => {
                          return (
                              <TouchableOpacity
                                  style={styles.notificationCard}
                                  key={notification.id}
                                  onPress={() => handleNotificationPress(notification)}
                              >
                                  <View
                                      style={{
                                          ...styles.notificationImageContainer,
                                          backgroundColor: notification?.data?.params
                                              ?.followerPictureUrl
                                              ? LIGHT_GREY
                                              : WHITE,
                                      }}
                                  >
                                      {notification?.data?.params?.followerPictureUrl ? (
                                          <Image
                                              source={{
                                                  uri: notification.data.params.followerPictureUrl,
                                              }}
                                              style={styles.notificationImage}
                                          />
                                      ) : (
                                          notificationIcon(notification.data.type)
                                      )}
                                  </View>
                                  <View style={styles.notificationText}>
                                      <Text
                                          style={{
                                              ...styles.notificationBody,
                                              fontFamily: !notification.read
                                                  ? "Poppins_600SemiBold"
                                                  : "Poppins_400Regular",
                                          }}
                                      >
                                          {notification.body}
                                      </Text>
                                      <View style={styles.callToActionContainer}>
                                          <Text style={styles.callToActionText}>Check it out!</Text>
                                          {!notification.read && (
                                              <View style={styles.unreadIndicator} />
                                          )}
                                      </View>
                                  </View>
                              </TouchableOpacity>
                          );
                      })}
                  {uniqueNotifications(notifications).length === 0 && (
                      <View
                          style={{
                              width: "100%",
                              height: 550,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                      >
                          <NoTrainingsMessage
                              title={"You don't have any notification yet"}
                              callToActionText={"Start training!"}
                              onPress={() => navigation.navigate("Trainings")}
                          />
                      </View>
                  )}
              </ScrollView>
          </View>
      </View>
  );
};

export default Notifications;

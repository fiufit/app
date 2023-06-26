import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles.notifications";
import { useRecoilState } from "recoil";
import { notificationsState } from "../../atoms";
import GoalIcon from "../../assets/images/general/trophy-outline.svg";
import { DARK_BLUE } from "../../utils/colors";
import NotificationController from "../../utils/controllers/NotificationController";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { uniqueNotifications } from "../../utils/notifications";

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

  return (
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
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          gap: 10,
          display: "flex",
        }}
      >
        {notifications.length > 0 &&
          uniqueNotifications(notifications)
            .filter((notification) => notification.title === "FiuFit")
            .map((notification) => {
              return (
                <TouchableOpacity
                  style={styles.notificationCard}
                  key={notification.id}
                  onPress={() => handleNotificationPress(notification)}
                >
                  <View style={styles.notificationImageContainer}>
                    {notification?.data?.params?.followerPictureUrl ? (
                      <Image
                        source={{
                          uri: notification.data.params.followerPictureUrl,
                        }}
                        style={styles.notificationImage}
                      />
                    ) : (
                      <GoalIcon height={30} width={30} color={DARK_BLUE} />
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
      </ScrollView>
    </View>
  );
};

export default Notifications;

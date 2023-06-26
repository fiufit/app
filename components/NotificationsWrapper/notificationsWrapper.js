import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  expoPushTokenState,
  notificationsState,
  notificationSubscriptionIdState,
} from "../../atoms";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NotificationController from "../../utils/controllers/NotificationController";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PROJECT_ID } from "@env";
import { getNotificationIdByBody } from "../../utils/notifications";

//TODO: decide if we want to show push notifications while app is running
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsWrapper = ({ children }) => {
  const navigation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();
  const setExpoPushToken = useSetRecoilState(expoPushTokenState);
  const setNotificationSubscriptionId = useSetRecoilState(
    notificationSubscriptionIdState
  );
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const [user] = useAuthState(auth);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        const controller = new NotificationController(user);
        controller.subscribeToPushNotifications(token).then((data) => {
          console.log("DATA", data);
          setNotificationSubscriptionId(data.id);
        });
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION", notification);
        const notificationController = new NotificationController(user);
        notificationController.getNotifications().then(({ notifications }) => {
          setNotifications(notifications);
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION RESPONSE", response);

        const notificationController = new NotificationController(user);
        const notificationId = getNotificationIdByBody(
            notifications,
            response.notification.request.content.body
            );
        notificationController
          .markNotificationAsRead(
            notificationId
          )
          .then((data) => {
            console.log("Notification read", data);
            setNotifications(notifications.map((n) => {
                if (n.id === notificationId) {
                    return {
                    ...n,
                    read: true,
                    };
                }

                return n;
            }));
          });

        const { redirectTo, params } =
          response.notification.request.content.data;
        if (redirectTo) {
          navigation.navigate(redirectTo, params);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: EXPO_PROJECT_ID,
        })
      ).data;
      console.log("EXPO PUSH TOKEN", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  return <>{children}</>;
};

export default NotificationsWrapper;

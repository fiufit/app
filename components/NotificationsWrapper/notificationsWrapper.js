import {useEffect, useRef, useState} from "react";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import * as Device from "expo-device";
import {useSetRecoilState} from "recoil";
import {expoPushTokenState} from "../../atoms";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const NotificationsWrapper = ({ children }) => {
    const notificationListener = useRef();
    const responseListener = useRef();
    const setExpoPushToken = useSetRecoilState(expoPushTokenState);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log("NOTIFICATION", notification);
            // Do whatever you want to do with the notification
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log("NOTIFICATION RESPONSE", response);
            // Do whatever you want to do with the response
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("EXPO PUSH TOKEN", token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }


    return (
        <>
            {children}
        </>
    );
}

export default NotificationsWrapper;

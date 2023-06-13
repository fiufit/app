import LogoutIcon from "../../../assets/images/general/logoutIcon.svg";
import NotificationController from "../../../utils/controllers/NotificationController";
import {auth, signOutFromApp} from "../../../firebase";
import {useRecoilState, useSetRecoilState} from "recoil";
import {expoPushTokenState, notificationSubscriptionIdState, userDataState} from "../../../atoms";
import {useAuthState} from "react-firebase-hooks/auth";

const LogOutButton = () => {
    const [user] = useAuthState(auth);
    const [expoPushToken, setExpoPushToken] = useRecoilState(expoPushTokenState);
    const [notificationSubscriptionId, setNotificationSubscriptionId] = useRecoilState(notificationSubscriptionIdState);
    const setUserData = useSetRecoilState(userDataState);
    const handleLogout = async () => {
        const controller = new NotificationController(user);

        controller.unsubscribeFromPushNotifications(notificationSubscriptionId, expoPushToken).then(data => {
            console.log("Unsubscribed from push notifications", data);
        });

        await signOutFromApp(() => {
            setUserData({});
            setExpoPushToken('');
            setNotificationSubscriptionId('');
        });
    }

    return <LogoutIcon
        position={"absolute"}
        right={20}
        top={50}
        opacity={1}
        width={30}
        height={25}
        onPress={handleLogout}
    />
}

export default LogOutButton;

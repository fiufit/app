import {useRecoilState, useSetRecoilState} from "recoil";
import {notificationsState, userDataState} from "../../atoms";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Authentication from "./Authentication/authentication";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import AuthenticationController from "../../utils/controllers/AuthenticationController";
import EmailVerification from "./EmailVerification/emailVerification";
import { useEffect, useState } from "react";
import ProfileController from "../../utils/controllers/ProfileController";
import NotificationController from "../../utils/controllers/NotificationController";
import splashScreen from "../../assets/images/splash.png";
import {Image} from "react-native";

const AuthenticationWrapper = ({ children }) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const setNotifications = useSetRecoilState(notificationsState);
  const [loadingData, setLoadingData] = useState(false);
  const [user, loadingUser] = useIdToken(auth);

  const onUserChanged = async (user) => {
    if (user) {
      setLoadingData(true);
      if (!userData?.DisplayName) {
        const profileController = new ProfileController(user);
        const notificationController = new NotificationController(user);
        const promises = [
          profileController.getProfileData(),
          profileController.getFollowers(),
          profileController.getFollowing(),
          notificationController.getNotifications(),
        ];
        const [
          { data },
          { data: followersData },
          { data: followingData },
          notificationsData,
        ] = await Promise.all(promises);
        setNotifications(notificationsData?.notifications ?? []);
        setUserData({
          ...data,
          followers: followersData?.followers ?? [],
          following: followingData?.followed ?? [],
        });


      }
      if (!user.emailVerified) {
        const authController = new AuthenticationController(user);
        await authController.sendVerificationMail();
      }
      setLoadingData(false);
    }
  };

  useEffect(() => {
    onUserChanged(user);
  }, [user]);

  return (
    <>
      {loadingUser || loadingData ? (
        <>
          <Image source={splashScreen} style={{height: "100%", width: "100%", resizeMode: "cover"}}/>
        </>
      ) : user ? (
        user.emailVerified ? (
          userData?.DisplayName ? (
            children
          ) : (
            <RegisterSecondStepView user={user} />
          )
        ) : (
          <EmailVerification user={user} />
        )
      ) : (
        <Authentication />
      )}
    </>
  );
};

export default AuthenticationWrapper;

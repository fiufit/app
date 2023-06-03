import { useRecoilState } from "recoil";
import { userDataState } from "../../atoms";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Authentication from "./Authentication/authentication";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import AuthenticationController from "../../utils/controllers/AuthenticationController";
import EmailVerification from "./EmailVerification/emailVerification";
import LoadingModal from "../Shared/Modals/LoadingModal/loadingModal";
import { useEffect, useState } from "react";
import Background from "../Background/background";
import ProfileController from "../../utils/controllers/ProfileController";

const AuthenticationWrapper = ({ children }) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [loadingData, setLoadingData] = useState(false);
  const [user, loadingUser] = useIdToken(auth);

  const onUserChanged = async (user) => {
    if (user) {
      setLoadingData(true);
      if (!userData?.DisplayName) {
        const profileController = new ProfileController(user);
        const promises = [
          profileController.getProfileData(),
          profileController.getFollowers(),
          profileController.getFollowing(),
        ];
        const [{ data }, { data: followersData }, { data: followingData }] =
          await Promise.all(promises);

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
          <Background
            fromColor={"rgb(185, 213, 123)"}
            toColor={"rgb(254,254,253)"}
            styles={{ height: "100%" }}
          />
          <LoadingModal />
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

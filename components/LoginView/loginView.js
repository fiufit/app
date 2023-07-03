import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { signInWithGoogle, singIn } from "../../firebase";
import { useEffect, useState } from "react";

import Background from "../Background/background";
import Button from "../Shared/Button/button";
import ErrorModal from "../Shared/Modals/ErrorModal/ErrorModal";
import EyeIcon from "../../assets/images/general/eyeIcon.svg";
import HideEyeIcon from "../../assets/images/general/hideEyeIcon.svg";
import Input from "../Shared/Input/input";
import LoadingModal from "../Shared/Modals/LoadingModal/loadingModal";
import LockIcon from "../../assets/images/general/lockIcon.svg";
import LoginIcon from "../../assets/images/general/loginIcon.svg";
import MailIcon from "../../assets/images/general/mailIcon.svg";
import RequestController from "../../utils/controllers/RequestController";
import { WHITE } from "../../utils/colors";
import {sessionVerifiedState, userDataState} from "../../atoms";
import { styles } from "./styles.loginView";
import { useSetRecoilState } from "recoil";
import { EXPO_CLIENT_ID, EXPO_REDIRECT_URI, ANDROID_CLIENT_ID } from "@env";

const googleAuthConfig = {
  expoClientId: EXPO_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ["profile", "email"],
  redirectUri: EXPO_REDIRECT_URI, // Only for development
};

WebBrowser.maybeCompleteAuthSession();

const LoginView = ({ navigation }) => {
  const setUserData = useSetRecoilState(userDataState);
  const setIsSessionVerified = useSetRecoilState(sessionVerifiedState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [request, response, promptAsync] =
    Google.useAuthRequest(googleAuthConfig);

  function togglePasswordVisibility() {
    passwordIsVisible
      ? setPasswordIsVisible(false)
      : setPasswordIsVisible(true);
  }

  async function handleForgotPassword() {
    navigation.navigate({ name: "ResetPassword", merge: true });
  }

  async function handleLogIn() {
    setUserData({})
    try {
      const credential = await singIn(email, password);
      if (credential.user) {
        setIsSessionVerified(true);
        const controller = new RequestController(credential.user);
        controller
          .fetch("users/login?method=mail", "POST")
          .then((data) => console.log("LOGIN NOTIFY", data));
      }
      setLoading(false);
    } catch (error) {
      //TODO: Set a different error description based on the error.
      setErrorModalIsVisible(true);
      setErrorDescription(
        "There has been an error in the Login process. Please try again later!"
      );
    }
  }

  async function handleGoogleLogIn() {
    setUserData({})
    setLoading(true);
    await promptAsync();
  }

  function handleRegister() {
    navigation.navigate({ name: "RegisterFirstStep", merge: true });
  }

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      signInWithGoogle(response.authentication.accessToken).then(
        (credential) => {
          if (credential.user) {
            setIsSessionVerified(true);
            const controller = new RequestController(credential.user);
            controller
              .fetch("users/login?method=federated_entity", "POST")
              .then((data) => console.log("LOGIN NOTIFY", data));
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [response]);

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.greetings}>Hey there,</Text>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Input
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          width={"80%"}
          height={48}
          fontSize={12}
          left={<MailIcon height={18} width={18} />}
        />
        <Input
          style={styles.textInput}
          width={"80%"}
          height={48}
          fontSize={12}
          secureTextEntry={!passwordIsVisible}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          right={
            passwordIsVisible ? (
              <HideEyeIcon
                height={18}
                width={25}
                onPress={() => {
                  togglePasswordVisibility();
                }}
              />
            ) : (
              <EyeIcon
                height={18}
                width={25}
                onPress={() => {
                  togglePasswordVisibility();
                }}
              />
            )
          }
          left={<LockIcon height={18} width={18} />}
        />
        <View style={styles.forgotPasswordContainer}>
          <Text
            onPress={() => handleForgotPassword()}
            style={styles.forgotPasswordText}
          >
            Forgot your password?
          </Text>
        </View>
        <Button
          textColor={WHITE}
          fontSize={16}
          style={styles.loginButton}
          onPress={() => handleLogIn()}
          icon={<LoginIcon />}
        >
          Log In
        </Button>
        <Text style={styles.orText}>Or</Text>
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={handleGoogleLogIn}
        >
          <Image
            style={styles.googleImage}
            source={require("../../assets/googleIcon.png")}
          />
        </TouchableHighlight>
        <View style={styles.doNotHaveAccountContainer}>
          <Text style={styles.doNotHaveAccountText}>
            Don't have an account yet?{" "}
            <Text onPress={() => handleRegister()} style={styles.register}>
              Register
            </Text>{" "}
          </Text>
        </View>
        <ErrorModal
          modalIsVisible={errorModalIsVisible}
          setModalIsVisible={setErrorModalIsVisible}
          errorTitle="Oooops!"
          errorDescription={errorDescription}
        ></ErrorModal>
      </ScrollView>
      {loading && <LoadingModal />}
    </Background>
  );
};
export default LoginView;

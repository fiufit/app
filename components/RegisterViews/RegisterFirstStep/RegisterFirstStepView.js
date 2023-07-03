import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Checkbox, TextInput } from "react-native-paper";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import AuthenticationController from "../../../utils/controllers/AuthenticationController";
import Background from "../../Background/background";
import Button from "../..//Shared/Button/button";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import Input from "../../Shared/Input/input";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";
import { WHITE } from "../../../utils/colors";
import { signInWithGoogle } from "../../../firebase";
import { styles } from "./styles.RegisterFirstStepView";
import LockIcon from "../../../assets/images/general/lockIcon.svg";
import MailIcon from "../../../assets/images/general/mailIcon.svg";
import EyeIcon from "../../../assets/images/general/eyeIcon.svg";
import HideEyeIcon from "../../../assets/images/general/hideEyeIcon.svg";
import { EXPO_CLIENT_ID, EXPO_REDIRECT_URI, ANDROID_CLIENT_ID } from "@env";
import {userDataState} from "../../../atoms";
import {useSetRecoilState} from "recoil";

const googleAuthConfig = {
  expoClientId: EXPO_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  scopes: ["profile", "email"],
  redirectUri: EXPO_REDIRECT_URI, //Only for development
};

WebBrowser.maybeCompleteAuthSession();

const RegisterFirstStepView = ({ navigation }) => {
  const PASSWORD_MIN_CHARACTERS = 6;

  const setUserData = useSetRecoilState(userDataState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordRepeatIsVisible, setPasswordRepeatIsVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [request, response, promptAsync] =
    Google.useAuthRequest(googleAuthConfig);

  async function handleRegister() {
    setUserData({});
    if (!email || !password || !passwordRepeat) {
      setErrorModalIsVisible(true);
      setErrorDescription("You need to complete all fields!");
    } else if (password !== passwordRepeat) {
      setErrorModalIsVisible(true);
      setErrorDescription("Passwords don't match!");
    } else if (password?.length < PASSWORD_MIN_CHARACTERS) {
      setErrorModalIsVisible(true);
      setErrorDescription("The password should have at least 6 characters.");
    } else if (!termsAccepted) {
      setErrorModalIsVisible(true);
      setErrorDescription("Terms of use and Privacy policy were not accepted!");
    } else {
      setLoading(true);
      const controller = new AuthenticationController();
      try {
        await controller.startRegister(email, password);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setErrorModalIsVisible(true);
        setErrorDescription(
          "An unexpected error has occured while registering. Please try again later!"
        );
      }
    }
  }

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      console.log(response.authentication.accessToken);
      signInWithGoogle(response.authentication.accessToken).then((_) =>
        setLoading(false)
      );
    } else {
      setLoading(false);
    }
  }, [response]);

  function handleLogIn() {
    navigation.navigate({ name: "Login", merge: true });
  }

  async function handleGoogleRegister() {
    setUserData({});
    setLoading(true);
    await promptAsync();
  }

  function showPrivacyPolicy() {
    //TO DO
  }

  function showTermsOfUse() {
    //TO DO
  }

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
        <Text
          onPress={() => navigation.navigate({ name: "Home", merge: true })}
          style={styles.createAnAccount}
        >
          Create an Account
        </Text>
        <Input
          value={email}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          width={"80%"}
          height={48}
          fontSize={12}
          left={<MailIcon height={18} width={18} />}
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={password}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          width={"80%"}
          height={48}
          fontSize={12}
          backgroundColor={"#FFFFFF"}
          secureTextEntry={!passwordIsVisible}
          right={
            passwordIsVisible ? (
              <HideEyeIcon
                height={18}
                width={25}
                onPress={() => {
                  setPasswordIsVisible(!passwordIsVisible);
                }}
              />
            ) : (
              <EyeIcon
                height={18}
                width={25}
                onPress={() => {
                  setPasswordIsVisible(!passwordIsVisible);
                }}
              />
            )
          }
          left={<LockIcon height={18} width={18} />}
        />
        <Input
          value={passwordRepeat}
          placeholder="Repeat password"
          onChangeText={(passwordRepeat) => setPasswordRepeat(passwordRepeat)}
          width={"80%"}
          height={48}
          fontSize={12}
          backgroundColor={"#FFFFFF"}
          secureTextEntry={!passwordRepeatIsVisible}
          right={
            passwordRepeatIsVisible ? (
              <HideEyeIcon
                height={18}
                width={25}
                onPress={() => {
                  setPasswordRepeatIsVisible(!passwordRepeatIsVisible);
                }}
              />
            ) : (
              <EyeIcon
                height={18}
                width={25}
                onPress={() => {
                  setPasswordRepeatIsVisible(!passwordRepeatIsVisible);
                }}
              />
            )
          }
          left={<LockIcon height={18} width={18} />}
        />
        <View style={styles.checkboxPolicies}>
          <Checkbox
            color="black"
            status={termsAccepted ? "checked" : "unchecked"}
            onPress={() => {
              setTermsAccepted(!termsAccepted);
            }}
          />
          <Text style={styles.policiesText}>
            By continuing you accept our{" "}
            <Text
              style={styles.policies}
              onPress={() => {
                showPrivacyPolicy();
              }}
            >
              Privacy Policy
            </Text>{" "}
            and
          </Text>
        </View>
        <Text
          style={styles.policies}
          onPress={() => {
            showTermsOfUse();
          }}
        >
          Terms of Use
        </Text>
        <Button
          textColor={WHITE}
          fontSize={16}
          style={styles.registerButton}
          onPress={() => handleRegister()}
        >
          Register
        </Button>
        <Text style={styles.orText}>Or</Text>
        <TouchableHighlight
          underlayColor={"transparent"}
          onPress={handleGoogleRegister}
        >
          <Image
            style={styles.googleImage}
            source={require("../../../assets/googleIcon.png")}
          />
        </TouchableHighlight>
        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.alreadyHaveAccountText}>
            Already have an account?{" "}
            <Text onPress={() => handleLogIn()} style={styles.logIn}>
              Login
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

      {loading && <LoadingModal text={"Registering your profile"} />}
    </Background>
  );
};

export default RegisterFirstStepView;

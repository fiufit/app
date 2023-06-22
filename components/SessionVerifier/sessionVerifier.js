import * as LocalAuthentication from "expo-local-authentication";

import { DARK_GREY, LIGHT_GREY } from "../../utils/colors";
import { Image, ScrollView, Text, TouchableHighlight } from "react-native";
import { sessionVerifiedState, userDataState } from "../../atoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Background from "../Background/background";
import Button from "../Shared/Button/button";
import LogOutButton from "../Shared/LogOutButton/logOutButton";
import { styles } from "./styles.sessionVerifier";

const SessionVerifier = ({ children }) => {
  const [isSessionVerified, setIsSessionVerified] =
    useRecoilState(sessionVerifiedState);
  const [areBiometricsSupported, setAreBiometricsSupported] = useState(true);

  const userData = useRecoilValue(userDataState);

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Enter password",
    });
    auth.then((result) => {
      if (result.success) {
        setIsSessionVerified(true);
      }
    });
  }

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setAreBiometricsSupported(compatible);
    })();
  });

  return (
    <>
      {isSessionVerified ? (
        children
      ) : (
        <>
          <Background
            fromColor={"rgb(185, 213, 123)"}
            toColor={"rgb(254,254,253)"}
            styles={{ flex: 1, alignItems: "center" }}
          >
            <ScrollView
              style={{ width: "100%", position: "relative" }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Image
                style={styles.lockedCellphone}
                source={require("../../assets/lockedCellphone.png")}
              />
              {/* //The Face ID icon should be displayed only when the device has
                the appropriate hardware. */}

              <Text style={styles.greetings}>
                Hey there {userData.DisplayName},
              </Text>
              <Text style={styles.welcome}>Welcome Back!</Text>
              {areBiometricsSupported ? (
                <>
                  <Text style={styles.biometrics}>
                    Please use biometric data to continue
                  </Text>
                  <TouchableHighlight
                    underlayColor={"transparent"}
                    onPress={onAuthenticate}
                  >
                    <Image
                      style={styles.faceId}
                      source={require("../../assets/faceId.png")}
                    />
                  </TouchableHighlight>
                </>
              ) : (
                <>
                  <Text style={styles.configureBiometrics}>
                    Please configure the biometrics on your mobile device.
                  </Text>
                  <Text style={styles.noBiometrics}>
                    Or continue without this extra authentication (Not
                    recommended).
                  </Text>
                  <Button
                    style={styles.continueButton}
                    fontSize={13}
                    buttonColor={LIGHT_GREY}
                    textColor={DARK_GREY}
                    onPress={() => setIsSessionVerified(true)}
                  >
                    Continue
                  </Button>
                </>
              )}
              <LogOutButton />
            </ScrollView>
          </Background>
        </>
      )}
    </>
  );
};

export default SessionVerifier;

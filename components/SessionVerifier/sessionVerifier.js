import * as LocalAuthentication from "expo-local-authentication";

import { Image, ScrollView, Text, TouchableHighlight } from "react-native";
import { useEffect, useState } from "react";

import Background from "../Background/background";
import LogOutButton from "../Shared/LogOutButton/logOutButton";
import { styles } from "./styles.sessionVerifier";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../atoms";

const SessionVerifier = ({ children }) => {
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [areBiometricsSupported, setAreBiometricsSupported] = useState(false);

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

  function loginWithAnotherAccount() {
    // console.log("LOG IN WITH ANOTHER ACCOUNT");
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
              <LogOutButton />
            </ScrollView>
          </Background>
        </>
      )}
    </>
  );
};

export default SessionVerifier;

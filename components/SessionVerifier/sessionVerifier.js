import * as LocalAuthentication from "expo-local-authentication";

import { Button, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";

import Background from "../Background/background";

const SessionVerifier = ({ children }) => {
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [areBiometricsSupported, setAreBiometricsSupported] = useState(false);

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
              <View style={{ marginTop: 130 }}>
                <Button title="Press me" onPress={onAuthenticate}></Button>
                {/* //The Face ID icon should be displayed only when the device has
                the appropriate hardware. */}
              </View>
            </ScrollView>
          </Background>
        </>
      )}
    </>
  );
};

export default SessionVerifier;

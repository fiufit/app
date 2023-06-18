import { Button, ScrollView, View } from "react-native";

import Background from "../Background/background";
import { useState } from "react";

const SessionVerifier = ({ children }) => {
  const [isSessionVerified, setIsSessionVerified] = useState(false);

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
                <Button
                  title="Press me"
                  onPress={() => setIsSessionVerified(true)}
                ></Button>
              </View>
            </ScrollView>
          </Background>
        </>
      )}
    </>
  );
};

export default SessionVerifier;

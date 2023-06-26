import * as SplashScreen from "expo-splash-screen";

import {
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import AuthenticationWrapper from "./components/AuthenticationWrapper/authenticationWrapper";
import LocationWrapper from "./components/LocationWrapper/locationWrapper";
import { Provider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import Routes from "./components/Routes";
import SessionVerifier from "./components/SessionVerifier/sessionVerifier";
import { View } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Lato_700Bold,
    Lato_400Regular,
    Lato_300Light,
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <View
        onLayout={onLayoutRootView}
        style={{ width: "100%", height: "100%" }}
      >
        <Provider>
          <LocationWrapper>
            <AuthenticationWrapper>
              <SessionVerifier>
                <Routes />
              </SessionVerifier>
            </AuthenticationWrapper>
          </LocationWrapper>
        </Provider>
      </View>
    </RecoilRoot>
  );
};

export default App;

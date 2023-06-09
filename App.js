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
} from "@expo-google-fonts/poppins";

import AuthenticationWrapper from "./components/AuthenticationWrapper/authenticationWrapper";
import { Provider } from "react-native-paper";
import { RecoilRoot } from "recoil";
import Routes from "./components/Routes";
import { View } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import LocationWrapper from "./components/LocationWrapper/locationWrapper";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_400Regular,
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
              <Routes />
            </AuthenticationWrapper>
          </LocationWrapper>
        </Provider>
      </View>
    </RecoilRoot>
  );
};

export default App;

import * as SplashScreen from "expo-splash-screen";

import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import { Poppins_500Medium, Poppins_700Bold, Poppins_400Regular } from "@expo-google-fonts/poppins";

import { RecoilRoot } from "recoil";
import Routes from "./components/Routes";
import { View } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_400Regular,
    Lato_700Bold,
    Lato_400Regular,
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
        <Routes />
      </View>
    </RecoilRoot>
  );
};

export default App;

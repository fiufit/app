import {RecoilRoot} from "recoil";
import Routes from "./components/Routes";
import {useFonts} from 'expo-font';
import {Poppins_500Medium} from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen';
import {View, Text} from "react-native";
import {useCallback} from "react";

SplashScreen.preventAutoHideAsync();
const App = () => {
    const [fontsLoaded] = useFonts({
        Poppins_500Medium
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <RecoilRoot>
        <View onLayout={onLayoutRootView} style={{width: "100%", height: "100%"}}>
            <Routes/>
        </View>
    </RecoilRoot>
};

export default App;

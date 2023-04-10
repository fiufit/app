import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Profile from "../Profile";
import RegisterFirstStepView from "../RegisterViews/RegisterFirstStep/RegisterFirstStepView";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import TabBar from "../TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { styles } from "./styles.routes";
import Button from "../Shared/Button/button";
import {signOutFromApp} from "../../firebase";
import {useRecoilState} from "recoil";
import {userDataState} from "../../atoms";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
        backBehavior="history"
      >
        <Tab.Screen
          name="RegisterSecondStep"
          component={RegisterSecondStepView}
        />
        <Tab.Screen name="Home" component={InDevelopment} />
        <Tab.Screen name="Trainings" component={InDevelopment} />
        <Tab.Screen name="Messages" component={InDevelopment} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name={"Profile Settings"} component={InDevelopment} />
        <Tab.Screen name={"Edit Profile"} component={InDevelopment} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const InDevelopment = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userDataState);


  return (
    <View style={styles.container}>
      <Text>In development</Text>
        <Button textColor={"#FFFFFF"} style={{width: "40%"}} onPress={() => signOutFromApp(() => setUserData({}))}>Log Out</Button>
    </View>
  );
};

export default Routes;

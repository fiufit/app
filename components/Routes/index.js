import { Text, View } from "react-native";

import Button from "../Shared/Button/button";
import Conversation from "../Conversation/Conversation";
import EditProfile from "../Profile/EditProfile/editProfile";
import MessagingView from "../MessagingView/MessagingView";
import { NavigationContainer } from "@react-navigation/native";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import SingleTraining from "../Trainings/SingleTraining/singleTraining";
import TabBar from "../TabBar";
import TrainingList from "../TrainingList/trainingList";
import TrainingsNavigation from "../TrainingsNavigation/trainingsNavigation";
import UploadTraining from "../Trainings/UploadTraining/uploadTraining";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { signOutFromApp } from "../../firebase";
import { styles } from "./styles.routes";
import { useRecoilState } from "recoil";
import { userDataState } from "../../atoms";

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
        <Tab.Screen name="Trainings" component={TrainingsNavigation} />
        <Tab.Screen name="Single Training" component={SingleTraining} />
        <Tab.Screen name="New Training" component={UploadTraining} />
        <Tab.Screen
          name="Edit Training"
          component={UploadTraining}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen name="Training List" component={TrainingList} />
        <Tab.Screen name="Messages" component={MessagingView} />
        <Tab.Screen name="Conversation" component={Conversation} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name={"Profile Settings"} component={InDevelopment} />
        <Tab.Screen name={"Edit Profile"} component={EditProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const InDevelopment = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userDataState);

  return (
    <View style={styles.container}>
      <Text>In development</Text>
      <Button
        textColor={"#FFFFFF"}
        style={{ width: "40%" }}
        onPress={() => signOutFromApp(() => setUserData({}))}
      >
        Log Out
      </Button>
    </View>
  );
};

export default Routes;

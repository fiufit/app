import { Text, View } from "react-native";

import Button from "../Shared/Button/button";
import Conversation from "../Conversation/Conversation";
import EditProfile from "../Profile/EditProfile/editProfile";
import MessagingView from "../MessagingView/MessagingView";
import { NavigationContainer } from "@react-navigation/native";
import ProfileNavigation from "../ProfileNavigation/profileNavigation";
import RegisterSecondStepView from "../RegisterViews/RegisterSecondStep/RegisterSecondStepView";
import SearchView from "../SearchView/searchView";
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
import TrainingAttempt from "../TrainingAttempt/trainingAttempt";

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
        <Tab.Screen name="Search View" component={SearchView} />
        <Tab.Screen name="Profile" component={ProfileNavigation} />
        <Tab.Screen name="Profile Settings" component={EditProfile} />
        <Tab.Screen name="Training Attempt" component={TrainingAttempt} options={{ unmountOnBlur: true }}/>
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

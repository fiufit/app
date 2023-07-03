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
import TrainingAttempt from "../TrainingAttempt/trainingAttempt";
import Ratings from "../Ratings/ratings";
import SessionList from "../SessionList/sessionList";
import NotificationsWrapper from "../NotificationsWrapper/notificationsWrapper";
import UploadGoal from "../Goals/UploadGoal/uploadGoal";
import GoalList from "../Goals/GoalList/goalList";
import Notifications from "../Notifications/notifications";
import SessionVerifier from "../SessionVerifier/sessionVerifier";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <NotificationsWrapper>
        <SessionVerifier>
          <Tab.Navigator
            initialRouteName={"Trainings"}
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
            }}
            tabBar={(props) => <TabBar {...props} />}
            backBehavior="history"
          >
            <Tab.Screen
              name="RegisterSecondStep"
              component={gestureHandlerRootHOC(RegisterSecondStepView)}
            />
            <Tab.Screen name="Trainings" component={gestureHandlerRootHOC(TrainingsNavigation)} />
            <Tab.Screen name="Notifications" component={gestureHandlerRootHOC(Notifications)} />
            <Tab.Screen name="Single Training" component={gestureHandlerRootHOC(SingleTraining)} />
            <Tab.Screen name="New Training" component={gestureHandlerRootHOC(UploadTraining)} />
            <Tab.Screen
              name="Edit Training"
              component={gestureHandlerRootHOC(UploadTraining)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name="Training List" component={gestureHandlerRootHOC(TrainingList)} />
            <Tab.Screen name="Session List" component={gestureHandlerRootHOC(SessionList)} />
            <Tab.Screen name="Messages" component={gestureHandlerRootHOC(MessagingView)} />
            <Tab.Screen
              name="Conversation"
              component={gestureHandlerRootHOC(Conversation)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name="Search View" component={gestureHandlerRootHOC(SearchView)} />
            <Tab.Screen name="Profile" component={gestureHandlerRootHOC(ProfileNavigation)} />
            <Tab.Screen
              name="Profile Settings"
              component={gestureHandlerRootHOC(EditProfile)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name="Training Attempt"
              component={gestureHandlerRootHOC(TrainingAttempt)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name={"Ratings"}
              component={gestureHandlerRootHOC(Ratings)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name={"Create Goal"} component={gestureHandlerRootHOC(UploadGoal)} />
            <Tab.Screen
              name={"Update Goal"}
              component={gestureHandlerRootHOC(UploadGoal)}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name={"Goal List"}
              component={gestureHandlerRootHOC(GoalList)}
              options={{ unmountOnBlur: true }}
            />
          </Tab.Navigator>
        </SessionVerifier>
      </NotificationsWrapper>
    </NavigationContainer>
  );
};

export default Routes;

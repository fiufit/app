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
              component={RegisterSecondStepView}
            />
            <Tab.Screen name="Trainings" component={TrainingsNavigation} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Single Training" component={SingleTraining} />
            <Tab.Screen name="New Training" component={UploadTraining} />
            <Tab.Screen
              name="Edit Training"
              component={UploadTraining}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name="Training List" component={TrainingList} />
            <Tab.Screen name="Session List" component={SessionList} />
            <Tab.Screen name="Messages" component={MessagingView} />
            <Tab.Screen
              name="Conversation"
              component={Conversation}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name="Search View" component={SearchView} />
            <Tab.Screen name="Profile" component={ProfileNavigation} />
            <Tab.Screen name="Profile Settings" component={EditProfile} />
            <Tab.Screen
              name="Training Attempt"
              component={TrainingAttempt}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name={"Ratings"}
              component={Ratings}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen name={"Create Goal"} component={UploadGoal} />
            <Tab.Screen
              name={"Update Goal"}
              component={UploadGoal}
              options={{ unmountOnBlur: true }}
            />
            <Tab.Screen
              name={"Goal List"}
              component={GoalList}
              options={{ unmountOnBlur: true }}
            />
          </Tab.Navigator>
        </SessionVerifier>
      </NotificationsWrapper>
    </NavigationContainer>
  );
};

export default Routes;

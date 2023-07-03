import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Profile";
import UserList from "../UserList/userList";
import ViewProfile from "../ViewProfile/viewProfile";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"ProfileView"}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      backBehavior="history"
    >
      <Stack.Screen name={"ProfileView"} component={gestureHandlerRootHOC(Profile)} />
      <Stack.Screen name={"View Profile"} component={gestureHandlerRootHOC(ViewProfile)} />
      <Stack.Screen name={"User List"} component={gestureHandlerRootHOC(UserList)} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

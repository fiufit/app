import { createStackNavigator } from "@react-navigation/stack";
import Trainings from "../Trainings/trainings";
import ViewProfile from "../ViewProfile/viewProfile";
import SearchView from "../SearchView/searchView";
import UserList from "../UserList/userList";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";

const Stack = createStackNavigator();

const TrainingsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"TrainingsView"}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      backBehavior="history"
    >
      <Stack.Screen name={"TrainingsView"} component={gestureHandlerRootHOC(Trainings)} />
      <Stack.Screen name={"View Profile"} component={gestureHandlerRootHOC(ViewProfile)} />
      <Stack.Screen
        name={"Search View"}
        component={gestureHandlerRootHOC(SearchView)}
        options={{ unmountOnBlur: true }}
      />
      <Stack.Screen name={"User List"} component={gestureHandlerRootHOC(UserList)} />
    </Stack.Navigator>
  );
};

export default TrainingsNavigation;

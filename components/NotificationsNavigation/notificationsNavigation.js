import { createStackNavigator } from "@react-navigation/stack";
import ViewProfile from "../ViewProfile/viewProfile";
import UserList from "../UserList/userList";
import Notifications from "../Notifications/notifications";

const Stack = createStackNavigator();

const NotificationsNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={"NotificationsView"}
            screenOptions={{
                headerShown: false,
                animationEnabled: false,
            }}
            backBehavior="history"
        >
            <Stack.Screen name={"NotificationsView"} component={Notifications} />
            <Stack.Screen name={"View Profile"} component={ViewProfile} />
            <Stack.Screen name={"User List"} component={UserList} />
        </Stack.Navigator>
    );
};

export default NotificationsNavigation;

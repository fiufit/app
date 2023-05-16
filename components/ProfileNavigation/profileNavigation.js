import {createStackNavigator} from "@react-navigation/stack";
import Profile from "../Profile";
import UserList from "../UserList/userList";
const Stack = createStackNavigator();

const ProfileNavigation = () => {
    return(
        <Stack.Navigator
            initialRouteName={"ProfileView"}
            screenOptions={{
                headerShown: false,
                animationEnabled: false
            }}
            backBehavior="history"
        >
            <Stack.Screen
                name={"ProfileView"}
                component={Profile}
            />
            <Stack.Screen
                name={"Follows List"}
                component={UserList}
            />
        </Stack.Navigator>
    )
}

export default ProfileNavigation;

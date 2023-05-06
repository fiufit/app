import {createStackNavigator} from "@react-navigation/stack";
import Trainings from "../Trainings/trainings";
import ViewProfile from "../ViewProfile/viewProfile";
import SearchView from "../SearchView/searchView";
const Stack = createStackNavigator();

const TrainingsNavigation = () => {

    return(
            <Stack.Navigator
                initialRouteName={"TrainingsView"}
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false
                }}
                backBehavior="history"
            >
                <Stack.Screen
                    name={"TrainingsView"}
                    component={Trainings}
                />
                <Stack.Screen
                    name={"View Profile"}
                    component={ViewProfile}
                />
                <Stack.Screen
                    name={"Search View"}
                    component={SearchView}
                    options={{unmountOnBlur: true}}
                />
            </Stack.Navigator>
    )
}

export default TrainingsNavigation;
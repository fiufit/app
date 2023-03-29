import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TabBar from "../TabBar";
import {styles} from "./styles.routes";
import Profile from "../Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {

    return (
        <NavigationContainer >
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
                tabBar={props => <TabBar {...props}/>}
                backBehavior='history'
            >
                <Tab.Screen name="Home" component={InDevelopment} />
                <Tab.Screen name="Trainings" component={InDevelopment} />
                <Tab.Screen name="Messages" component={InDevelopment} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name={"Profile Settings"} component={InDevelopment}/>
                <Tab.Screen name={"Edit Profile"} component={InDevelopment}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};
const InDevelopment = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>In development</Text>
        </View>
    );
};

export default Routes;

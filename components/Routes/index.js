import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from "../TabBar";
import {styles} from "./styles.routes";
import {useRecoilValue} from "recoil";
import {exampleState} from "../../atoms";

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
                tabBar={props => <TabBar {...props}/>}

            >
                <Tab.Screen name="Home" component={TestHome} />
                <Tab.Screen name="Trainings" component={TestTrainings} />
                <Tab.Screen name="Messages" component={TestMessages} />
                <Tab.Screen name="Profile" component={TestProfile} />

            </Tab.Navigator>
        </NavigationContainer>
    );
};
const TestHome = ({navigation}) => {

    const example = useRecoilValue(exampleState)


    return (
        <View style={styles.container} >
            <Text>Home</Text>
            <Text>{example}</Text>
        </View>
    );
};

const TestTrainings = ({navigation}) => {

    const example = useRecoilValue(exampleState)


    return (
        <View style={styles.container} >
            <Text>Trainings</Text>
            <Text>{example}</Text>
        </View>
    );
};


const TestMessages = ({navigation}) => {

    const example = useRecoilValue(exampleState)


    return (
        <View style={styles.container} >
            <Text>Messages</Text>
            <Text>{example}</Text>
        </View>
    );
};

const TestProfile = ({navigation}) => {

    const example = useRecoilValue(exampleState)


    return (
        <View style={styles.container} >
            <Text>Profile</Text>
            <Text>{example}</Text>
        </View>
    );
};


export default Routes;

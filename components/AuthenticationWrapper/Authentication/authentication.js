import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginView from "../../LoginView/loginView";
import RegisterFirstStepView from "../../RegisterViews/RegisterFirstStep/RegisterFirstStepView";
import ResetPassword from "../../ResetPasword/resetPassword";

const Stack = createStackNavigator();

const Authentication = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
          headerShown: false,
        }}
        backBehavior="history"
      >
        <Stack.Screen name={"Login"} component={LoginView} />
        <Stack.Screen
          name={"RegisterFirstStep"}
          component={RegisterFirstStepView}
        />
        <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Authentication;

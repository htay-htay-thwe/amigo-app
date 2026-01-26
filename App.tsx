import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./components/navigation/BottomTabs";
import TripPlan from "./app/screens/TripPlan";
import StepStack from "./components/navigation/StepStack";
import GetStarted from "./app/screens/GetStarted";
import Login from "./app/screens/Login";
import CreateAccount from "./app/screens/CreateAccount";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="Notifications" component={TripPlan} />
        <Stack.Screen name="Steps" component={StepStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



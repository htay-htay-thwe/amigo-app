import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./components/navigation/BottomTabs";
import StepStack from "./components/navigation/StepStack";
import ToastManager from "toastify-react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="Steps" component={StepStack} />
      </Stack.Navigator>

      <ToastManager />
    </NavigationContainer>
  );
}

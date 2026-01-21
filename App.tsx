import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "./app/screens/StepOne";
import StepTwo from "./app/screens/StepTwo";
import StepThree from "./app/screens/StepThree";
import StepFour from "./app/screens/StepFour";
import StepFive from "./app/screens/StepFive";
import StepSix from "./app/screens/StepSix";
import StepConfirm from "./app/screens/StepConfirm";



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StepOne" component={StepOne}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepTwo" component={StepTwo}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepThree" component={StepThree}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepFour" component={StepFour}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepFive" component={StepFive}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepSix" component={StepSix}  options={{ headerShown: false }}/>
        <Stack.Screen name="StepConfirm" component={StepConfirm}  options={{ headerShown: false }}/>

        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

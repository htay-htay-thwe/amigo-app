import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepOne from "../../app/screens/StepOne";
import StepTwo from "../../app/screens/StepTwo";
import StepThree from "../../app/screens/StepThree";
import StepFour from "../../app/screens/StepFour";
import StepFive from "../../app/screens/StepFive";
import StepSix from "../../app/screens/StepSix";
import StepConfirm from "../../app/screens/StepConfirm";
import TripPlan from "../../app/screens/TripPlan";
import Save from "../../app/screens/Save";


const Stack = createNativeStackNavigator();

export default function StepStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StepOne" component={StepOne} />
            <Stack.Screen name="StepTwo" component={StepTwo} />
            <Stack.Screen name="StepThree" component={StepThree} />
            <Stack.Screen name="StepFour" component={StepFour} />
            <Stack.Screen name="StepFive" component={StepFive} />
            <Stack.Screen name="StepSix" component={StepSix} />
            <Stack.Screen name="StepConfirm" component={StepConfirm} />
            <Stack.Screen name="TripPlan" component={TripPlan} />
            <Stack.Screen name="Save" component={Save} />
        </Stack.Navigator>
    );
}

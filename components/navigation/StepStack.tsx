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
import TripDetails from "../../app/screens/TripDetails";
import TripEdit from "../../app/screens/TripEdit";
import PlanCheck from "../../app/screens/PlanCheck";
import GetStarted from "../../app/screens/GetStarted";
import Login from "../../app/screens/Login";
import Register from "../../app/screens/Register";


const Stack = createNativeStackNavigator();

export default function StepStack() {
    return (
         <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="StepOne" component={StepOne} />
            <Stack.Screen name="StepTwo" component={StepTwo} />
            <Stack.Screen name="StepThree" component={StepThree} />
            <Stack.Screen name="StepFour" component={StepFour} />
            <Stack.Screen name="StepFive" component={StepFive} />
            <Stack.Screen name="StepSix" component={StepSix} />
            <Stack.Screen name="StepConfirm" component={StepConfirm} />
            <Stack.Screen name="TripPlan" component={TripPlan} />
            <Stack.Screen name="Save" component={Save} />
            <Stack.Screen name="TripDetails" component={TripDetails}
                options={{
                    headerShown: true,
                    headerTitle: "Trip Plans",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#0D47A1"
                    },
                }} />
            <Stack.Screen name="TripEdit" component={TripEdit}
                options={{
                    headerShown: true,
                    headerTitle: "Edit Trip Plans",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#0D47A1"
                    },
                }} />
            <Stack.Screen name="PlanCheck" component={PlanCheck}
                options={{
                    headerShown: true,
                    headerTitle: "Plan Check",
                    headerStyle: {
                        backgroundColor: "#DBEAFE",
                    },
                    headerTintColor: "black",
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "500",
                        color: "#0D47A1"
                    },
                }} />
        </Stack.Navigator>
    );
}

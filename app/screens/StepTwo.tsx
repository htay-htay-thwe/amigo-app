import { SafeAreaView, Text, View } from "react-native";
import Head from "../DataForm/Head";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import TripToggle from "../DataForm/TripToggle";
import { useNavigation } from "@react-navigation/native";


export default function StepTwo() {
    const navigation = useNavigation();   
    return (
        <View>
            <Head />
            {/* Contents */}
            <SafeAreaView>
                <View className="flex gap-5 px-4 mt-5">
                    <StepIndicatorComponent labels="1" />

                    <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                        When do you plan to go?
                    </Text>
                    <TripToggle />
                    <DatePicker />

                    <View className="items-center ">
                        <Button onPress={() => navigation.navigate("StepThree")} title="Next" variant="primary" size="md" />
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
}
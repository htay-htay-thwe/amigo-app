import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import TripToggle from "../DataForm/TripToggle";
import { useNavigation } from "@react-navigation/native";
import Toggle from "../../components/ui/Toggle";
import { useState } from "react";


export default function StepTwo() {
    const navigation = useNavigation();
    const [fromTo, setFromTo] = useState<"from" | "to">("from");

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={20}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <Head />
                    {/* Contents */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled">
                        <SafeAreaView className="flex-1">
                            <View className="flex gap-5 px-4 mt-5">
                                <StepIndicatorComponent currentStep={2} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    When do you plan to go?
                                </Text>

                                <Toggle
                                    type="fromTo"
                                    value={fromTo}
                                    onChange={setFromTo}
                                />

                                <DatePicker />

                                <View className="items-center ">
                                    <Button title="Next" onPress={() => navigation.navigate("StepThree")} variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
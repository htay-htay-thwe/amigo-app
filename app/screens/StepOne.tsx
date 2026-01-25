import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useTripStore } from "../../components/store/trip.store";
import { useState } from "react";


export default function StepOne() {
    const navigation = useNavigation();

    const setDestination = useTripStore((s) => s.setDestination);
    console.log(setDestination);

    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onNext = () => {
        if (value.trim() === "") {
            setError("* required");
            return;
        }
        setDestination(value);
        navigation.navigate("StepTwo");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Head />
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled">
                        {/* Contents */}
                        <SafeAreaView className="flex-1">
                            <View className="flex gap-10 px-4 ">
                                <StepIndicatorComponent currentStep={1} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    Where do you want to go for your holiday?
                                </Text>

                                <View>
                                    <Input value={value} error={error}
                                        onChangeText={setValue} placeholder="i.e, Sydney, London etc." size="lg" variant="primary" icon="location-outline" iconColor="#0D47A1" iconSize={26} />
                                    {error !== "" && (
                                        <Text className="text-red-500 mt-2">{error}</Text>
                                    )}
                                </View>

                                <View className="items-center mt-12">
                                    <Button onPress={onNext} title="Next" variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
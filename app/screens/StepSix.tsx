import { StatusBar, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { useTripStore } from "../../components/store/trip.store";
import clsx from "clsx";
import { planTripFunc } from "../../components/func/SubFunction";


export default function StepSix() {
    const navigation = useNavigation<any>();
    const [userPrompt, setUserPrompt] = useState("");
    const [error, setError] = useState("");
    const setUserPromptsStore = useTripStore((s) => s.setUserPrompts);


    const onNext = () => {
        if (userPrompt.trim() === "") {
            setError("* required");
            return;
        }

        setUserPromptsStore(userPrompt);
        const trip = useTripStore.getState();
        // Navigate first (UX-friendly)
        navigation.navigate("TripPlan");
        // Fire-and-forget
        planTripFunc(trip);
    };



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Head />
                    {/* Contents */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled">
                        <SafeAreaView style={{ flex: 1 }}>
                            <View className="flex gap-5 px-4 pb-10">
                                <StepIndicatorComponent currentStep={6} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    What would you like to do on this trip?
                                </Text>

                                <Text className="mt-2 font-semibold text-center text-md text-primary">
                                    Share your interests, travel styles and must-see places
                                </Text>

                                <View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={6}
                                        className={clsx("border mt-3 border-gray-300 rounded-lg p-4 min-h-[200px] text-base",
                                            error !== "" ? "border-red-500" : "border-gray-300"
                                        )}
                                        textAlignVertical="top"
                                        placeholder="I enjoy Asian cultural experiences, traditional local food, and scenic nature. I prefer a relaxed 
travel style, moderate budget, and must-see temples, heritage sites, street markets, and hidden local spots."
                                        placeholderTextColor="#999"
                                        value={userPrompt}
                                        onChangeText={setUserPrompt}
                                    />
                                    {error !== "" && (
                                        <Text className="mt-2 text-red-500">{error}</Text>
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


const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 800
): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;

        console.warn(`🔁 Retry left: ${retries}`);
        await sleep(delay);

        return retry(fn, retries - 1, delay * 1.5); // backoff
    }
}

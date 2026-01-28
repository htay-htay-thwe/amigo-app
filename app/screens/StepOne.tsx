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
    const navigation = useNavigation<any>();

    const setDestination = useTripStore((s) => s.setDestination);
    const setOrigin = useTripStore((s) => s.setOrigin);
    const setDestinationAirport = useTripStore((s) => s.setDestinationAirport);
    const [value, setValue] = useState("");
    const [originState, setOriginState] = useState("");
    const [destinationAirport, setDestinationAirportState] = useState("");
    const [error, setError] = useState("");

    const onNext = () => {
        if (value.trim() === "" || originState.trim() === "" || destinationAirport.trim() === "") {
            setError("* required");
            return;
        }
        setDestination(value);
        setOrigin(originState);
        setDestinationAirport(destinationAirport);
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
                                    {error !== "" && (
                                        <Text className="mb-2 text-red-500">{error}</Text>
                                    )}
                                    <Input value={value} error={error}
                                        onChangeText={setValue} placeholder="i.e, Sydney, London etc." size="lg" variant="primary" icon="location-outline" iconColor="#0D47A1" iconSize={26} />
                                </View>

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    What is international airport of your place?
                                </Text>

                                <View>
                                    <Input value={originState} error={error}
                                        onChangeText={setOriginState} placeholder="i.e, short code - DMK etc." size="lg" variant="primary" icon="location-outline" iconColor="#0D47A1" iconSize={26} />
                                </View>

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    What is the international Airport code for destination country or city?
                                </Text>

                                <View>
                                    <Input value={destinationAirport} error={error}
                                        onChangeText={setDestinationAirportState} placeholder="i.e, short code - PVG etc." size="lg" variant="primary" icon="location-outline" iconColor="#0D47A1" iconSize={26} />
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
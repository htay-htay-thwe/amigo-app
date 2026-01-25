import { Keyboard, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { nationalities } from "../../components/constants/nation";
import Toggle from "../../components/ui/Toggle";
import { useTripStore } from "../../components/store/trip.store";


export default function StepFive() {
    const navigation = useNavigation();
    const [nationality, setNationality] = useState("Thai");
    const [tripType, setTripType] = useState<"domestic" | "international">("domestic");

    const setNationalityStore = useTripStore((s) => s.setNationality);
    const setTravelTypeStore = useTripStore((s) => s.setTravelType);
    const [error, setError] = useState("");

    const onNext = () => {
        if (nationality.trim() === "" || tripType.trim() === "") {
            setError("* required");
            return;
        }
        setNationalityStore(nationality);
        setTravelTypeStore(tripType);
        navigation.navigate("StepSix");
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
                            {error !== "" && (
                                <Text className="text-red-500 mt-2">{error}</Text>
                            )}
                            <View className="flex gap-10 px-4 pb-10">
                                <StepIndicatorComponent currentStep={5} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    What is your nationality?
                                </Text>

                                <View className="w-full">
                                    <Dropdown
                                        data={nationalities.map((c) => ({
                                            label: c,
                                            value: c,
                                        }))}
                                        labelField="label"
                                        valueField="value"
                                        value={nationality}
                                        onChange={(item) => setNationality(item.value)}
                                        placeholder="Select Nationality"
                                        renderLeftIcon={() => (
                                            <FontAwesome6 name="flag" size={22} color="white" />
                                        )}
                                        placeholderStyle={{
                                            fontSize: 18,
                                            textAlign: 'center',
                                            color: "white"
                                        }}
                                        style={{
                                            backgroundColor: "#0D47A1",
                                            height: 56,
                                            borderRadius: 12,
                                            paddingHorizontal: 16,
                                            borderColor: "#0D47A1",
                                            borderWidth: 1,
                                        }}
                                        selectedTextStyle={{
                                            color: "white",
                                            fontSize: 16,
                                            fontWeight: "600",
                                            textAlign: 'center',
                                        }}

                                        iconColor="white"
                                    />
                                </View>


                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    Is your trip domestic or international?
                                </Text>

                                <Toggle
                                    type="tripType"
                                    value={tripType}
                                    onChange={setTripType}
                                />


                            </View>
                            <View className="items-center mt-12">
                                <Button onPress={onNext} title="Next" variant="primary" size="md" />
                            </View>
                        </SafeAreaView>
                    </ScrollView>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
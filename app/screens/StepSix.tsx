import { StatusBar, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";

export default function StepSix() {
    const navigation = useNavigation();
    const [specialRequirements, setSpecialRequirements] = useState("");
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

                                <TextInput
                                    multiline={true}
                                    numberOfLines={6}
                                    className="border mt-3 border-gray-300 rounded-lg p-4 min-h-[200px] text-base"
                                    textAlignVertical="top"
                                    placeholder="I enjoy Asian cultural experiences, traditional local food, and scenic nature. I prefer a relaxed 
travel style, moderate budget, and must-see temples, heritage sites, street markets, and hidden local spots."
                                    placeholderTextColor="#999"
                                    value={specialRequirements}
                                    onChangeText={setSpecialRequirements}
                                />

                                <View className="items-center mt-12">
                                    <Button onPress={() => navigation.navigate("TripPlan")} title="Next" variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
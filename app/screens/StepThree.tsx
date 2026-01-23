import { StatusBar, Text, View, TouchableOpacity, Platform, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function StepThree() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState<"solo" | "friends" | "family">("solo");
    const [count, setCount] = useState(3);

    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 1) setCount(count - 1);
    };

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
                            <View className="flex gap-5 px-4 ">
                                <StepIndicatorComponent currentStep={3} />

                                <Text className="px-5 mt-2 text-2xl font-semibold text-center text-primary ">
                                    Who is going with you?
                                </Text>

                                {/* Selection Buttons */}
                                <View className="gap-3 mt-5">
                                    <Button
                                        title="Solo"
                                        variant={selectedOption === "solo" ? "primary" : "secondary"}
                                        size="lg"
                                        onPress={() => setSelectedOption("solo")}
                                        icon="person"
                                    />

                                    <Button
                                        title="Friends"
                                        variant={selectedOption === "friends" ? "primary" : "secondary"}
                                        size="lg"
                                        onPress={() => setSelectedOption("friends")}
                                        icon="people"
                                    />

                                    <Button
                                        title="Family"
                                        variant={selectedOption === "family" ? "primary" : "secondary"}
                                        size="lg"
                                        onPress={() => setSelectedOption("family")}
                                        icon="home"
                                    />
                                </View>

                                {/* Counter */}
                                <View className="flex-row items-center justify-center gap-20 mt-5">
                                    <Button sign="+" onPress={increment} />
                                    <Text className="text-3xl font-semibold text-gray-700">{count}</Text>
                                    <Button sign="−" onPress={decrement} />
                                </View>

                                <View className="items-center mt-10">
                                    <Button onPress={() => navigation.navigate("StepFour")} title="Next" variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
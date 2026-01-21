import { StatusBar, Text, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform } from "react-native";



export default function StepFive() {
    const navigation = useNavigation();
    const [nationality, setNationality] = useState("Thai");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [tripType, setTripType] = useState<"domestic" | "international">("domestic");

    const nationalities = ["Thai", "American", "European", "Myanmar", "Japanese", "Australian", "Korean", "Chinese"];

    const handleSelectNationality = (nat: string) => {
        setNationality(nat);
        setDropdownVisible(false);
    };

    return (
        <View className="flex-1">
            <Head />

            {/* Contents */}
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView 
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="flex gap-10 px-4 pb-10">
                            <StepIndicatorComponent labels="4" />

                            <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                                What is your nationality?
                            </Text>

                            {/* Dropdown */}
                            <View className="gap-2">
                                <Text className="text-gray-600 text-sm">Nationality</Text>
                                <TouchableOpacity
                                    onPress={() => setDropdownVisible(!dropdownVisible)}
                                    className="border border-primary rounded-xl bg-primary h-16 justify-center px-4 flex-row items-center"
                                >
                                    <Text className="text-white font-semibold text-lg flex-1">{nationality}</Text>
                                    <Ionicons 
                                        name={dropdownVisible ? "chevron-up" : "chevron-down"} 
                                        size={24} 
                                        color="white" 
                                    />
                                </TouchableOpacity>

                                {/* Dropdown Menu */}
                                {dropdownVisible && (
                                    <ScrollView className="border border-gray-300 rounded-xl bg-white mt-1 shadow-lg max-h-64">
                                        {nationalities.map((nat) => (
                                            <TouchableOpacity
                                                key={nat}
                                                onPress={() => handleSelectNationality(nat)}
                                                className={`py-4 px-4 border-b border-gray-200 ${
                                                    nat === nationality ? "bg-blue-50" : ""
                                                }`}
                                            >
                                                <Text className={`text-base ${
                                                    nat === nationality ? "text-primary font-semibold" : "text-gray-700"
                                                }`}>
                                                    {nat}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                )}
                            </View>

                            <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                                Is your trip domestic or international?
                            </Text>

                            {/* Toggle Switch */}
                            <View className="flex-row items-center justify-center rounded-full p-1" style={{ backgroundColor: '#E5E7EB' }}>
                                <TouchableOpacity
                                    onPress={() => setTripType("domestic")}
                                    className={`flex-1 py-3 rounded-full items-center ${
                                        tripType === "domestic" ? "bg-primary" : "bg-transparent"
                                    }`}
                                >
                                    <Text className={`font-semibold ${
                                        tripType === "domestic" ? "text-white" : "text-gray-600"
                                    }`}>
                                        domestic
                                    </Text>
                                </TouchableOpacity>
 
                                <TouchableOpacity
                                    onPress={() => setTripType("international")}
                                    className={`flex-1 py-3 rounded-full items-center ${
                                        tripType === "international" ? "bg-primary" : "bg-transparent"
                                    }`}
                                >
                                    <Text className={`font-semibold ${
                                        tripType === "international" ? "text-white" : "text-gray-600"
                                    }`}>
                                        international
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View className="items-center mt-12">
                    <Button onPress={() => navigation.navigate("StepSix")} title="Next" variant="primary" size="md" />
                </View>
            </SafeAreaView>
            
        </View>
    );
}
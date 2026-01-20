import { StatusBar, Text, View, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function StepFour() {
    const navigation = useNavigation();
    const [currency, setCurrency] = useState("THB");
    const [amount, setAmount] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const currencies = ["THB", "USD", "EUR", "GBP", "JPY", "AUD"];

    const handleSelectCurrency = (curr: string) => {
        setCurrency(curr);
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
                            <StepIndicatorComponent labels="3" />

                            <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                                How much do you plan to spend?
                            </Text>

                            {/* Currency Dropdown */}
                            <View className="gap-2">
                                <Text className="text-gray-600 text-sm">Currency</Text>
                                <TouchableOpacity
                                    onPress={() => setDropdownVisible(!dropdownVisible)}
                                    className="border border-primary rounded-xl bg-primary h-16 justify-center px-4 flex-row items-center"
                                >
                                    <Text className="text-white font-semibold text-lg flex-1">{currency}</Text>
                                    <Ionicons 
                                        name={dropdownVisible ? "chevron-up" : "chevron-down"} 
                                        size={24} 
                                        color="white" 
                                    />
                                </TouchableOpacity>

                                {/* Dropdown Menu */}
                                {dropdownVisible && (
                                    <View className="border border-gray-300 rounded-xl bg-white mt-1 shadow-lg">
                                        {currencies.map((curr) => (
                                            <TouchableOpacity
                                                key={curr}
                                                onPress={() => handleSelectCurrency(curr)}
                                                className={`py-4 px-4 border-b border-gray-200 ${
                                                    curr === currency ? "bg-blue-50" : ""
                                                }`}
                                            >
                                                <Text className={`text-base ${
                                                    curr === currency ? "text-primary font-semibold" : "text-gray-700"
                                                }`}>
                                                    {curr}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* Amount Input */}
                            <Input
                                placeholder="5,000 (numbers only)"
                                size="lg"
                                variant="primary"
                                value={amount}
                                onChangeText={setAmount}
                                inputMode ="numeric"            
                            />
                            <View className="items-center mt-12">
                                <Button onPress={() => navigation.navigate("StepFive")} title="Next" variant="primary" size="md" />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}
import { StatusBar, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function StepSix() {
      const navigation = useNavigation();
      const [specialRequirements, setSpecialRequirements] = useState("");   
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
        >
            <ScrollView>
                <Head />

                {/* Contents */}
                <SafeAreaView>
                    <View className="flex gap-10 px-4 pb-10">
                        <StepIndicatorComponent labels="" />

                        <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                            What would you like to do on this trip?
                        </Text>

                        <Text className="text-center text-primary px-5 text-lg font-semibold ">
                            Share your interests, travel styles and must-see places
                        </Text>

                        <TextInput 
                            multiline={true} 
                            numberOfLines={6} 
                            className="border border-gray-300 rounded-lg p-4 min-h-[150px] text-base"
                            textAlignVertical="top"
                            placeholder="Describe your interests and more ..."
                            placeholderTextColor="#999"
                            value={specialRequirements}
                            onChangeText={setSpecialRequirements}
                        />

                        <View className="items-center mt-12">
                            <Button onPress={() => navigation.navigate("StepConfirm", { specialRequirements })} title="Next" variant="primary" size="md" />
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


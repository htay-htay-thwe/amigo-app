import { StatusBar, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function StepConfirm() {

    const tripSummary = [
        {
            label: "Destination",
            value: "China",
        },
        {
            label: "From",
            value: "19 Sep",
        },
        {
            label: "To",
            value: "25 Sep",
        },
        {
            label: "Travel Type",
            value: "Solo",
        },
        {
            label: "People",
            value: "1",
        },
        {
            label: "Budget",
            value: "20000 THB",
        },
        {
            label: "Nationality",
            value: "Thai",
        },
        {
            label: "Travel Plan",
            value: "International",
        },
    ];
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="flex-1">
                    <Head />

                    {/* Contents */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled">
                        <SafeAreaView style={{ flex: 1 }}>
                            <View className="flex px-4 pb-10">

                                <Text className="px-5 mb-4 text-2xl font-semibold text-center text-primary ">
                                    Your Itinerary
                                </Text>
                                <View className="p-4 mb-5 border rounded-lg  border-primary bg-[#E5E7EB]" >
                                    {tripSummary.map((item, index) => (
                                        <View key={item.label} className="flex-row items-center justify-between mb-2 ">
                                            <Text className="px-1 text-lg font-semibold ">
                                                {item.label} :
                                            </Text>
                                            <Text className="text-lg ">
                                                {item.value}
                                            </Text>
                                        </View>
                                    ))}
                                </View>


                                <View className="gap-2">
                                    <Text className="px-1 mb-3 text-2xl font-semibold text-left text-primary ">
                                        Special Requirements:
                                    </Text>
                                    <View className="p-3 mb-5 border border-primary rounded-lg bg-[#E5E7EB]">
                                        <Text className="text-base text-left text-gray-800">
                                            I enjoy Asian cultural experiences, traditional local food, and scenic nature. I prefer a relaxed travel style, moderate budget...
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row justify-between gap-4 mt-5 mr-4">
                                    <Button title="Cancel" variant="primary" size="md" />
                                    <Button onPress={() => navigation.navigate("TripPlan")} title="Confirm" variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}
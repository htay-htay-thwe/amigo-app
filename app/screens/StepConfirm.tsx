import { StatusBar, Text, View, ScrollView } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import DataConfirm from "../../components/ui/DataConfirm";

export default function StepConfirm() {
      const navigation = useNavigation();
      const route = useRoute();
      const { specialRequirements = "" } = (route.params as { specialRequirements?: string }) || {};   
    return (
        <View className="flex-1">
            <Head />

           {/* Contents */}
            <SafeAreaView className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex gap-10 px-4 pb-10">

                        <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                            Your Itinerary
                        </Text>

                        <DataConfirm />

                        <View className="gap-2">
                            <Text className="text-left text-primary px-1 text-2xl font-semibold ">
                                Special Requirements:
                            </Text>                        
                            <View className="border border-gray-300 rounded-lg p-8 bg-white">
                                <Text className="text-gray-800 text-base text-left">
                                    {specialRequirements || "No special requirements provided"}
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-12 gap-4 mr-4">
                            <Button title="Cancel" variant="primary" size="md" />
                            <Button title="Next" variant="primary" size="md" />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}
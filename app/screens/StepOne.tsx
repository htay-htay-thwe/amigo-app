import { StatusBar, Text, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";

export default function StepOne() {
      const navigation = useNavigation();   
    return (
        <View>
            <Head />

           {/* Contents */}
            <SafeAreaView>
                <View className="flex gap-10 px-4 ">
                    <StepIndicatorComponent labels="0" />

                    <Text className="text-center text-primary px-5 text-2xl font-semibold ">
                        Where do you want to go for your holiday?
                    </Text>

                    <Input placeholder="i.e, Sydney, London etc." size="lg" variant="primary" icon="location-outline" iconColor="#0D47A1" iconSize={26} />

                    <View className="items-center mt-12">
                        <Button onPress={() => navigation.navigate("StepTwo")} title="Next" variant="primary" size="md" />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}
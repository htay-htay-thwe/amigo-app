import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/ui/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
    Home: undefined;
    GetStarted: undefined;
    Login: undefined;
    CreateAccount: undefined;
    StepOne: undefined;
    StepTwo: undefined;
    StepThree: undefined;
    StepFour: undefined;
    StepFive: undefined;
    StepSix: undefined;
    StepConfirm: undefined;
};

export default function GetStarted() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <ImageBackground
            source={require("../../assets/images/welcome.jpg")}
            className="flex-1"
            resizeMode="cover"
        >
            <SafeAreaView className="flex-1 justify-end pb-10 px-6">
                {/* Main Content */}
                <View className="items-center gap-8">
                    {/* Title */}
                    <Text className="text-4xl font-bold text-center text-gray-900 leading-tight">
                        <Text style={{ color: '#002765' }}>Amigo</Text>, all you need for your trip
                    </Text>

                    {/* Subtitle */}
                    <Text className="text-base text-center text-gray-800 px-4">
                        The best AI assistance, designed to create your itinerary in just one step!
                    </Text>

                    {/* Get Started Button */}
                    <View className="w-full">
                        <Button
                            onPress={() => navigation.navigate("CreateAccount")}
                            title="Get Started !"
                            variant="primary"
                            size="lg"
                        />
                    </View>

                    {/* Login Link */}
                    <View className="flex-row items-center gap-1">
                        <Text className="text-base text-gray-900">
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className="text-base font-semibold text-gray-900 underline">
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
import { StatusBar, Text, View, TouchableOpacity } from "react-native";
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
        <View>
            <Head />
            {/* Contents */}
            <SafeAreaView>
                <View className="flex gap-5 px-4 mt-5">
                    <StepIndicatorComponent labels="2" />

                    <Text className="text-center text-primary px-5 text-2xl font-semibold ">
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
                    <View className="flex-row items-center justify-center gap-8 mt-8">
                        <TouchableOpacity
                            onPress={increment}
                            className="bg-primary rounded-full w-12 h-12 items-center justify-center"
                        >
                            <Text className="text-white text-2xl font-bold">+</Text>
                        </TouchableOpacity>

                        <Text className="text-3xl font-bold text-gray-800">{count}</Text>

                        <TouchableOpacity
                            onPress={decrement}
                            className="bg-primary rounded-full w-12 h-12 items-center justify-center"
                        >
                            <Text className="text-white text-2xl font-bold">−</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="items-center mt-12">
                        <Button onPress={() => navigation.navigate("StepFour")} title="Next" variant="primary" size="md" />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}



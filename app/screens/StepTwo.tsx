import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import TripToggle from "../DataForm/TripToggle";
import { useNavigation } from "@react-navigation/native";
import Toggle from "../../components/ui/Toggle";
import { useState } from "react";
import { useTripStore } from "../../components/store/trip.store";


export default function StepTwo() {
    const navigation = useNavigation();
    const [fromTo, setFromTo] = useState<"from" | "to">("from");

    const setDates = useTripStore((s) => s.setDates);
    const storeFrom = useTripStore((s) => s.from);
    const storeTo = useTripStore((s) => s.to);

    const [from, setFrom] = useState(storeFrom);
    const [to, setTo] = useState(storeTo);
    const [error, setError] = useState("");
    console.log(from, to);

    const buildMarkedDates = (from?: string, to?: string) => {
        if (!from) return {};

        if (from && !to) {
            return {
                [from]: {
                    startingDay: true,
                    endingDay: true,
                    color: "#0D47A1",
                    textColor: "white",
                },
            };
        }

        const marked: any = {};
        let current = new Date(from);

        while (current <= new Date(to)) {
            const date = current.toISOString().split("T")[0];

            marked[date] = {
                color: "#0D47A1",
                textColor: "white",
                startingDay: date === from,
                endingDay: date === to,
            };

            current.setDate(current.getDate() + 1);
        }

        return marked;
    };

    const onSelectDate = (date: string) => {
        if (fromTo === "from") {
            setFrom(date);
            setTo(""); // reset to
        } else {
            if (from && new Date(date) > new Date(from)) {
                setTo(date);
            }
        }
    };

    const onNext = () => {
        if (!from || !to) {
            setError("* required");
            return;
        }
        setDates(from, to);
        navigation.navigate("StepThree");
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
                            <View className="flex gap-5 px-4 mt-5">
                                <StepIndicatorComponent currentStep={2} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    When do you plan to go?
                                </Text>

                                <View>
                                    <Toggle
                                        error={error}
                                        type="fromTo"
                                        value={fromTo}
                                        onChange={setFromTo}
                                    />
                                    {error !== "" && (
                                        <Text className="text-red-500 mt-2 px-4">{error}</Text>
                                    )}
                                </View>

                                <DatePicker
                                    markedDates={buildMarkedDates(from, to)}
                                    onSelectDate={onSelectDate} />

                                <View className="items-center ">
                                    <Button title="Next" onPress={onNext} variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
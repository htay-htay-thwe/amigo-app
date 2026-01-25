import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

import Head from "../DataForm/Head";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { currencies } from "../../components/constants/currency";
import { useTripStore } from "../../components/store/trip.store";

export default function StepFour() {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState("THB");
  const [amount, setAmount] = useState("");

  const setCurrencyStore = useTripStore((s) => s.setCurrency);
  const setAmountStore = useTripStore((s) => s.setAmount);

  const [error, setError] = useState("");

  const onNext = () => {
    if (currency.trim() === "" || amount.trim() === "") {
      setError("* required");
      return;
    }
    setCurrencyStore(currency);
    setAmountStore(amount);
    navigation.navigate("StepFive");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Head />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled">
            <SafeAreaView style={{ flex: 1 }}>
              <View className="flex gap-10 px-4">
                <StepIndicatorComponent currentStep={4} />

                <Text className="px-4 text-2xl font-semibold text-center text-primary">
                  How much do you plan to spend?
                </Text>

                {/* Currency Dropdown */}
                <View className="gap-2">
                  <Text className="text-xl text-primary">Currency</Text>

                  <View className="w-2/4">
                    <Dropdown
                      data={currencies.map((c) => ({
                        label: c,
                        value: c,
                      }))}
                      labelField="label"
                      valueField="value"
                      value={currency}
                      onChange={(item) => setCurrency(item.value)}
                      placeholder="Select currency"
                      style={{
                        backgroundColor: "#0D47A1",
                        height: 56,
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        borderColor: "#0D47A1",
                        borderWidth: 1,
                      }}
                      selectedTextStyle={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                      placeholderStyle={{
                        color: "white",
                        opacity: 0.8,
                      }}
                      iconColor="white"
                    />
                  </View>
                </View>

                <View>
                  {/* Amount Input */}
                  <Input
                    placeholder="5,000 (numbers only)"
                    size="lg"
                    variant="primary"
                    error={error}
                    value={amount}
                    onChangeText={setAmount}
                  />
                  {error !== "" && (
                    <Text className="text-red-500 mt-2">{error}</Text>
                  )}
                </View>

                <View className="items-center mt-12">
                  <Button
                    title="Next"
                    size="md"
                    variant="primary"
                    onPress={onNext}
                  />
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

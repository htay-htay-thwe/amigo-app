import { View, Text } from "react-native";
import type { VisaRequirements } from "../constants/types";

type Props = {
  visa: VisaRequirements;
};

export default function VisaCard({ visa }: Props) {
  return (
    <View className="p-4 mt-2 bg-blue-100 shadow-sm rounded-2xl">
      <Text className="mb-2 text-lg font-semibold">Visa Requirements</Text>

      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-500">Visa Type</Text>
        <Text className="font-semibold">{visa.visa_type}</Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-gray-500">Visa Free</Text>
        <Text className={`font-semibold ${visa.visa_free ? "text-green-600" : "text-red-600"}`}>
          {visa.visa_free ? "Yes" : "No"}
        </Text>
      </View>

      <Text className="text-sm text-blue-700">{visa.details}</Text>
    </View>
  );
}

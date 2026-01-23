import { View, Text } from "react-native";
import type { Accommodation } from "../constants/types";


type Props = {
  accommodation: Accommodation;
};

export default function AccommodationCard({ accommodation }: Props) {
  return (
    <View className="p-4 bg-white shadow-sm rounded-2xl">
      <Text className="mb-2 text-lg font-semibold">Accommodation</Text>

      <Text className="text-base font-semibold text-primary">
        {accommodation.hotel_name}
      </Text>

      <Text className="mb-2 text-sm text-gray-600">
        {accommodation.address}
      </Text>

      <View className="flex-row justify-between mb-2">
        <Text>⭐ {accommodation.star_rating}-star</Text>
        <Text className="font-semibold text-primary">
          {accommodation.total_cost_thb} THB
        </Text>
      </View>

      <Text className="mb-2 text-sm text-gray-500">
        {accommodation.check_in} → {accommodation.check_out}
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {accommodation.amenities.map((item, index) => (
          <View
            key={index}
            className="px-3 py-1 bg-blue-100 rounded-full"
          >
            <Text className="text-xs text-gray-600">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

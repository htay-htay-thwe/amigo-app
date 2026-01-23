import { View, Text } from "react-native";
import type { Flight } from "../constants/types";


type Props = {
  flight: Flight;
};

export default function FlightCard({ flight }: Props) {
  return (
    <View className="p-4 mb-3 bg-white shadow-sm rounded-2xl">
      <Text className="mb-2 text-sm font-semibold text-primary">
        {flight.type}
      </Text>

      <Text className="text-lg font-semibold">
        {flight.from} → {flight.to}
      </Text>

      <Text className="mt-1 text-gray-600">
        {flight.airline} • {flight.flight_number}
      </Text>

      <View className="flex-row justify-between mt-3">
        <View>
          <Text className="text-xs text-gray-500">Departure</Text>
          <Text className="font-semibold">{flight.departure_time}</Text>
        </View>

        <View>
          <Text className="text-xs text-gray-500">Arrival</Text>
          <Text className="font-semibold">{flight.arrival_time}</Text>
        </View>

        <View>
          <Text className="text-xs text-gray-500">Price</Text>
          <Text className="font-semibold text-primary">
            {flight.estimated_cost_thb} THB
          </Text>
        </View>
      </View>
    </View>
  );
}

import { View, Text } from "react-native";
import FlightCard from "./FlightCard";
import type { Flight } from "../constants/types";

type Props = {
  flights: Flight[];
};

export default function FlightsSection({ flights }: Props) {
  return (
    <View>
      <Text className="mb-3 text-lg font-semibold">Flights</Text>
      {flights.map((flight) => (
        <FlightCard key={flight.flight_number} flight={flight} />
      ))}
    </View>
  );
}

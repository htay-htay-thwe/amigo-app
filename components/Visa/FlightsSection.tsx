import { View, Text } from "react-native";
import FlightCard from "./FlightCard";


type Props = {
  flights: string[][];
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  setEditPayload?: (payload: { title: string; data: any;type: "flight" | "accommodation" | "itinerary" } | null) => void;
};

export default function FlightsSection({editable, flights, setOpen, setEditPayload, checkable }: Props) {
console.log(flights);
  return (
    <View>
      <Text className="mb-3 text-lg font-semibold">Flights</Text>
{flights.map((flight, index) => (
  <FlightCard
    key={index}
    checkable={checkable}
    setOpen={setOpen}
    setEditPayload={setEditPayload}
    editable={editable}
    label={index === 0 ? "Departure" : "Return"}
    condition="details"
    flight={flight}
  />
))}

    </View>
  );
}

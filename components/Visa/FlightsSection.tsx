import { View, Text } from "react-native";
import FlightCard from "./FlightCard";


type Props = {
  flights: any;
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  checkState?: { departure: boolean; return: boolean };
  onFlightCheck?: (index: number, checked: boolean) => void;
  setEditPayload?: (payload: { title: string; data: any;type: "flight" | "accommodation" | "itinerary" } | null) => void;
};

export default function FlightsSection({editable, flights, setOpen, setEditPayload, checkable, checkState, onFlightCheck }: Props) {
  return (
    <View>
      <Text className="mb-3 text-lg font-semibold">Flights</Text>
{flights.map((flight: any, index: number) => (
  <FlightCard
    key={index}
    checkable={checkable}
    isChecked={index === 0 ? checkState?.departure : checkState?.return}
    onCheck={(checked) => onFlightCheck?.(index, checked)}
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

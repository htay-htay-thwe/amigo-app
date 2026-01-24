import { View, Text } from "react-native";
import FlightCard from "./FlightCard";
import type { FlightGroup } from "../constants/types";

type Props = {
  flights: FlightGroup[];
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  setEditPayload?: (payload: { title: string; data: any;type: "flight" | "accommodation" | "itinerary" } | null) => void;
};

export default function FlightsSection({editable, flights, setOpen, setEditPayload, checkable }: Props) {
  const flightGroup = flights[0]; // one trip → one outbound + return

  return (
    <View>
      <Text className="mb-3 text-lg font-semibold">Flights</Text>

      <FlightCard
        checkable={checkable}
        setOpen={setOpen}
        setEditPayload={setEditPayload}
        editable={editable}
        condition="details"
        label="Departure"
        flight={flightGroup.outbound_flight}
      />

      <FlightCard
        checkable={checkable}
        setOpen={setOpen}
        setEditPayload={setEditPayload}
        editable={editable}
        condition="details"
        label="Return"
        flight={flightGroup.return_flight}
      />
    </View>
  );
}

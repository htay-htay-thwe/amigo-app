import { View } from "react-native";
import TripCard from "../../components/Save/TripCard";
import { useTripStore } from "../../components/store/trip.store";
import { useNavigation } from "@react-navigation/native";

export default function Save() {
    const navigation = useNavigation<any>();

    const saveTrips = useTripStore((s) => s.saveTrip);

    const readTripDetails = (id: string) => {
        navigation.navigate("Steps", {
            screen: "TripDetails",
            params: { tripId: id },
        });
    }

    return (
        <View className="flex-1 p-4 bg-gray-100">
            {saveTrips.map((trip, index) => (
                <TripCard key={index} userInput={trip.trip_plan} onPress={() => readTripDetails(trip.id)} />
            ))}
        </View>
    )
}

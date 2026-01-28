import { ScrollView, View } from "react-native";
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
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            keyboardShouldPersistTaps="handled">
            <View className="flex-1 p-4 bg-gray-100">

                {saveTrips
                    .filter(trip => trip?.id && trip?.trip_plan)
                    .map((trip, index) => (
                        <TripCard
                            key={trip.id || index}
                            id={trip.id}
                            userInput={trip.trip_plan}
                            onPress={() => readTripDetails(trip.id)}
                        />
                    ))
                }
            </View>
        </ScrollView>
    )
}

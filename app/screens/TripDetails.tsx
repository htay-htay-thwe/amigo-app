import { ScrollView, View } from "react-native";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import { data, itineraryData } from "../../components/constants/data";
import { useRoute } from '@react-navigation/native';
import { useTripStore } from "../../components/store/trip.store";

export default function TripDetails() {
    const route = useRoute<any>();
    const { tripId } = route.params;
    console.log('tripId', tripId);

    const savedTrips = useTripStore((s) => s.saveTrip);

    const trip = savedTrips.find((t) => t.id === tripId);
    if (!trip) return null;
    return (
        <View className="flex-1">
            <ItineraryTimeline
                itinerary={trip.trip_plan.itinerary}
                header={
                    <View className="px-4 pt-2">
                        <VisaCard visa={trip.trip_plan.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection flights={trip.trip_plan.flights} />

                        <View className="h-4" />

                        <AccommodationCard accommodation={trip.trip_plan.accommodation} />
                        <View className="h-6" />
                    </View>
                }
            />
        </View>

    )
}
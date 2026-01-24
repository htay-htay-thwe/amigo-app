import { ScrollView, View } from "react-native";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import { data, itineraryData } from "../../components/constants/data";

export default function TripDetails() {
    return (
        <View className="flex-1">
            <ItineraryTimeline
                itinerary={itineraryData.itinerary}
                header={
                    <View className="px-4 pt-2">
                        <VisaCard visa={data.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection flights={data.flights} />

                        <View className="h-4" />

                        <AccommodationCard accommodation={data.accommodation} />

                        <View className="h-6" />
                    </View>
                }
            />
        </View>

    )
}
import { ScrollView, TouchableOpacity, View } from "react-native";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import EditModal from "../../components/Modal/EditModal";
import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { useTripStore } from "../../components/store/trip.store";

type EditPayload = {
    type: "flight" | "accommodation" | "itinerary";
    title: string;
    data: any;
};

export default function TripEdit() {
    const [open, setOpen] = useState(false);
    const [editPayload, setEditPayload] = useState<EditPayload | null>(null);
    const route = useRoute<any>();
    const { tripId } = route.params;

    const savedTrips = useTripStore((s) => s.saveTrip);

    const trip = savedTrips.find((t) => t?.id === tripId);
    
    if (!trip || !trip.trip_plan) return null;
    
    return (
        <View className="flex-1">
            <ItineraryTimeline
                setEditPayload={setEditPayload}
                setOpen={setOpen}
                editable
                itinerary={trip.trip_plan.itinerary}
                header={
                    <View className="px-4 pt-2">
                        <VisaCard visa={trip.trip_plan.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection editable setEditPayload={setEditPayload} flights={trip.trip_plan.flights} setOpen={setOpen} />
                        <View className="h-4" />

                        <AccommodationCard setEditPayload={setEditPayload} editable accommodation={trip.trip_plan.accommodation} setOpen={setOpen} />
                        <View className="h-6" />
                    </View>
                }
            />
            {open && <EditModal tripData={trip} flights={trip.trip_plan.flights} setOpen={setOpen} open={open} editPayload={editPayload} />}
        </View>

    )
}
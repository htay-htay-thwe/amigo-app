import { ScrollView, TouchableOpacity, View } from "react-native";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import { data, itineraryData } from "../../components/constants/data";
import EditModal from "../../components/Modal/EditModal";
import { useState } from "react";
import { Text } from "react-native";

type EditPayload = {
    type:  "flight" | "accommodation" | "itinerary";
    title: string;
    data: any;
};

export default function TripEdit() {
    const [open, setOpen] = useState(false);
    const [editPayload, setEditPayload] = useState<EditPayload | null>(null);

    const toggle = () => {
        setOpen(prev => !prev);
    }

    return (
        <View className="flex-1">
            <ItineraryTimeline
                setEditPayload={setEditPayload}
                setOpen={setOpen}
                editable
                itinerary={itineraryData.itinerary}
                header={
                    <View className="px-4 pt-2">
                        <VisaCard visa={data.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection editable setEditPayload={setEditPayload} flights={data.flights} setOpen={setOpen} />

                        <View className="h-4" />

                        <AccommodationCard setEditPayload={setEditPayload} editable accommodation={data.accommodation} setOpen={setOpen} />
                        <View className="h-6" />
                    </View>
                }
            />
            {open && <EditModal flights={data.flights} setOpen={setOpen} open={open} editPayload={editPayload} />}
        </View>

    )
}
import { SafeAreaView } from "react-native-safe-area-context";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import { useRef, useState } from "react";
import type { TripSummaryItem } from "../../components/constants/types";
import { Pressable, Text, View, Animated, ScrollView } from "react-native";
import TripSummaryEdit from "../../components/TripPlanScreen/TripSummaryEdit";
import TripSummaryView from "../../components/TripPlanScreen/TripSummaryView";
import CollapsibleTripHeader from "../../components/TripPlanScreen/CollapsibleTripHeader";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import Button from "../../components/ui/Button";
import { useNavigation } from "expo-router";


const itineraryData = {
    "itinerary": [
        {
            "day": 1,
            "theme": "Old Quarter Charm & Street Food",
            "youtube_query": "Hanoi Old Quarter street food tour vlog",
            "activities": [
                {
                    "time": "15:30",
                    "activity_name": "Explore Hanoi Old Quarter & Hoan Kiem Lake",
                    "description": "Walk through the 36 ancient streets and visit Ngoc Son Temple on the lake.",
                    "cost_thb": 150,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1555944630-da23b7489fd4",
                        "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a"
                    ]
                },
                {
                    "time": "18:30",
                    "activity_name": "Street Food Walking Tour",
                    "description": "Sample Bun Cha, Pho, and Egg Coffee at local hidden gems.",
                    "cost_thb": 600,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a",
                        "https://images.unsplash.com/photo-1528605105345-5344ea20e269"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=Pm5PavWKIos"
        },
        {
            "day": 2,
            "theme": "Temples & Traditional Arts",
            "youtube_query": "Hanoi Temple of Literature and Water Puppet Show",
            "activities": [
                {
                    "time": "09:00",
                    "activity_name": "Temple of Literature & Tran Quoc Pagoda",
                    "description": "Visit Vietnam's first university and the oldest pagoda in Hanoi by the West Lake.",
                    "cost_thb": 200,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1599708153386-62e250789360",
                        "https://images.unsplash.com/photo-1583417319070-4a69db38a482"
                    ]
                },
                {
                    "time": "14:00",
                    "activity_name": "Vietnam Museum of Ethnology",
                    "description": "Learn about the 54 ethnic groups of Vietnam through cultural artifacts and traditional houses.",
                    "cost_thb": 100,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d"
                    ]
                },
                {
                    "time": "17:00",
                    "activity_name": "Thang Long Water Puppet Show",
                    "description": "Experience a unique northern Vietnamese art form dating back to the 11th century.",
                    "cost_thb": 300,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1578922746465-3a80a228f223"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=DwxylOqL2ZU"
        },
        {
            "day": 3,
            "theme": "Scenic Nature of Ninh Binh",
            "youtube_query": "Ninh Binh Trang An boat tour guide",
            "activities": [
                {
                    "time": "08:00",
                    "activity_name": "Trang An Landscape Complex Day Trip",
                    "description": "A UNESCO site featuring limestone karsts and boat trips through water caves.",
                    "cost_thb": 1800,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1528127269322-539801943592",
                        "https://images.unsplash.com/photo-1505993597083-3bd19fb75e57"
                    ]
                },
                {
                    "time": "12:30",
                    "activity_name": "Departure Transfer to Airport",
                    "description": "Private transfer from Ninh Binh/Hanoi to Noi Bai International Airport.",
                    "cost_thb": 600,
                    "activity_photos": [
                        "https://images.unsplash.com/photo-1542296332-2e4473faf563"
                    ]
                }
            ],
            "youtube_vlog_link": "https://www.youtube.com/watch?v=YMQXjge46aU"
        }
    ]
}

const data = {
    "visa_requirements": {
        "visa_free": true,
        "visa_type": "Tourist Visa Exemption",
        "details": "Myanmar citizens are granted visa-free entry to Thailand for up to 14 days when entering via international airports."
    },
    "flights": [
        {
            "type": "Departure",
            "flight_number": "FD252",
            "airline": "Thai AirAsia",
            "from": "RGN",
            "to": "DMK",
            "departure_time": "08:30",
            "arrival_time": "10:15",
            "estimated_cost_thb": 2400
        },
        {
            "type": "Return",
            "flight_number": "FD253",
            "airline": "Thai AirAsia",
            "from": "DMK",
            "to": "RGN",
            "departure_time": "19:00",
            "arrival_time": "20:45",
            "estimated_cost_thb": 2600
        }
    ],
    "accommodation": {
        "hotel_name": "Ibis Styles Bangkok Khaosan Viengtai",
        "address": "42 Rambuttri Road, Banglamphu, Bangkok 10200",
        "star_rating": 3,
        "total_cost_thb": 4200,
        "check_in": "Day 1",
        "check_out": "Day 3",
        "amenities": [
            "Free Wi-Fi",
            "Outdoor Pool",
            "Central Location",
            "Breakfast Included"
        ]
    }
};

export default function TripPlan() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [editMode, setEditMode] = useState(false);
    const navigation = useNavigation();

    const [tripSummary, setTripSummary] = useState<TripSummaryItem[]>([
        { key: "destination", label: "Destination", value: "China" },
        { key: "from", label: "From", value: "19 Sep" },
        { key: "to", label: "To", value: "25 Sep" },
        { key: "travelType", label: "Travel Type", value: "Solo" },
        { key: "people", label: "People", value: "1" },
        { key: "budget", label: "Budget", value: "20000 THB" },
        { key: "nationality", label: "Nationality", value: "Thai" },
        { key: "plan", label: "Travel Plan", value: "International" },
    ]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* <View className="flex-row items-center justify-between px-4 pt-4">
                <Text className="text-xl font-bold">Trip Plan</Text>
                
            </View> */}

            {/* Summary */}
            {editMode ? (
                <TripSummaryEdit
                    editMode={editMode}
                    setEditMode={setEditMode}
                    data={tripSummary}
                    onChange={setTripSummary}
                />
            ) : (
                <CollapsibleTripHeader scrollY={scrollY} setEditMode={setEditMode} editMode={editMode} />

            )}
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: 50 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}>
                <View className="px-4 mt-2">
                    <VisaCard visa={data.visa_requirements} />

                    <View className="h-4" />

                    <FlightsSection flights={data.flights} />

                    <View className="h-4" />

                    <AccommodationCard accommodation={data.accommodation} />
                </View>
                <ItineraryTimeline itinerary={itineraryData.itinerary} />

                <View className="flex-row justify-center gap-4 pl-8 pr-8 mb-5 ">
                    <Button title="Cancel" variant="primary" size="md" />
                    <Button onPress={() => navigation.navigate("MainTabs", {
                        screen: "Save",
                    })} title="Save" variant="primary" size="md" />
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

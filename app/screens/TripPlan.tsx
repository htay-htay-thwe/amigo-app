import { SafeAreaView } from "react-native-safe-area-context";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import { useEffect, useRef, useState } from "react";
import type { TripSummaryItem } from "../../components/constants/types";
import { Pressable, Text, View, Animated, ScrollView, ActivityIndicator } from "react-native";
import TripSummaryEdit from "../../components/TripPlanScreen/TripSummaryEdit";
import TripSummaryView from "../../components/TripPlanScreen/TripSummaryView";
import CollapsibleTripHeader from "../../components/TripPlanScreen/CollapsibleTripHeader";
import VisaCard from "../../components/Visa/VisaCard";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import Button from "../../components/ui/Button";
import { useNavigation } from "expo-router";
import { data, itineraryData } from "../../components/constants/data";
import { usePlanStore } from "../../components/store/plan.store";
import { useTripStore } from "../../components/store/trip.store";
import { fetchHotels } from "../../components/constants/flight/fetchHotel";

const messages = [
    "Our system is planning your trip ✈️",
    "Finding the best places for you 🗺️",
    "Optimizing your travel route 🚗",
    "Checking hidden gems 🌟",
    "Almost ready… just a moment ⏳",
];


export default function TripPlan() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [editMode, setEditMode] = useState(false);
    const [err, setErr] = useState("");
    const navigation = useNavigation();
    const { loading, error } = usePlanStore();
    const [loadingText, setLoadingText] = useState(messages[0]);
    const setSaveTrip = useTripStore((s) => s.setSaveTrip);
    const planData = usePlanStore((s) => s.planData);
    const trip = useTripStore.getState();

    const [tripSummary, setTripSummary] = useState<TripSummaryItem[]>([
        { key: "destination", label: "Destination", value: trip.destination },
        { key: "from", label: "From", value: trip.from },
        { key: "to", label: "To", value: trip.to },
        { key: "travelType", label: "Travel Type", value: trip.travelType },
        { key: "people", label: "People", value: trip.people },
        { key: "budget", label: "Budget", value: `${trip.amount} ${trip.currency}` },
        { key: "nationality", label: "Nationality", value: trip.nationality },
        { key: "plan", label: "Travel Plan", value: trip.travelType },
        { key: "userPrompt", label: "User Prompt", value: trip.userPrompts },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setLoadingText(messages[randomIndex]);
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <View className="items-center justify-center flex-1 bg-white">
                <ActivityIndicator size="large" color="#0D47A1" />
                <Text className="mt-4 text-base text-center text-gray-600">
                    {loadingText}
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="items-center justify-center flex-1 p-2">
                <Text className="text-center text-red-500">{error?.error.message || error?.response?.data || error.message}</Text>
            </View>
        );
    }

    if (!planData) return null;

    const onNext = () => {
        if (!planData) {
            setErr("Something went wrong, please try again.");
            return;
        }
        setSaveTrip({
            ...planData,
            id: Math.random().toString(36).slice(2, 10),
            userId: 1,
            createdAt: Date.now(),
        });

        navigation.navigate("MainTabs", {
            screen: "Save",
        });
    };

    const cancelTrip = () => {
        usePlanStore.getState().clearPlanData();
        navigation.navigate("MainTabs", {
            screen: "MyPlan",
        });

    };


    return (
        <SafeAreaView className="flex-1 bg-gray-50">

            {err !== "" && (
                <Text className="mt-2 text-red-500">{err}</Text>
            )}
            {/* Summary */}
            {editMode ? (
                <TripSummaryEdit
                    editMode={editMode}
                    setEditMode={setEditMode}
                    data={tripSummary}
                    onChange={setTripSummary}
                />
            ) : (
                <CollapsibleTripHeader tripSummary={tripSummary} scrollY={scrollY} setEditMode={setEditMode} editMode={editMode} />

            )}

            <ItineraryTimeline
                scrollY={scrollY}
                itinerary={planData.trip_plan.itinerary}
                header={
                    <View className="px-4 mt-20">
                        <VisaCard visa={planData.trip_plan.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection flights={planData.trip_plan.flights} />
                        <View className="h-4" />

                        <AccommodationCard accommodation={planData.trip_plan.accommodation} />

                        <View className="h-6" />
                    </View>
                }
            />
            <View className="flex-row justify-center gap-4 pt-2 pl-8 pr-8 mb-1 shadow-xl ">
                <Button onPress={cancelTrip} title="Cancel" variant="primary" size="md" />
                <Button onPress={onNext} title="Save" variant="primary" size="md" />
            </View>
        </SafeAreaView>
    );
}

import { Animated, View } from "react-native";
import CollapsibleTripHeader from "../../components/TripPlanScreen/CollapsibleTripHeader";
import { useRef, useState, useEffect } from "react";
import VisaCard from "../../components/Visa/VisaCard";
import { data, itineraryData } from "../../components/constants/data";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import TripSummaryView from "../../components/TripPlanScreen/TripSummaryView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTripStore } from "../../components/store/trip.store";
import { useRoute } from "@react-navigation/native";

export default function PlanCheck() {
    const route = useRoute<any>();
    const { tripId } = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);
    const myPlans = useTripStore((s) => s.myPlan);
    const updateTripCheckProgress = useTripStore((s) => s.updateTripCheckProgress);

    const plan = myPlans.find((p) => p.id === tripId);
console.log("PlanCheck plan:", plan);
    // Initialize check states from stored progress
    const [checkState, setCheckState] = useState({
        departureFlight: plan?.checkProgress?.departureFlight || false,
        returnFlight: plan?.checkProgress?.returnFlight || false,
        accommodation: plan?.checkProgress?.accommodation || false,
        activities: plan?.checkProgress?.activities || {}
    });

    // Update store whenever check state changes
    useEffect(() => {
        if (plan) {
            updateTripCheckProgress(tripId, checkState);
        }
    }, [checkState]);

    const handleDepartureFlightCheck = (checked: boolean) => {
        setCheckState(prev => ({ ...prev, departureFlight: checked }));
    };

    const handleReturnFlightCheck = (checked: boolean) => {
        setCheckState(prev => ({ ...prev, returnFlight: checked }));
    };

    const handleAccommodationCheck = (checked: boolean) => {
        setCheckState(prev => ({ ...prev, accommodation: checked }));
    };

    const handleActivityCheck = (dayIndex: number, activityIndex: number, checked: boolean) => {
        setCheckState(prev => ({
            ...prev,
            activities: {
                ...prev.activities,
                [dayIndex]: {
                    ...prev.activities[dayIndex],
                    [activityIndex]: checked
                }
            }
        }));
    };


    return (
        <View className="mb-24">

            <View className="px-4 pt-6 pb-6 bg-blue-200">
                <TripSummaryView
                    show={show}
                    setShow={setShow}
                    destination={plan?.trip_plan?.destination}
                    from={plan?.trip_plan?.from}
                    to={plan?.trip_plan?.to}
                    travelType={plan?.trip_plan?.travel_type}
                    people={plan?.trip_plan?.people}
                    budget={plan?.trip_plan?.budget_limit_thb}
                    nationality={plan?.trip_plan?.nationality}
                    travelPlan={plan?.trip_plan?.travelPlan}
                />
            </View>

            <ItineraryTimeline
                checkable
                itinerary={plan?.trip_plan?.itinerary || []}
                checkState={checkState}
                onActivityCheck={handleActivityCheck}
                header={
                    <View className="px-4 pt-2">
                        {plan?.trip_plan?.visa_requirements && <VisaCard visa={plan.trip_plan.visa_requirements} />}

                        <View className="h-4" />

                        {plan?.trip_plan?.flights && (
                            <FlightsSection 
                                checkable 
                                flights={plan.trip_plan.flights}
                                checkState={{
                                    departure: checkState.departureFlight,
                                    return: checkState.returnFlight
                                }}
                                onFlightCheck={(index, checked) => {
                                    if (index === 0) handleDepartureFlightCheck(checked);
                                    else handleReturnFlightCheck(checked);
                                }}
                            />
                        )}
                        <View className="h-4" />

                        {plan?.trip_plan?.accommodation && (
                            <AccommodationCard 
                                checkable 
                                accommodation={plan.trip_plan.accommodation}
                                isChecked={checkState.accommodation}
                                onCheck={handleAccommodationCheck}
                            />
                        )}
                        <View className="h-6" />
                    </View>
                }
            />
        </View>
    )

}

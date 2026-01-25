import { Animated, View } from "react-native";
import CollapsibleTripHeader from "../../components/TripPlanScreen/CollapsibleTripHeader";
import { useRef, useState } from "react";
import VisaCard from "../../components/Visa/VisaCard";
import { data, itineraryData } from "../../components/constants/data";
import FlightsSection from "../../components/Visa/FlightsSection";
import AccommodationCard from "../../components/Visa/Accommodation";
import ItineraryTimeline from "../../components/Timeline/ItineraryTimeline";
import TripSummaryView from "../../components/TripPlanScreen/TripSummaryView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlanCheck() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [show, setShow] = useState(false);

    return (
        <View className="mb-24">

            <View className="px-4 pt-6 pb-6 bg-blue-200">
                <TripSummaryView
                    show={show}
                    setShow={setShow}
                    destination="China"
                    from="19 Sep"
                    to="25 Sep"
                    travelType="Solo"
                    people="1"
                    budget="20000 THB"
                    nationality="Thai"
                    travelPlan="International"
                />
            </View>

            <ItineraryTimeline
                checkable
                itinerary={itineraryData.itinerary}
                header={
                    <View className="px-4 pt-2">
                        <VisaCard visa={data.visa_requirements} />

                        <View className="h-4" />

                        <FlightsSection checkable flights={data.flights} />

                        <View className="h-4" />

                        <AccommodationCard checkable accommodation={data.accommodation} />
                        <View className="h-6" />
                    </View>
                }
            />
        </View>
    )

}

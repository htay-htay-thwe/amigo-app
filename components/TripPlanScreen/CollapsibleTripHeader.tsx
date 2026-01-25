import { Animated, Text, View, TouchableOpacity } from "react-native";
import TripSummaryView from "./TripSummaryView";
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import React from "react";

type Props = {
    scrollY: Animated.Value;
    setEditMode?: (editMode: boolean) => void;
    editMode?: boolean;
    tripSummary?: { key: string; label: string; value: string }[];
};

export default function CollapsibleTripHeader({ scrollY, setEditMode, editMode, tripSummary }: Props) {
    const [show, setShow] = React.useState(false);
    const HEADER_MAX_HEIGHT = show ? 220 : 90;
    const HEADER_MIN_HEIGHT = show ? 75 : 75;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: "clamp",
    });

    const summaryOpacity = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const titleOpacity = scrollY.interpolate({
        inputRange: [80, 120],
        outputRange: [0, 1],
        extrapolate: "clamp",
    });

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: headerHeight,
                backgroundColor: "white",
                zIndex: 10,
                elevation: 6,
                paddingHorizontal: 16,
                paddingTop: 20,
            }}>
            {/* Full summary */}
            <Animated.View style={{ opacity: summaryOpacity, marginTop: 20 }}>
                <TripSummaryView
                    show={show}
                    setShow={setShow}
                    destination={tripSummary?.find(item => item.key === "destination")?.value || ""}
                    from={tripSummary?.find(item => item.key === "from")?.value || ""}
                    to={tripSummary?.find(item => item.key === "to")?.value || ""}
                    travelType={tripSummary?.find(item => item.key === "travelType")?.value || ""}
                    people={tripSummary?.find(item => item.key === "people")?.value || ""}
                    budget={tripSummary?.find(item => item.key === "budget")?.value || ""}
                    nationality={tripSummary?.find(item => item.key === "nationality")?.value || ""}
                    travelPlan={tripSummary?.find(item => item.key === "plan")?.value || ""}
                />
            </Animated.View>

            {/* Collapsed title */}
            <Animated.View
                pointerEvents={show ? "auto" : "none"}
                style={{
                    opacity: titleOpacity,
                    position: "absolute",
                    bottom: 1,
                }}>
                <View className="flex flex-row items-center justify-between w-full px-0 mb-2">
                    <View className="flex flex-row gap-3 px-7">
                        <Fontisto name="flag" size={24} color="#0D47A1" />
                        <Text className="text-xl font-semibold ">China</Text>
                    </View>


                    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                        <Feather name="edit-3" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Animated.View>
    );
}

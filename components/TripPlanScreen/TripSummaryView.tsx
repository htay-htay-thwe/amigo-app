import { View, Text, Pressable, LayoutAnimation, Platform, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import React from "react";
import { UIManager } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    destination?: string;
    from?: string;
    to?: string;
    travelType?: string;
    people?: string;
    budget?: string;
    nationality?: string;
    travelPlan?: string;
    show?: boolean;
    setShow?: (show: boolean) => void;
};

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function TripSummaryView({
    destination,
    from,
    to,
    travelType,
    people,
    budget,
    nationality,
    travelPlan,
    show,
    setShow
}: Props) {

    const height = useSharedValue(0);

    const style = useAnimatedStyle(() => ({
        height: height.value,
        opacity: height.value === 0 ? 0 : 1,
    }));

    const toggle = () => {
        height.value = height.value === 0 ? withTiming(200) : withTiming(0);
        setShow?.(!show);
    };

    return (
        <View className="px-2 ">
                {/* Destination */}
                <TouchableOpacity onPress={toggle} className="flex-row items-center justify-between w-full">
                    <View className="">
                        <Text className="text-sm text-gray-500">Destination</Text>
                        <Text className="text-base font-semibold">{destination || "-"}</Text>
                    </View>
                    <Entypo name="chevron-small-down" size={35} color="#0D47A1" className="mb-2" />
                </TouchableOpacity>

                {show &&
                    <View className="">
                        {/* From - To - Travel Type */}
                        <View className="flex-row justify-between mt-1">
                            <SummaryMini label="From" value={from} />
                            <SummaryMini label="To" value={to} />
                            <SummaryMini label="Travel Type" value={travelType} />
                        </View>

                        {/* People - Budget */}
                        <View className="flex-row justify-between mt-1">
                            <SummaryMini label="People" value={people} />
                            <SummaryMini label="Budget" value={budget} />
                        </View>

                        <View className="flex-row justify-between mt-1">
                            <SummaryMini label="Nationality" value={nationality} />
                            <SummaryMini label="Travel Plan" value={travelPlan} />
                        </View>
                    </View>
                }
        </View>
    );
}


function SummaryMini({ label, value }: { label: string; value?: string }) {
    return (
        <View className="flex-1">
            <Text className="text-sm text-gray-500">{label}</Text>
            <Text className="font-semibold">{value || "-"}</Text>
        </View>
    );
}

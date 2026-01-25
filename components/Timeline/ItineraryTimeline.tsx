import React from "react";
import { Animated } from "react-native";
import DaySection from "./DaySection";

const AnimatedFlatList = Animated.createAnimatedComponent(Animated.FlatList);

type Props = {
  itinerary: any[];
  header?: React.ReactNode;
  scrollY?: Animated.Value | null; 
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  setEditPayload?: (payload: { title: string; data: any } | null) => void;
};

export default function ItineraryTimeline({
  itinerary,
  header,
  scrollY,
  setOpen,
  editable,
  checkable,
  setEditPayload,
}: Props) {
  return (
    <AnimatedFlatList
      data={itinerary}
      keyExtractor={(item: { day: number }) => item.day.toString()}
      renderItem={({ item }) => (
        <DaySection
          day={item}
          setOpen={setOpen}
          editable={editable}
          checkable={checkable}
          setEditPayload={setEditPayload}
        />
      )}
      ListHeaderComponent={header}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 5,
        paddingBottom: 24,
      }}
      scrollEventThrottle={16}
      onScroll={
        scrollY
          ? Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )
          : undefined
      }
    />
  );
}

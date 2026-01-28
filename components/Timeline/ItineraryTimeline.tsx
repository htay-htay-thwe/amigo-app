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
  checkState?: any;
  onActivityCheck?: (dayIndex: number, activityIndex: number, checked: boolean) => void;
  setEditPayload?: (payload: { title: string; data: any; type: "flight" | "accommodation" | "itinerary"} | null) => void;
};

export default function ItineraryTimeline({
  itinerary,
  header,
  scrollY,
  setOpen,
  editable,
  checkable,
  checkState,
  onActivityCheck,
  setEditPayload,
}: Props) {
  return (
    <AnimatedFlatList
      data={itinerary}
      keyExtractor={(item: any) => item.day.toString()}
      renderItem={({ item, index }: any) => (
        <DaySection
          day={item}
          dayIndex={index}
          setOpen={setOpen as any}
          editable={editable}
          checkable={checkable}
          checkState={checkState}
          onActivityCheck={onActivityCheck}
          setEditPayload={setEditPayload}
        />
      )}
      ListHeaderComponent={header as any}
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

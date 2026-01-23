import { FlatList } from "react-native";
import DaySection from "./DaySection";

export default function ItineraryTimeline({ itinerary }: { itinerary: any[] }) {
  return (
    <FlatList
      data={itinerary}
      keyExtractor={(item) => item.day.toString()}
      renderItem={({ item }) => <DaySection day={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 5,
      }}
    />
  );
}

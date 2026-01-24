import { FlatList, View } from "react-native";
import DaySection from "./DaySection";

type Props = {
  itinerary: any[];
  header?: React.ReactNode;
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  setEditPayload?: (payload: { title: string; data: any } | null) => void;
};

export default function ItineraryTimeline({ itinerary, header, setOpen, editable, checkable, setEditPayload }: Props) {

  return (
    <FlatList
      data={itinerary}
      keyExtractor={(item) => item.day.toString()}
      renderItem={({ item }) => <DaySection setEditPayload={setEditPayload} day={item} setOpen={setOpen} editable={editable} checkable={checkable} />}
      ListHeaderComponent={header}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

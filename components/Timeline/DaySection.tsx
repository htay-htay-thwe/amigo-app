import { View, Text } from "react-native";
import ActivityCard from "./ActivityCard";

type Props = {
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  dayIndex?: number;
  checkState?: any;
  onActivityCheck?: (dayIndex: number, activityIndex: number, checked: boolean) => void;
  setEditPayload?: (payload: { title: string; data: any; type: "flight" | "accommodation" | "itinerary"} | null) => void;
};

export default function DaySection({ day, dayIndex, setOpen, editable, checkable, checkState, onActivityCheck, setEditPayload }: { day: any; dayIndex?: number; setOpen: (open: boolean) => void } & Props) {
  return (
    <View className="p-3 mb-1">
      {/* Day Header */}
      <View className="flex-row items-center mb-5">
        <View className="w-3 h-3 mr-3 rounded-full bg-primary" />
        <Text className="text-lg font-bold text-primary">
          Day {day.day}
        </Text>
        <Text className="ml-2 text-sm text-gray-500">
          {day.theme}
        </Text>
      </View>

      {/* Activities */}
      {day.activities.map((activity: any, index: number) => (
        <View key={index} className="flex-row mb-6">

          {/* Timeline */}
          <View className="items-center mr-4">
            <Text className="mb-1 text-xs text-gray-500">
              {activity.time}
            </Text>
            <View className="flex-1 w-px bg-gray-300" />
          </View>

          <ActivityCard
            setEditPayload={setEditPayload}
            day={day}
            dayIndex={dayIndex}
            activityIndex={index}
            checkable={checkable}
            editable={editable}
            setOpen={setOpen}
            activity={activity}
            isChecked={checkState?.activities?.[dayIndex || 0]?.[index]}
            onCheck={(checked) => onActivityCheck?.(dayIndex || 0, index, checked)}
            youtubeLink={activity.youtube_vlog_link}
          />
        </View>
      ))}
    </View>
  );
}

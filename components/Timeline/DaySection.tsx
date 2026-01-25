import { View, Text } from "react-native";
import ActivityCard from "./ActivityCard";

type Props = {
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  setEditablePayload?: (payload: { title: string; data: any } | null) => void;
};

export default function DaySection({ day, setOpen, editable, checkable, setEditablePayload }: { day: any; setOpen: (open: boolean) => void } & Props) {
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
            setEditPayload={setEditablePayload}
            day={day}
            checkable={checkable}
            editable={editable}
            setOpen={setOpen}
            activity={activity}
            youtubeLink={day.youtube_vlog_link}
          />
        </View>
      ))}
    </View>
  );
}

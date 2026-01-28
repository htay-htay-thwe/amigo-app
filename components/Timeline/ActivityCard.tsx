import { View, Text, Pressable, Linking, TouchableOpacity } from "react-native";
import ImageCarousel from "./ImageCarousel";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import clsx from "clsx";

type Props = {
  activity: any;
  youtubeLink?: string;
  setOpen?: (open: boolean) => void;
  editable?: boolean;
  checkable?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
  day?: any;
  dayIndex?: number;
  activityIndex?: number;
  setEditPayload?: (payload: { title: string; data: any; type: "flight" | "accommodation" | "itinerary" } | null) => void;
};


export default function ActivityCard({ day, dayIndex, activityIndex, activity, youtubeLink, setOpen, checkable, isChecked, onCheck, editable, setEditPayload }: Props) {
  const modalContent = (day: number, time: string) => {
console.log("setEditPayload exists?", typeof setEditPayload);
  if (typeof setEditPayload !== "function") {
    throw new Error("❌ setEditPayload is NOT a function");
  }

    setOpen && setOpen(true);
    setEditPayload && setEditPayload({
      type: "itinerary",
      title: "Edit Day " + day + " - " + time,
      data: "",
    })
  }
  return (
    <View className={clsx(
      "flex-1 p-4 bg-white border border-gray-200 shadow-sm rounded-2xl",
      isChecked === true && "bg-blue-50 border border-blue-300 opacity-50"
    )}>

      {/* Image Carousel */}
      <ImageCarousel images={activity.activity_photos} />

      {/* Title */}
      <Text className="text-base font-semibold text-primary">
        {activity.activity_name}
      </Text>

      {/* Description */}
      <Text className="mt-1 text-sm text-gray-600">
        {activity.description}
      </Text>

      {/* Footer */}
      <View className="flex-row items-center justify-between mt-3">
        <Text className="text-sm font-semibold text-primary">
          ฿ {activity.cost_thb}
        </Text>

        <View className="flex-row items-center gap-3">
          {editable &&
            <TouchableOpacity onPress={() => modalContent(day.day, activity.time)}>
              <MaterialIcons name="edit" size={26} color="blue" />
            </TouchableOpacity>
          }

          {youtubeLink && (
            <Pressable
              onPress={() => Linking.openURL(youtubeLink)}
              className="px-3 py-1.5 bg-red-600 rounded-full">
              <Text className="text-xs font-semibold text-white">
                ▶ Watch Vlog
              </Text>
            </Pressable>
          )}

          {checkable &&
            <View className="flex justify-end">
              <BouncyCheckbox
                size={22}
                isChecked={isChecked || false}
                fillColor="#2563eb"
                unFillColor="#fff"
                iconStyle={{ borderColor: "#2563eb" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={(checked) => onCheck?.(checked)}
              />
            </View>
          }
        </View>
      </View>
    </View>
  );
}

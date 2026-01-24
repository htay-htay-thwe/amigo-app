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
  day?: any;
  setEditPayload?: (payload: { title: string; data: any; type: "flight" | "accommodation" | "itinerary" } | null) => void;
};


export default function ActivityCard({ day, activity, youtubeLink, setOpen, checkable, editable, setEditPayload }: Props) {
  const [checked, setChecked] = useState(false);
  const modalContent = (day: number, time: string) => {
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
      checked === true && "bg-blue-50 border border-blue-300 opacity-50"
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
                isChecked={checked}
                fillColor="#2563eb"
                unFillColor="#fff"
                iconStyle={{ borderColor: "#2563eb" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={setChecked}
              />
            </View>
          }
        </View>
      </View>
    </View>
  );
}

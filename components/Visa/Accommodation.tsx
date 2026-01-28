import { View, Text } from "react-native";
import type { Accommodation } from "../constants/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ImageCarousel from "../Timeline/ImageCarousel";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import clsx from "clsx";
import { useState } from "react";


type Props = {
  accommodation: Accommodation;
  editable?: boolean;
  checkable?: boolean;
  isChecked?: boolean;
  onCheck?: (checked: boolean) => void;
  setOpen?: (open: boolean) => void;
  setEditPayload?: (payload: { title: string; data: any; type: "flight" | "accommodation" | "itinerary" } | null) => void;
};

export default function AccommodationCard({ accommodation, editable, checkable, isChecked, onCheck, setOpen, setEditPayload }: Props) {

  const modalContent = (accommodation: string) => {
    setOpen && setOpen(true);
    setEditPayload && setEditPayload({
      type: "accommodation",
      title: "Edit " + accommodation,
      data: "",
    })
  }

  return (
    <View className={clsx("p-4 bg-white shadow-sm rounded-2xl",
      isChecked === true && "bg-blue-50 border border-blue-300 opacity-50"
    )}>
      <View className="flex-row items-center gap-2 mb-1">
        <View>
          <FontAwesome name="hotel" size={20} color="blue" />
        </View>

        <View className="flex-row items-center justify-between flex-1 ">
          <Text className="text-lg font-semibold">Accommodation</Text>

          {editable &&
            <TouchableOpacity onPress={() => modalContent('accommodation')}>
              <MaterialIcons name="edit" size={26} color="blue" />
            </TouchableOpacity>
          }
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

      <Text className="text-base font-semibold text-primary">
        {accommodation.hotel_name}
      </Text>

      <Text className="mb-2 text-sm text-gray-600">
        {accommodation.address}
      </Text>

      <ImageCarousel images={accommodation.hotel_photos} />

      <View className="flex-row justify-between mb-2">
        <Text>⭐ {accommodation.star_rating}-star</Text>
        <Text className="font-semibold text-primary">
          {accommodation.total_cost_thb} THB
        </Text>
      </View>

      <Text className="mb-2 text-sm text-gray-500">
        {accommodation.check_in} → {accommodation.check_out}
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {accommodation.amenities.map((item, index) => (
          <View
            key={index}
            className="px-3 py-1 bg-blue-100 rounded-full"
          >
            <Text className="text-xs text-gray-600">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

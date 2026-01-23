import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import type { UserInput } from "../constants/types";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";

type Props = {
  userInput: UserInput;
};

export default function TripCard({
  userInput
}: Props) {
    
   const [showEditTip, setShowEditTip] = useState(false);
  const [showDeleteTip, setShowDeleteTip] = useState(false);

  return (
    <View className="flex-row gap-2 mb-4 overflow-hidden bg-white shadow-sm rounded-2xl">

      <Image
        source={{ uri: userInput.image }}
        className="w-1/3 h-full"
        resizeMode="cover"
      />

      <View className="justify-between flex-1 p-3">

        <View>
          <Text className="text-lg font-semibold text-gray-900">
            {userInput.destination}
          </Text>
          <Text className="text-sm text-gray-500 mt-0.5">
            {userInput.from} → {userInput.to}
          </Text>
        </View>

        {/* MIDDLE */}
        <View className="flex-row mt-2">
          <Text className="text-sm text-gray-600">
            {userInput.travelType} · {userInput.people} person
          </Text>
        </View>

        {/* BOTTOM */}
        <View className="mt-2">
          <Text className="text-base font-semibold text-blue-600">
            {userInput.budget}
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">
            {userInput.nationality} · {userInput.travelPlan}
          </Text>
        </View>

      </View>

      <View className="flex flex-row justify-between gap-2 p-3">
       <TouchableOpacity >
        <MaterialIcons name="edit" size={26} color="gray" />
       </TouchableOpacity>
        <TouchableOpacity>
        <MaterialCommunityIcons name="delete" size={26} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
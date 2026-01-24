import { Text, TouchableOpacity, View, Image } from "react-native";
import type { UserInput } from "../constants/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  userInput: UserInput;
};

export default function TripCard({ userInput }: Props) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Steps", { screen: "TripDetails" })
      }
      className="flex-row p-3 mb-4 bg-white shadow-sm rounded-2xl"
    >
      {/* IMAGE */}
      <Image
        source={{ uri: userInput.image }}
        resizeMode="cover"
        className="w-24 h-24 rounded-xl"
      />

      {/* CONTENT */}
      <View className="justify-between flex-1 ml-3">
        {/* Top */}
        <View>
          <Text
            className="text-lg font-semibold text-gray-900"
            numberOfLines={1}
          >
            {userInput.destination}
          </Text>
          <Text className="text-xs text-gray-500 mt-0.5">
            {userInput.from} → {userInput.to}
          </Text>
        </View>

        {/* Middle */}
        <View className="flex-row items-center gap-3 mt-1">
          <View className="flex-row items-center gap-1">
            <MaterialCommunityIcons
              name="airplane"
              size={14}
              color="#6B7280"
            />
            <Text className="text-xs text-gray-600">
              {userInput.travelType}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <MaterialIcons name="people" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-600">
              {userInput.people}
            </Text>
          </View>
        </View>

        {/* Bottom */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="px-3 py-1 rounded-full bg-blue-50">
            <Text className="text-xs font-semibold text-blue-600">
              {userInput.budget}
            </Text>
          </View>

          <Text className="text-xs text-gray-500">
            {userInput.travelPlan}
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View className="justify-between ml-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Steps", { screen: "TripEdit" })
          }
          className="p-1"
        >
          <MaterialIcons name="edit" size={22} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity className="p-1">
          <MaterialCommunityIcons
            name="delete-outline"
            size={22}
            color="#EF4444"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

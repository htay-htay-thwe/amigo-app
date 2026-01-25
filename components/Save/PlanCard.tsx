import { Text, TouchableOpacity, View, Image } from "react-native";
import type { UserInput } from "../constants/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  userInput: UserInput;
};

export default function PlanCard({ userInput }: Props) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate("Steps", {
          screen: "PlanCheck",
        })
      }
      className="mb-4 overflow-hidden bg-white shadow-md rounded-3xl"
    >
      {/* IMAGE SECTION */}
      <View className="relative h-40">
        <Image
          source={{ uri: userInput.image }}
          resizeMode="cover"
          className="w-full h-full"
        />

        {/* Image overlay */}
        <View className="absolute inset-0 bg-black/20" />

        {/* Destination */}
        <View className="absolute bottom-3 left-3 right-3">
          <Text className="text-xl font-bold text-white">
            {userInput.destination}
          </Text>
          <Text className="text-sm text-white/90">
            {userInput.from} → {userInput.to}
          </Text>
        </View>
      </View>

      {/* CONTENT */}
      <View className="p-4 space-y-3">
        {/* Travel meta */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="airplane"
              size={18}
              color="#4B5563"
            />
            <Text className="text-sm text-gray-700">
              {userInput.travelType}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <MaterialIcons name="people" size={18} color="#4B5563" />
            <Text className="text-sm text-gray-700">
              {userInput.people}
            </Text>
          </View>
        </View>

        {/* Budget */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-blue-600">
            {userInput.budget}
          </Text>

          <View className="px-3 py-1 rounded-full bg-blue-50">
            <Text className="text-xs font-medium text-blue-600">
              {userInput.travelPlan}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
          <Text className="text-xs text-gray-500">
            {userInput.nationality}
          </Text>

          <MaterialIcons
            name="chevron-right"
            size={22}
            color="#9CA3AF"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

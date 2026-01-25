import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import type { SavedTrip, UserInput } from "../constants/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


type Props = {
  userInput: SavedTrip["trip_plan"];
  onPress?: () => void;
};

export default function TripCard({ userInput, onPress}: Props) {

  const img = userInput.itinerary[0]?.activities[0]?.activity_photos[0] ===
    undefined
    ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    : userInput.itinerary[0]?.activities[0]?.activity_photos[1];
  const handleCardPress = () => {
    console.log('clicked');
    Alert.alert(
      "Confirm Action", // Dialog Title
      "Are you sure you want to delete this item?", // Dialog Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => console.log("Delete Pressed"),
          style: "destructive"
        }
      ],
      {
        cancelable: false
      }
    );
  }


  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-row p-3 mb-4 bg-white shadow-sm rounded-2xl">
      {/* IMAGE */}
      <Image
        source={{ uri: img }}
        resizeMode="cover"
        className="w-24 h-24 rounded-xl" />

      {/* CONTENT */}
      <View className="justify-between flex-1 ml-3">
        {/* Top */}
        <View>
          <Text
            className="text-lg font-semibold text-gray-900"
            numberOfLines={1}>
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
              {userInput.budget_limit_thb} {userInput.currency}
            </Text>
          </View>

          {/* <Text className="text-xs text-gray-500">
            {userInput.travelPlan}
          </Text> */}
        </View>
      </View>

      {/* ACTIONS */}
      <View className="justify-between ml-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Steps", { screen: "TripEdit" })
          }
          className="p-1">
          <MaterialIcons name="edit" size={22} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity className="p-1" onPress={handleCardPress}>
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

import { Text, TouchableOpacity, View, Image } from "react-native";
import type { UserInput, SavedTrip } from "../constants/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  userInput: UserInput;
  onPress?: () => void;
  onDelete?: () => void;
  id?: string;
  trip?: SavedTrip;
};

export default function PlanCard({userInput, onPress, onDelete, id, trip  }: Props) {
  const navigation = useNavigation<any>();
  const img = userInput.itinerary[0]?.activities[1]?.activity_photos[0];

  // Calculate if all items are checked
  const isFullyCompleted = () => {
    if (!trip?.checkProgress) return false;
    
    const { departureFlight, returnFlight, accommodation, activities } = trip.checkProgress;
    
    // Check flights and accommodation
    if (!departureFlight || !returnFlight || !accommodation) return false;
    
    // Check all activities
    const totalActivities = userInput.itinerary.reduce((sum, day, dayIndex) => {
      return sum + day.activities.length;
    }, 0);
    
    const checkedActivities = Object.values(activities || {}).reduce((sum, dayActivities) => {
      return sum + Object.values(dayActivities).filter(Boolean).length;
    }, 0);
    
    return checkedActivities === totalActivities;
  };

  const completed = isFullyCompleted();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 overflow-hidden bg-white shadow-md rounded-3xl"
    >
      {/* IMAGE SECTION */}
      <View className="relative h-40">
        <Image
          source={{ uri: img }}
          resizeMode="cover"
          className="w-full h-full"
        />

        {/* Image overlay */}
        <View className="absolute inset-0 bg-black/20" />

        {/* Success Badge */}
        {completed && (
          <View className="absolute top-3 right-3 flex-row items-center px-3 py-1.5 bg-green-500 rounded-full shadow-lg">
            <MaterialIcons name="check-circle" size={18} color="white" />
            <Text className="ml-1 text-xs font-bold text-white">Completed</Text>
          </View>
        )}

        {/* Delete Button */}
        {onDelete && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-3 left-3 flex-row items-center justify-center w-10 h-10 bg-red-500 rounded-full shadow-lg"
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        )}

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
              {userInput.travel_type}
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
            {userInput.budget_limit_thb} {userInput.currency} 
          </Text>

          {/* <View className="px-3 py-1 rounded-full bg-blue-50">
            <Text className="text-xs font-medium text-blue-600">
              {userInput.travelPlan}
            </Text>
          </View> */}
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

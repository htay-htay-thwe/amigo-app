import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import type { UserInput } from "../constants/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useTripStore } from "../store/trip.store";
import { Toast } from "toastify-react-native";


type Props = {
  userInput: UserInput;
  onPress?: () => void;
  id?: string;

};

export default function TripCard({ userInput, onPress, id }: Props) {

  const navigation = useNavigation<any>();
  const img = userInput.itinerary[0]?.activities[1]?.activity_photos[0];

  const deleteTripPlan = () => {
    if (!id) {
      Toast.error("Unable to delete trip", "top", 2500);
      return;
    }
    
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
          onPress: () => {
            useTripStore.getState().removeSavedTrip(id);
            Toast.success("Trip deleted successfully", "top", 2500);
          },
          style: "destructive"
        }
      ],
      {
        cancelable: false
      }
    );
  }

  const editTripPlan = (id: string) => {
    navigation.navigate("Steps", {
      screen: "TripEdit",
      params: { tripId: id },
    });
  }

  const setAsPlan = (id:string) => {
    if (!id) {
      Toast.error("Unable to set trip as MyPlan", "top", 2500);
      return;
    }

    const tripExists = useTripStore.getState().saveTrip.find(trip => trip?.id === id);
    if (!tripExists) {
      Toast.error("Trip not found", "top", 2500);
      return;
    }
    console.log('id',id);

    useTripStore.getState().setMyPlan(tripExists);
    useTripStore.getState().removeSavedTrip(id);
    Toast.success("Trip set as MyPlan successfully", "top", 2500);
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
      <View className="justify-between ml-3">
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
              {userInput.travel_type}
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
      <View className="items-end justify-between pr-1 ">
        <TouchableOpacity
          onPress={() => id && editTripPlan(id)}
          className="p-1">
          <MaterialIcons name="edit" size={22} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity className="p-1" onPress={deleteTripPlan}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={22}
            color="#EF4444"
          />
        </TouchableOpacity>
        
         <TouchableOpacity className="p-1 bg-blue-100 rounded-lg" onPress={() => id ? setAsPlan(id) : null}>
         <Text className="p-1 text-sm">Set as MyPlan</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

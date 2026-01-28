import Modal from "react-native-modal";
import { View, TextInput, Text, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import FlightCard from "../Visa/FlightCard";
import Button from "../ui/Button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import type { SavedTrip } from "../constants/types";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { gemini } from "../constants/api";
import { data, planData } from "../constants/data";
import { useUpdateStore } from "../store/updateData.store";
import { ActivityIndicator } from "react-native";
import { changeUpdatePrompt, updateSingleActivityPrompt } from "../constants/firstSystemPrompt";
import AccommodationCard from "../Visa/Accommodation";
import { fetchFlights } from "../constants/flight/fetchFlights";
import { fetchHotels } from "../constants/flight/fetchHotel";
import { fetchYoutubeLink } from "../constants/flight/youtube";
import { ScreenStackHeaderSearchBarView } from "react-native-screens";
import { useTripStore } from "../store/trip.store";
import ActivityCard from "../Timeline/ActivityCard";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  flights: any[];
  editPayload?: {
    type: "flight" | "accommodation" | "itinerary";
    title: string;
    data: any;
  };
  tripData: any;
};

export default function EditModal({
  open,
  setOpen,
  flights,
  editPayload,
  tripData,
}: Props) {
  const flightGroups = flights[0];
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState<any>(null);
  const [updateUserPrompt, setUpdateUserPrompt] = useState("");
  const [err, setErr] = useState("");
  const { loading, error } = useUpdateStore();
  const startUpdating = useUpdateStore.getState().startUpdating;
  const stopLoading = useUpdateStore.getState().stopLoading;
  const setError = useUpdateStore.getState().setErr;
  const updateSavedTrip = useTripStore((s) => s.updateSavedTrip);
  // const [send, setSend] = useState(false);
  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const YT_KEY = process.env.EXPO_PUBLIC_YT_KEY;

  // Early return if tripData is null or invalid
  if (!tripData || !tripData.trip_plan) {
    return null;
  }

  const updateToPrompt = () => {
    if (updateUserPrompt.trim() === "") {
      setErr("* required");
      return;
    }
    // setUpdateData(updateUserPrompt);
    updateTripJson();
  };

  function extractJson(text: string) {
    const start = text.indexOf("{");
    if (start === -1) {
      throw new Error("No JSON object found");
    }

    let braceCount = 0;
    let end = -1;

    for (let i = start; i < text.length; i++) {
      if (text[i] === "{") braceCount++;
      if (text[i] === "}") braceCount--;

      if (braceCount === 0) {
        end = i;
        break;
      }
    }

    if (end === -1) {
      throw new Error("Incomplete JSON returned by Gemini (truncated)");
    }

    return text.slice(start, end + 1);
  }

  function insertData(data: any) {
    if (!tripData || !tripData.trip_plan || !tripData.id) {
      console.error("Invalid tripData - cannot update");
      setOpen(false);
      return;
    }

    const tripId = tripData?.id;

    const updatedTrip = {
      ...tripData,
      trip_plan: {
        ...tripData.trip_plan,
        flights: [...(tripData.trip_plan.flights || [])],
        itinerary: (tripData.trip_plan.itinerary || []).map((day: any) => ({
          ...day,
          activities: [...(day.activities || [])],
        })),
        accommodation: { ...(tripData.trip_plan.accommodation || {}) },
      },
    };

    if (editPayload?.title === "Edit departure") {
      updatedTrip.trip_plan.flights[0] = data.selected_departure_flight;

    } else if (editPayload?.title === "Edit return") {
      updatedTrip.trip_plan.flights[1] = data.selected_return_flight;
    } else if (editPayload?.title === "Edit accommodation") {
      console.log('Updating accommodation with data:', updatedTrip.trip_plan.accommodation);
      updatedTrip.trip_plan.accommodation = data.selected_accommodation;

    } else if (editPayload?.title?.startsWith("Edit Day")) {
      const match = editPayload.title.match(/Edit Day (\d+) - (\d{2}:\d{2})/);

      if (!match) return;

      const dayNumber = Number(match[1]);
      const time = match[2];

      const dayIndex = dayNumber - 1;

      const activities = updatedTrip.trip_plan.itinerary[dayIndex].activities;

      const activityIndex = activities.findIndex(
        (act: any) => act.time === time
      );

      if (activityIndex === -1) return;
      updatedTrip.trip_plan.itinerary[dayIndex].activities[activityIndex] =
        data.updated_activity;
    }
    updateSavedTrip(tripId, updatedTrip);
    setOpen(false);
  }


  const geminiFunc = async (fetchApi: any, updateUserPrompt: string, payloadTitle: string, currentActivity?: any) => {
    const prompt = editPayload?.type === "itinerary" && currentActivity
      ? updateSingleActivityPrompt(payloadTitle, currentActivity,tripData.trip_plan.destination, updateUserPrompt)
      : changeUpdatePrompt(fetchApi, updateUserPrompt, payloadTitle);

    const response = await gemini.post(
      `/models/gemini-2.5-flash:generateContent`,
      prompt,
      { params: { key: GEMINI_API_KEY } }
    );
    stopLoading();
    const candidate = response.data?.candidates?.[0];
    const rawText = candidate?.content?.parts?.[0]?.text;
    const data = JSON.parse(extractJson(rawText))
    return data;
  }

  const switchFunc = async () => {
    if (!tripData?.trip_plan) return null;

    if (editPayload?.title === "Edit departure") {
      const outboundFlights = await fetchFlights({
        origin: tripData.trip_plan.flights[0].departure_airport,
        destination: tripData.trip_plan.flights[0].arrival_airport,
        date: tripData.trip_plan.from,
        people: Number(tripData.trip_plan.people) || 1,
        currency: tripData.trip_plan.currency,
      });
      const updatedDeparture = await geminiFunc(outboundFlights, updateUserPrompt, editPayload?.title || "");
      setUpdate(updatedDeparture);
      return updatedDeparture;
    }

    if (editPayload?.title === "Edit return") {
      const returnFlights = await fetchFlights({
        origin: tripData.trip_plan.flights[1].departure_airport,
        destination: tripData.trip_plan.flights[1].arrival_airport,
        date: tripData.trip_plan.to,
        people: Number(tripData.trip_plan.people) || 1,
        currency: tripData.trip_plan.currency || "THB",
      });
      const updatedReturn = await geminiFunc(returnFlights, updateUserPrompt, editPayload?.title || "");
      setUpdate(updatedReturn);
      return updatedReturn;
    }

    if (editPayload?.title === "Edit accommodation") {
      console.log('Fetching hotels for accommodation update', tripData.trip_plan.destination);
      const hotels = await fetchHotels({
        destination: tripData.trip_plan.destination,
        checkIn: tripData.trip_plan.from,
        checkOut: tripData.trip_plan.to,
        currency: tripData.trip_plan.currency || "THB",
      });
      const updatedHotels = await geminiFunc(hotels, updateUserPrompt, editPayload?.title || "");
      setUpdate(updatedHotels);
    }

    if (editPayload?.title?.startsWith("Edit Day")) {
      try {
        console.log("📝 Starting itinerary update...");
        console.log("Edit payload title:", editPayload.title);
        
        const match = editPayload.title.match(/Edit Day (\d+) - (\d{2}:\d{2})/);
        if (!match) {
          console.error("❌ Failed to parse day and time from title");
          return null;
        }

        const dayNumber = Number(match[1]);
        const time = match[2];
        const dayIndex = dayNumber - 1;
        
        console.log("Day number:", dayNumber, "| Time:", time, "| Day index:", dayIndex);
        console.log("Trip itinerary:", JSON.stringify(tripData.trip_plan.itinerary, null, 2));

        const currentActivity = tripData.trip_plan.itinerary[dayIndex]?.activities?.find(
          (act: any) => act.time === time
        );

        if (!currentActivity) {
          console.error("❌ Activity not found at day", dayNumber, "time", time);
          console.log("Available activities:", tripData.trip_plan.itinerary[dayIndex]?.activities);
          return null;
        }

        console.log("✅ Current activity found:", JSON.stringify(currentActivity, null, 2));
        console.log("User prompt:", updateUserPrompt);

        const updatedActivity = await geminiFunc(null, updateUserPrompt, editPayload.title, currentActivity);
        
        console.log("✅ Updated activity received:", JSON.stringify(updatedActivity, null, 2));
        
        // Fetch YouTube link if youtube_query exists
        if (updatedActivity.updated_activity?.youtube_query) {
          console.log("🎥 Fetching YouTube link for:", updatedActivity.updated_activity.youtube_query);
          const youtubeLink = await fetchYoutubeLink(
            updatedActivity.updated_activity.youtube_query,
            YT_KEY || ""
          );
          
          if (youtubeLink) {
            console.log("✅ YouTube link fetched:", youtubeLink);
            updatedActivity.updated_activity.youtube_vlog_link = youtubeLink;
          } else {
            console.warn("⚠️ No YouTube link found");
          }
        }
        
        setUpdate(updatedActivity);
        return updatedActivity;
      } catch (error: any) {
        console.error("❌ Error in itinerary update:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        setError(error.message);
        return null;
      }
    }

    return null;
  };


  const updateTripJson = async () => {
    if (!tripData) {
      setErr("Trip data is not available");
      return;
    }

    try {
      startUpdating();
      await switchFunc();
      // setUpdateData(tripData);
    } catch (error: any) {
      console.error(
        "❌ Trip planning failed:",
        error?.response?.data || error.message
      );
      setError(error?.response?.data || error.message);
    }

  }

  const realUpdateFunction = () => {
    if (!tripData) {
      console.error("Trip data is not available");
      setOpen(false);
      return;
    }

    if (update) {
      insertData(update);
    }
  };

  return (
    <Modal
      isVisible={open}
      avoidKeyboard
      backdropOpacity={0.45}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen={true}
      onBackdropPress={() => setOpen(false)}
      style={{ margin: 0, justifyContent: "flex-end" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}>
        <SafeAreaView edges={["bottom"]} className="px-5 pt-4 pb-0 bg-white rounded-t-3xl">
          {/* Drag handle */}
          <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-4" />

          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <MaterialIcons
                name={
                  editPayload?.type === "flight"
                    ? "flight-takeoff"
                    : editPayload?.type === "accommodation"
                      ? "hotel"
                      : "location-city"
                }
                size={28}
                color="#2563eb"
              />
              <Text className="text-lg font-semibold">
                {editPayload?.title}
              </Text>
            </View>

            <TouchableOpacity onPress={() => setOpen(false)}>
              <FontAwesome name="close" size={22} color="#2563eb" />
            </TouchableOpacity>
          </View>


          <View className="p-4 mb-4 bg-gray-50 rounded-2xl">
            <TextInput
              value={updateUserPrompt}
              onChangeText={setUpdateUserPrompt}
              multiline
              placeholder="Add notes or instructions…"
              placeholderTextColor="#999"
              className="text-base min-h-[100px]"
            />
            {err !== "" && (
              <Text className="mt-2 text-red-500">{err}</Text>
            )}

            <View className="items-end mt-2">
              <TouchableOpacity
                onPress={updateToPrompt}
                className="items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <MaterialIcons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {loading &&
            <View className="items-center justify-center flex-1 p-5 bg-white">
              <ActivityIndicator size="large" color="#0D47A1" />
              <Text className="mt-4 text-base text-center text-primary">Updating your {editPayload?.title}...</Text>
            </View>
          }


          {update && (
            <View className="p-2 mb-4 bg-gray-50 rounded-2xl">
              <View className="flex-row items-center gap-3">
                <View className="w-11/12">
                  {editPayload?.type === "flight" && (
                    <FlightCard
                      condition="update"
                      label="Departure"
                      flight={update.selected_departure_flight || update.selected_return_flight}
                    />
                  )}
                  {editPayload?.type === "accommodation" && (
                    <AccommodationCard accommodation={update.selected_accommodation} />
                  )}
                  {editPayload?.type === "itinerary" && update.updated_activity && (
                    <ActivityCard 
                      activity={update.updated_activity}
                      youtubeLink={update.updated_activity.youtube_vlog_link}
                    />
                  )}
                </View>
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
            </View>
          )}


          {update && (
            <Button
              title="Update"
              checked={checked}
              onPress={realUpdateFunction}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
}

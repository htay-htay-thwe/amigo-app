import { StatusBar, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { useTripStore } from "../../components/store/trip.store";
import clsx from "clsx";
import { selectLogisticsPrompt, itineraryPrompt, visaPrompt } from "../../components/constants/firstSystemPrompt";
import { usePlanStore } from "../../components/store/plan.store";
import { gemini } from "../../components/constants/api";
import { fetchFlights } from "../../components/constants/flight/fetchFlights";
import { fetchHotels } from "../../components/constants/flight/fetchHotel";
import { itineraryWithYoutube } from "../../components/constants/flight/youtube";

export default function StepSix() {
    const navigation = useNavigation<any>();
    const [userPrompt, setUserPrompt] = useState("");
    const [error, setError] = useState("");
    const setUserPromptsStore = useTripStore((s) => s.setUserPrompts);
    const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const YT_KEY = process.env.EXPO_PUBLIC_YT_KEY;
    const startPlanning = usePlanStore.getState().startPlanning;
    const setPlanData = usePlanStore.getState().setPlanData;
    const setErr = usePlanStore.getState().setErr;
    const trip = useTripStore.getState();

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

    const planTripFunc = async () => {
        try {
            startPlanning();

            const outboundFlights = await fetchFlights({
                origin: trip.origin,                      // Origin airport code (e.g., RGN)
                destination: trip.destinationAirport,     // Destination airport code (e.g., BKK)
                date: trip.from,
                people: Number(trip.people),
                currency: trip.currency,
            });

            const returnFlights = await fetchFlights({
                origin: trip.destinationAirport,          // Return from destination airport
                destination: trip.origin,                 // Back to origin airport
                date: trip.to,
                people: Number(trip.people),
                currency: trip.currency,
            });

            const hotels = await fetchHotels(trip);

            const visaRes = await gemini.post(
                "/models/gemini-2.5-flash:generateContent",
                visaPrompt(trip),
                { params: { key: GEMINI_API_KEY } }
            );
            const visaJson = JSON.parse(
                extractJson(visaRes.data.candidates[0].content.parts[0].text)
            );
            console.log('visaJson', visaJson);

            const logisticsRes = await gemini.post(
                "/models/gemini-2.5-flash:generateContent",
                selectLogisticsPrompt(outboundFlights, returnFlights, hotels),
                { params: { key: GEMINI_API_KEY } }
            );

            console.log('logisticsRes raw:', JSON.stringify(logisticsRes.data, null, 2));
            
            if (!logisticsRes.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("Invalid logistics response from Gemini");
            }

            const logisticsJson = JSON.parse(
                extractJson(logisticsRes.data.candidates[0].content.parts[0].text)
            );
            console.log('logisticsJson', logisticsJson);

            if (
                !logisticsJson.selected_outbound_flight ||
                !logisticsJson.selected_return_flight ||
                !logisticsJson.selected_hotel
            ) {
                throw new Error("No valid logistics selected");
            }
            
            const itineraryRes = await gemini.post(
                "/models/gemini-2.5-flash:generateContent",
                itineraryPrompt(
                    trip,
                    logisticsJson.selected_outbound_flight,
                    logisticsJson.selected_hotel
                ),
                { params: { key: GEMINI_API_KEY } }
            );

            console.log('itineraryRes raw:', JSON.stringify(itineraryRes.data, null, 2));
            
            if (!itineraryRes.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("Invalid itinerary response from Gemini");
            }

            const itineraryJson = JSON.parse(
                extractJson(itineraryRes.data.candidates[0].content.parts[0].text)
            );

            console.log('itineraryJson', itineraryJson);
            const enrichedItinerary = await itineraryWithYoutube(
                itineraryJson.itinerary,
                YT_KEY
            );

            const finalPlan = {
                trip_plan: {
                    trip_id: `AUTO-${Date.now()}`,
                    origin: trip.origin,
                    destination: trip.destination,
                    destinationAirport: trip.destinationAirport,
                    nationality: trip.nationality,
                    travel_type: trip.travelType,
                    visa_requirements: visaJson.visa_requirements,
                    duration_days:
                        Math.ceil(
                            (new Date(trip.to).getTime() -
                                new Date(trip.from).getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) + 1,
                    budget_limit_thb: trip.amount,
                    from: trip.from,
                    to: trip.to,
                    people: trip.people,
                    userPrompt: trip.userPrompts,
                    currency: trip.currency,
                    flights: [
                        logisticsJson.selected_outbound_flight,
                        logisticsJson.selected_return_flight,
                    ],

                    accommodation: logisticsJson.selected_hotel,

                    itinerary: enrichedItinerary,
                },
            };

            setPlanData(finalPlan);
            console.log("Trip planning completed:", finalPlan);

        } catch (error: any) {
            console.error("❌ Trip planning failed:", error.message || "Unknown error");
            console.error("Error details:", error);
            console.error("Error stack:", error.stack);
            setErr(error.message || "Something went wrong");
        }
    };


    const onNext = () => {
        if (userPrompt.trim() === "") {
            setError("* required");
            return;
        }

        setUserPromptsStore(userPrompt);

        // Navigate first (UX-friendly)
        navigation.navigate("TripPlan");

        // Fire-and-forget
        planTripFunc();
    };



    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Head />
                    {/* Contents */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                        keyboardShouldPersistTaps="handled">
                        <SafeAreaView style={{ flex: 1 }}>
                            <View className="flex gap-5 px-4 pb-10">
                                <StepIndicatorComponent currentStep={6} />

                                <Text className="px-5 text-2xl font-semibold text-center text-primary ">
                                    What would you like to do on this trip?
                                </Text>

                                <Text className="mt-2 font-semibold text-center text-md text-primary">
                                    Share your interests, travel styles and must-see places
                                </Text>

                                <View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={6}
                                        className={clsx("border mt-3 border-gray-300 rounded-lg p-4 min-h-[200px] text-base",
                                            error !== "" ? "border-red-500" : "border-gray-300"
                                        )}
                                        textAlignVertical="top"
                                        placeholder="I enjoy Asian cultural experiences, traditional local food, and scenic nature. I prefer a relaxed 
travel style, moderate budget, and must-see temples, heritage sites, street markets, and hidden local spots."
                                        placeholderTextColor="#999"
                                        value={userPrompt}
                                        onChangeText={setUserPrompt}
                                    />
                                    {error !== "" && (
                                        <Text className="mt-2 text-red-500">{error}</Text>
                                    )}
                                </View>

                                <View className="items-center mt-12">
                                    <Button onPress={onNext} title="Next" variant="primary" size="md" />
                                </View>
                            </View>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function retry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delay = 800
): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;

        console.warn(`🔁 Retry left: ${retries}`);
        await sleep(delay);

        return retry(fn, retries - 1, delay * 1.5); // backoff
    }
}

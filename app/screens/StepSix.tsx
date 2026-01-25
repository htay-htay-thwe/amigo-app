import { StatusBar, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import Head from "../DataForm/Head";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ui/Input";
import StepIndicatorComponent from "../../components/ui/StepIndicatorComponent";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { useTripStore } from "../../components/store/trip.store";
import clsx from "clsx";
import axios from "axios"
import { tripPrompt } from "../../components/constants/firstSystemPrompt";
import { usePlanStore } from "../../components/store/plan.store";

export default function StepSix() {
    const navigation = useNavigation();
    const [userPrompt, setUserPrompt] = useState("");
    const [error, setError] = useState("");
    const setUserPromptsStore = useTripStore((s) => s.setUserPrompts);
    const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const YT_KEY = process.env.EXPO_PUBLIC_YT_KEY;
    const startPlanning = usePlanStore.getState().startPlanning;
    const setPlanData = usePlanStore.getState().setPlanData;
    const setErr = usePlanStore.getState().setErr;
    const trip = useTripStore.getState();

    /* -------------------- GEMINI CLIENT -------------------- */
    const gemini = axios.create({
        baseURL: "https://generativelanguage.googleapis.com/v1beta",
        headers: {
            "Content-Type": "application/json",
        },
    });

    /* -------------------- JSON EXTRACTOR (CRITICAL) -------------------- */
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


    /* -------------------- MAIN FUNCTION -------------------- */
    const planTripFunc = async () => {
        try {
            startPlanning();

            /* ---------- 1. CALL GEMINI ---------- */
            const response = await retry(
                () =>
                    gemini.post(
                        `/models/gemini-3-flash-preview:generateContent`,
                        tripPrompt(trip),
                        { params: { key: GEMINI_API_KEY } }
                    ),
                3
            );

            const jsonText = await retry(
                async () => {
                    const candidate = response.data?.candidates?.[0];
                    const rawText = candidate?.content?.parts?.[0]?.text;

                    if (!rawText) {
                        throw new Error("Empty Gemini text");
                    }

                    return extractJson(rawText);
                },
                2
            );
            console.log("📄 Extracted JSON text:", jsonText);

            let tripJson: any;
            try {
                tripJson = JSON.parse(jsonText);
            } catch (err) {
                console.error("❌ JSON PARSE FAILED:", jsonText);
                throw err;
            }

            /* ---------- 3. NORMALIZE ITINERARY ---------- */
            const days = Array.isArray(tripJson?.trip_plan?.itinerary)
                ? tripJson.trip_plan.itinerary
                : [];

            console.log("📅 Itinerary days:", days.length);

            /* ---------- 4. ENRICH WITH YOUTUBE ---------- */
            const enrichedDays = await Promise.all(
                days.map(async (day: any, index: number) => {
                    if (!day.youtube_query) {
                        console.warn(`⚠️ Day ${index + 1} missing youtube_query`);
                        return day;
                    }

                    const ytUrl =
                        "https://www.googleapis.com/youtube/v3/search?" +
                        "part=snippet&" +
                        "q=" + encodeURIComponent(day.youtube_query) + "&" +
                        "type=video&" +
                        "maxResults=1&" +
                        "order=relevance&" +
                        "safeSearch=strict&" +
                        "key=" + YT_KEY;

                    try {
                        const yData = await retry(
                            async () => {
                                const yRes = await fetch(ytUrl);
                                if (!yRes.ok) throw new Error("YT fetch failed");
                                return yRes.json();
                            },
                            2,
                            500
                        );

                        const videoId = yData?.items?.[0]?.id?.videoId;
                        console.log("🎥 YouTube videoId for Day", index + 1, ":", videoId);

                        if (!videoId) return day;

                        return {
                            ...day,
                            youtube_vlog_link: `https://www.youtube.com/watch?v=${videoId}`,
                        };
                    } catch (err) {
                        console.warn("⚠️ YouTube fetch failed:", err);
                        return day;
                    }
                })
            );

            /* ---------- 5. BUILD FINAL PLAN ---------- */
            const finalPlan = {
                ...tripJson,
                trip_plan: {
                    ...tripJson.trip_plan,
                    itinerary: enrichedDays,
                },
            };
            /* ---------- 6. SET STATE ONCE ---------- */
            setPlanData(finalPlan);
            console.log("✅ Final trip plan ready:", finalPlan);

        } catch (error: any) {
            console.error(
                "❌ Trip planning failed:",
                error?.response?.data || error.message
            );
            setErr(error?.response?.data || error.message);
        }
    };

    /* -------------------- NAVIGATION HANDLER -------------------- */
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

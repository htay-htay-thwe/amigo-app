import { useState } from "react";
import { usePlanStore } from "../store/plan.store";
import { useTripStore } from "../store/trip.store";
import { fetchFlights } from "./flight/fetchFlights";
import { fetchHotels } from "./flight/fetchHotel";
import { gemini } from "./api";
import { extractJson, itineraryPrompt, selectLogisticsPrompt, visaPrompt } from "./firstSystemPrompt";
import { itineraryWithYoutube } from "./flight/youtube";

    const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    const YT_KEY = process.env.EXPO_PUBLIC_YT_KEY;
    const startPlanning = usePlanStore.getState().startPlanning;
    const setPlanData = usePlanStore.getState().setPlanData;
    const setErr = usePlanStore.getState().setErr;
    const trip = useTripStore.getState();


export const planTripFunc = async () => {
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
                "/models/gemini-3-flash:generateContent",
                visaPrompt(trip),
                { params: { key: GEMINI_API_KEY } }
            );
            const visaJson = JSON.parse(
                extractJson(visaRes.data.candidates[0].content.parts[0].text)
            );
            console.log('visaJson', visaJson);

            const logisticsRes = await gemini.post(
                "/models/gemini-3-flash:generateContent",
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
                "/models/gemini-3-flash:generateContent",
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
            setErr("Something went wrong");
        }
    };
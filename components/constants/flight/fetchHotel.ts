import axios from "axios";
import type { TripState } from "../../store/trip.store";

export async function fetchHotels(trip: TripState) {
  console.log("Fetching hotels for trip:", trip);

  try {
    const res = await axios.get(
      "http://172.25.116.112:4000/api/hotels?",
      {
        params: {
          destination: trip.destination,    
          checkIn: trip?.checkIn || trpip.from ,           
          checkOut: trip?.checkOut || trip.to ,          
          currency: trip.currency ,
        },
      }
    );

    console.log("hotels:", res.data.data);
    return res.data.data; 
  } catch (error: any) {
    console.error("Hotel fetch failed");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error(
        "Error data:",
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error("Error message:", error.message || "Unknown error");
    }

    throw error;
  }
}

import axios from "axios";

export async function fetchFlights(params: {
  origin: string;
  destination: string;
  date: string;
  people: number;
  currency: string;
}) {
  console.log("Fetching flights for trip:", params);
  try {

    const res = await axios.get(
      "http://172.25.116.112:4000/api/flights?",
      {
        params: {
          origin: params.origin,
          destination: params.destination,
          date: params.date,
          adults: params.people ?? 1,
          nonStop: true,
          currencyCode: params.currency,
          max: 5,
        },
      }
    );

    console.log('res',res.data.flights);
    return res.data.flights;
  } catch (error: any) {
    console.error("Amadeus flight fetch failed");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error(
        "Error data:",
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error("Error message:", error.message);
    }

    throw error;
  }
}

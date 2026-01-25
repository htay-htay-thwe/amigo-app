import { TripState } from "../store/trip.store";

export const tripPrompt = (trip: TripState) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are a world-class Senior Travel Logistics AI, a professional real-life travel planner agency, and a modern travel app architect.

Return a COMPLETE, STRICTLY VALID, MACHINE-READABLE JSON object.
NO explanations. NO markdown. NO comments. OUTPUT JSON ONLY.

CRITICAL RULES:
1. Output ONLY valid JSON.
2. Follow the schema EXACTLY.
3. Never omit fields. Use null or [] if needed.
4. Flights MUST be TWO SEPARATE ONE-WAY FLIGHTS.
5. Hotel MUST include exact address and at least 2 photos.
6. Total trip cost MUST NOT exceed budget by more than 5%.
7. Visa requirements MUST be based on nationality.
8. Itinerary MUST be depend on from and to Date.
9. Use ONLY youtube_query (NO youtube links).
10. Every activity MUST include activity_photos (1–5).
11. Do NOT include explanations, markdown, or text
12. You MUST finish the JSON object.
13. Do NOT stop until the final closing brace } is written.If you are running out of tokens, shorten descriptions and shorten activity photos but CLOSE THE JSON.

INPUT:
Nationality: ${trip.nationality}
Budget: ${trip.amount} ${trip.currency}
Travel type: ${trip.travelType}
Interests: ${trip.userPrompts}
From date: ${trip.from}
To date: ${trip.to}
Destination: ${trip.destination}
People: ${trip.people}

OUTPUT FORMAT:

{
  "trip_plan": {
    "trip_id": "BKK-INT-2026-001",
    "destination": "${trip.destination}",
    "nationality": "${trip.nationality}",
    "travel_type": "${trip.travelType}",
    "duration_days": 3,
    "budget_limit_thb": ${trip.amount},
    "from": "${trip.from}",
    "to": "${trip.to}",
    "people": ${trip.people},
    "userPrompt": "${trip.userPrompts}",
    "currency": "${trip.currency}",

    "visa_requirements": {
      "visa_free": true,
      "visa_type": "Tourist Visa Exemption",
      "details": "Visa rules evaluated based on nationality."
    },

    "flights": [
      {
        "airline": "Myanmar Airways International",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Myanmar_Airways_International_logo.svg/512px-Myanmar_Airways_International_logo.svg.png",
        "flight_number": "8M335",
        "departure_airport": "RGN",
        "arrival_airport": "BKK",
        "departure_time": "${trip.from}T08:00:00",
        "arrival_time": "${trip.from}T09:45:00",
        "cost_thb": 2800
      },
      {
        "airline": "Myanmar Airways International",
        "airline_logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Myanmar_Airways_International_logo.svg/512px-Myanmar_Airways_International_logo.svg.png",
        "flight_number": "8M332",
        "departure_airport": "BKK",
        "arrival_airport": "RGN",
        "departure_time": "${trip.to}T19:15:00",
        "arrival_time": "${trip.to}T20:10:00",
        "cost_thb": 3100
      }
    ],

    "accommodation": {
      "hotel_name": "Ibis Styles Bangkok Khaosan Viengtai",
      "address": "42 Rambuttri Road, Banglamphu, Bangkok 10200, Thailand",
      "star_rating": 3,
      "total_cost_thb": 4200,
      "check_in": "${trip.from}",
      "check_out": "${trip.to}",
      "amenities": [
        "Free Wi-Fi",
        "Outdoor Pool",
        "Central Location",
        "Breakfast Included"
      ],
      "hotel_photos": [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
      ]
    },

    "itinerary": [
      {
        "day": 1,
        "theme": "Arrival & Nightlife",
        "youtube_query": "Bangkok nightlife Khaosan Road vlog",
        "activities": [
          {
            "time": "18:00",
            "activity_name": "Khaosan Road Nightlife",
            "description": "Explore bars, clubs, and street life.",
            "cost_thb": 500,
            "activity_photos": [
              "https://images.unsplash.com/photo-1508009603885-50cf7c579365"
            ]
          }
        ]
      },
      {
        "day": 2,
        "theme": "Beach Escape",
        "youtube_query": "Pattaya beach day trip from Bangkok",
        "activities": [
          {
            "time": "08:00",
            "activity_name": "Pattaya Beach Day Trip",
            "description": "Relax at the beach with optional water activities.",
            "cost_thb": 1800,
            "activity_photos": [
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            ]
          }
        ]
      },
      {
        "day": 3,
        "theme": "City Wrap-up",
        "youtube_query": "Bangkok city highlights vlog",
        "activities": [
          {
            "time": "10:00",
            "activity_name": "Shopping & Café Hopping",
            "description": "Souvenirs and relaxing cafés before departure.",
            "cost_thb": 400,
            "activity_photos": [
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            ]
          }
        ]
      }
    ]
  }
}
          `
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.2,
    topP: 0.9,
    maxOutputTokens: 10000
  }
});

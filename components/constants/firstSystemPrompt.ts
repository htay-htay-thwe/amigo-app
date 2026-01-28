import { TripState } from "../store/trip.store";

export const selectLogisticsPrompt = (
  outboundFlights: any[],
  returnFlights: any[],
  hotels: any[]
) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are a professional travel agent.

TASK:
From the provided flight and hotel data with reasonable or lowest price and suitable time SELECT exactly:
- 1 outbound flight
- 1 return flight
- 1 hotel

RULES:
- Output ONLY valid JSON
- NEVER invent data
- Prefer lowest total cost within budget 
- If none suitable, return null

OUTBOUND_FLIGHTS:
${JSON.stringify(outboundFlights)}

RETURN_FLIGHTS:
${JSON.stringify(returnFlights)}

HOTELS:
${JSON.stringify(hotels)}

OUTPUT:
{
  "selected_outbound_flight": OBJECT | null,
  "selected_return_flight": OBJECT | null,
  "selected_hotel": OBJECT | null,
  "total_estimated_cost": NUMBER
}
`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.05,
    maxOutputTokens: 5000
  }
});


export const itineraryPrompt = (
  trip: TripState,
  selectedFlight: any,
  selectedHotel: any
) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are a professional travel planner.

Create a day-by-day itinerary.

RULES:
1. Output ONLY valid JSON
2. Do NOT invent flights or hotels
3. Use ONLY provided logistics
4. Each day MUST have activities
5. Use youtube_query ONLY
6. 1–5 activity_photos per activity

TRIP DATES:
From: ${trip.from}
To: ${trip.to}

SELECTED FLIGHT:
${JSON.stringify(selectedFlight)}

SELECTED HOTEL:
${JSON.stringify(selectedHotel)}

OUTPUT FORMAT:
{
  "itinerary": [
    {
      "day": NUMBER,
      "theme": STRING,
      "activities": [
        {
          "time": "HH:mm",
          "activity_name": STRING,
          "description": STRING,
          "cost_thb": NUMBER,
          "activity_photos": [STRING],
          "youtube_query": STRING,
        }
      ]
    }
  ]
}
`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.05,
    maxOutputTokens: 8000
  }
});


export const visaPrompt = (trip: TripState) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are an immigration & visa rules expert used in a REAL travel planning application.

Your task:
- Determine visa requirements based ONLY on nationality and destination
- Output STRICTLY VALID JSON

━━━━━━━━━━━━━━━━━━
ABSOLUTE RULES
━━━━━━━━━━━━━━━━━━
1. Output ONLY valid JSON (no markdown, no explanation).
2. Follow the output schema EXACTLY.
3. Do NOT invent visa rules.
4. If destination is the SAME country as nationality → domestic travel.
5. If rules are unclear → use null.
6. Visa-free days MUST be a number or null.
7. Finish the JSON completely.

━━━━━━━━━━━━━━━━━━
TRAVEL INPUT
━━━━━━━━━━━━━━━━━━
Nationality: ${trip.nationality}
Destination country/city: ${trip.destination}
From date: ${trip.from}
To date: ${trip.to}

━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT (DO NOT CHANGE)
━━━━━━━━━━━━━━━━━━
{
  "visa_requirements": {
    "visa_required": BOOLEAN | null,
    "visa_free_days": NUMBER | null,
    "visa_type": STRING | null,
    "details": STRING
  }
}

━━━━━━━━━━━━━━━━━━
GUIDELINES
━━━━━━━━━━━━━━━━━━
- Domestic travel → visa_required = false, visa_free_days = null
- Visa exemption → visa_required = false, visa_free_days = number
- Visa on arrival → visa_required = true, visa_type = "Visa on Arrival"
- Tourist visa required → visa_required = true
- Be concise and factual in details
`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.05,
    maxOutputTokens: 8000
  }
});


export const changeUpdatePrompt = (data: any, userPrompt: string, title: string) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
        You are a professional travel agent.

User request:
"${userPrompt}"
Using the following  data, suggest the best options that match the user's request with reasonable or lowest price and suitable time. If not exactly like user prompt , suggest the closest possible option.

FLIGHT DATA:
${JSON.stringify(data)}

OUTPUT:
{
  ${title === "Edit departure" ? `"selected_departure_flight": OBJECT | null,` : ""}
  ${title === "Edit return" ? `"selected_return_flight": OBJECT | null,` : ""}
  ${title === "Edit accommodation" ? `"selected_accommodation": OBJECT | null,` : ""}
}
`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.05,
    maxOutputTokens: 4000
  }
});

export const updateSingleActivityPrompt = (
  target: string,
  currentActivity: any,
  userPrompt: string,
  city: string
) => ({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are a professional travel planner.

City: ${city}

USER REQUEST:
"${userPrompt}"

TARGET:
- ${target}

CURRENT ACTIVITY:
${JSON.stringify(currentActivity)}

RULES:
1. Output ONLY valid JSON and activities place should be in ${city}
2. Update THIS activity only
3. Keep the same time 
4. Do NOT change other activities
5. Cost must be realistic in THB
6. Use youtube_query ONLY
7. 1–5 activity_photos

OUTPUT FORMAT:
{
  "updated_activity": {
    "time": "HH:mm",
    "activity_name": STRING,
    "description": STRING,
    "cost_thb": NUMBER,
    "activity_photos": [STRING],
    "youtube_query": STRING
  }
}
`
        }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.05,
    maxOutputTokens: 6000
  }
});





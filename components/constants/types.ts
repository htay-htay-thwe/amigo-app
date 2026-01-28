export type TripSummaryItem = {
  key: string;
  label: string;
  value: string;
};

export type Activity = {
  time: string;
  activity_name: string;
  description: string;
  cost_thb: number;
  activity_photos: string[];
};

export type ItineraryDay = {
  day: number;
  theme: string;
  youtube_vlog_link?: string;
  activities: Activity[];
};

export type VisaRequirements = {
  visa_free: boolean;
  visa_type: string;
  details: string;
  visa_free_days: number;
};

export type FlightType = "Departure" | "Return";

export type SingleFlight = {
  airline: string;
  airline_logo: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  cost_thb: number;
};

// export type FlightGroup = {
//   outbound_flight: SingleFlight;
//   return_flight: SingleFlight;
// };

export type Accommodation = {
  hotel_name: string;
  address: string;
  star_rating: number;
  total_cost_thb: number;
  check_in: string;
  check_out: string;
  amenities: string[];
  hotel_photos: string[];
};


export type UserInput = {
  itinerary: ItineraryDay[];
     destination: string;
  from: string;
  to: string;
  travel_type: string;
  people: string;
  budget_limit_thb: string;
  currency: string;
  nationality: string;
  travelPlan: string;
};

export type CheckProgress = {
  departureFlight: boolean;
  returnFlight: boolean;
  accommodation: boolean;
  activities: { [dayIndex: number]: { [activityIndex: number]: boolean } };
};

export type SavedTrip = {
  id: string;
  userId: number;
  createdAt: number;
  planData: any; 
  checkProgress?: CheckProgress;
  trip_plan: {
    destination: string;
    destinationAirport?: string;
    from: string;
    to: string;
    travel_type: string;
    travelType: string;
    people: string;
    budget: string;
    budget_limit_thb: string;
    currency: string;
    nationality: string;
    travelPlan: string;
    origin?: string;
    itinerary: ItineraryDay[];
    visa_requirements: VisaRequirements;
    flights: any;
    accommodation: Accommodation;
  }
};
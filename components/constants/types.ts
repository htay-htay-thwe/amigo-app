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
};

export type FlightType = "Departure" | "Return";

export type Flight = {
  type: FlightType;
  flight_number: string;
  airline: string;
  from: string;
  to: string;
  departure_time: string;
  arrival_time: string;
  estimated_cost_thb: number;
};


export type Accommodation = {
  hotel_name: string;
  address: string;
  star_rating: number;
  total_cost_thb: number;
  check_in: string;
  check_out: string;
  amenities: string[];
};

export type UserInput = {
  image: string;
  destination: string;
  from: string;
  to: string;
  travelType: string;
  people: string;
  budget: string;
  nationality: string;
  travelPlan: string;
};

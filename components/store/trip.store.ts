import { create } from "zustand";
import type { SavedTrip } from "../constants/types";

export type TripState = {
  destination: string;
  from: string;
  to: string;
  people: string;
  currency: string;
  amount: string;
  travelType: string;
  nationality: string;
  userPrompts: string;
  saveTrip: SavedTrip[];

  setDestination: (value: string) => void;
  setDates: (from: string, to: string) => void;
  setPeople: (value: string) => void;
  setCurrency: (value: string) => void;
  setAmount: (value: string) => void;
  setTravelType: (value: string) => void;
  setNationality: (value: string) => void;
  setUserPrompts: (value: string) => void;
  setSaveTrip: (trip: SavedTrip) => void;
};

export const useTripStore = create<TripState>((set) => ({
  destination: "",
  from: "",
  to: "",
  people: "",
  currency: "",
  amount: "",
  travelType: "",
  nationality: "",
  userPrompts: "",
  saveTrip: [],

  setDestination: (value) => set({ destination: value }),
  setDates: (from, to) => set({ from, to }),
  setPeople: (value) => set({ people: value }),
  setCurrency: (value) => set({ currency: value }),
  setAmount: (value) => set({ amount: value }),
  setTravelType: (value) => set({ travelType: value }),
  setNationality: (value) => set({ nationality: value }),
  setUserPrompts: (value) => set({ userPrompts: value }),
  setSaveTrip: (trip) =>
    set((state) => ({
      saveTrip: [...state.saveTrip, trip],
    })),
}));
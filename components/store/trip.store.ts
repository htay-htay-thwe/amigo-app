import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { SavedTrip } from "../constants/types";
export type TripState = {
  origin: string;
  destination: string;
  destinationAirport: string;
  from: string;
  to: string;
  people: string;
  currency: string;
  amount: string;
  travelType: string;
  nationality: string;
  userPrompts: string;
  myPlan: SavedTrip[];
  saveTrip: SavedTrip[];

  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDestinationAirport: (value: string) => void;
  setDates: (from: string, to: string) => void;
  setPeople: (value: string) => void;
  setCurrency: (value: string) => void;
  setAmount: (value: string) => void;
  setTravelType: (value: string) => void;
  setNationality: (value: string) => void;
  setUserPrompts: (value: string) => void;
  setMyPlan: (trip: SavedTrip) => void;
  clearMyPlan: () => void;
  removePlan: (id: string) => void;
  setSaveTrip: (trip: SavedTrip) => void;
  updateSavedTrip: (id: string, updatedTrip: SavedTrip) => void;
  removeSavedTrip: (id: string) => void;
  updateTripCheckProgress: (id: string, checkProgress: any) => void;
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      origin: "",
      destination: "",
      destinationAirport: "",
      from: "",
      to: "",
      people: "",
      currency: "",
      amount: "",
      travelType: "",
      nationality: "",
      userPrompts: "",
      saveTrip: [],
      myPlan: [],

      clearMyPlan: () => set({ myPlan: [] }),
      setMyPlan: (trip) =>
        set((state) => ({
          myPlan: [...state.myPlan, trip],
        })),
      removePlan: (id) =>
        set((state) => ({
          myPlan: state.myPlan.filter((trip) => trip && trip.id !== id),
        })),
      setOrigin: (value) => set({ origin: value }),
      setDestination: (value) => set({ destination: value }),
      setDestinationAirport: (value) => set({ destinationAirport: value }),
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

      updateSavedTrip: (id, updatedTrip) => {
        set((state) => ({
          saveTrip: state.saveTrip.map((trip) => {
            if (!trip) return trip;
            return trip.id === id ? updatedTrip : trip;
          }),
        }));
      },

      removeSavedTrip: (id) =>
        set((state) => ({
          saveTrip: state.saveTrip.filter((trip) => trip && trip.id !== id),
        })),

      updateTripCheckProgress: (id, checkProgress) =>
        set((state) => ({
          myPlan: state.myPlan.map((trip) =>
            trip && trip.id === id ? { ...trip, checkProgress } : trip
          ),
        })),
    }),
    {
      name: "saved-trips-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        saveTrip: state.saveTrip,
        myPlan: state.myPlan,
      }),
    }
  )
);

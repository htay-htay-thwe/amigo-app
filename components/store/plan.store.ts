import { create } from "zustand";

type PlanState = {
  loading: boolean;
  planData: any | null;
  error: string | null;
  startPlanning: () => void;
  setPlanData: (data: any) => void;
  setErr: (msg: string) => void;
  clearPlanData: () => void;
};

export const usePlanStore = create<PlanState>((set) => ({
  loading: false,
  planData: null,
  error: null,

  startPlanning: () => set({ loading: true, error: null }),
  setPlanData: (data) => set({ planData: data, loading: false }),
  setErr: (msg) => set({ error: msg, loading: false }),
  clearPlanData: () => set({ planData: null, loading: false, error: null }),
}));

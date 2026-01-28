import { create } from "zustand";

type updateState = {
  loading: boolean;
  updateData: any | null;
  error: string | null;
  startUpdating: () => void;
  setUpdateData: (data: any) => void;
  setErr: (msg: string) => void;
  clearUpdateData: () => void;
  stopLoading: () => void;
};

export const useUpdateStore = create<updateState>((set) => ({
  loading: false,
  updateData: null,
  error: null,
  
  stopLoading: () => set({ loading: false }),
  startUpdating: () => set({ loading: true, error: null }),
  setUpdateData: (data) => set({ updateData: data, loading: false }),
  setErr: (msg) => set({ error: msg, loading: false }),
  clearUpdateData: () => set({ updateData: null, loading: false, error: null }),

}));

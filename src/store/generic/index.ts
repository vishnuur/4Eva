import { create } from "zustand";

interface genericState {
  isLoading: boolean;
  isLoadingFn: (state: boolean) => void;
}

const genericStore = create<genericState>()((set) => ({
  isLoading: false,
  isLoadingFn: (state) => set({ isLoading: state }),
}));

export default genericStore;

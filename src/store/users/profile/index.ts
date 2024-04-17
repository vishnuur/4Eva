import { create } from "zustand";

interface ProfileState {
  personalDetails: any;
  savePersonalDetails: (payload: any) => void;
}

const profileStore = create<ProfileState>()((set) => ({
  personalDetails: [],
  savePersonalDetails: (payload) => {
    set((state) => ({ personalDetails: [...state.personalDetails, payload] }));
  },
}));

export default profileStore;

import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import {
  getCastList,
  getProfileDetailsAPI,
  getReligionsList,
  saveProfileDetails,
} from "src/services/apis/users/profile";
import { create } from "zustand";

interface ProfileState {
  personalDetails: any;
  religions: any;
  caste: any;
  postProfileDetails: (payload: any) => void;
  getProfileDetails: (payload: any) => void;
  getReligion: () => void;
  getCaste: (payload: any) => void;
}

const profileStore = create<ProfileState>()((set, get) => ({
  personalDetails: {},
  religions: [],
  caste: [],
  postProfileDetails: async (payload) => {
    const result = await saveProfileDetails(payload);
    if (result.status) {
      customToast(SUCCESS, "Details Updated Success");
      get().getProfileDetails({ registerId: payload?.registerId });
    }
  },
  getProfileDetails: async (payload) => {
    const result = await getProfileDetailsAPI(payload);
    set({ personalDetails: result });
  },
  getReligion: async () => {
    const result = await getReligionsList();
    set({ religions: result?.data });
  },
  getCaste: async (payload: any) => {
    const result = await getCastList(payload);
    set({ caste: result?.data });
  },
}));

export default profileStore;

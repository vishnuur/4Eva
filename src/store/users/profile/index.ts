import { customToast } from "src/components/Toast";
import { SUCCESS } from "src/config/app.const";
import {
  getCastList,
  getProfileDetailsAPI,
  getReligionsList,
  saveProfileDetails,
} from "src/services/apis/users/profile";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface ProfileState {
  personalDetails: any;
  usersDetails: any;
  religions: any;
  caste: any;
  postProfileDetails: (payload: any) => void;
  getProfileDetails: (payload: any) => void;
  getProfileImageDetails: (payload: any) => void;
  getUsersDetails: (payload: any) => void;
  getReligion: () => void;
  getCaste: (payload: any) => void;
  setLoader: (payload: any) => void;
  isLoading: boolean;
}

const profileStore = create<ProfileState>()((set, get) => ({
  personalDetails: {},
  religions: [],
  caste: [],
  usersDetails: [],
  isLoading: false,
  postProfileDetails: async (payload) => {
    genericStore.getState().isLoadingFn(true);
    const result = await saveProfileDetails(payload);
    if (result.status) {
      customToast(SUCCESS, "Details Updated Success");
      get().getProfileDetails({ registerId: payload?.registerId });
    }
    genericStore.getState().isLoadingFn(false);
  },
  getProfileImageDetails: async (payload) => {
    const result = await getProfileDetailsAPI(payload);
    set({ personalDetails: result });
  },
  getProfileDetails: async (payload) => {
    get().setLoader(true);
    const result = await getProfileDetailsAPI(payload);
    set({ personalDetails: result });
    get().setLoader(false);
  },
  getUsersDetails: async (payload) => {
    get().setLoader(true);
    const result = await getProfileDetailsAPI(payload);
    set({ usersDetails: result });
    get().setLoader(false);
  },
  setLoader: async (payload) => {
    set({ isLoading: payload });
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

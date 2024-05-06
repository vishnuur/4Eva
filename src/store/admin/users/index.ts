import { adminListProfiles } from "src/services/apis/admin/dashboard";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface AuthState {
  usersList: any;
  totalCount: number;
  getUserList: (state: any) => void;
}

const adminUsersStore = create<AuthState>()((set) => ({
  usersList: false,
  totalCount: 0,
  getUserList: async (state) => {
    genericStore.getState().isLoadingFn(true);
    const result = await adminListProfiles(state);
    console.log(result, "userss list");
    set({ usersList: result?.result });
    set({ totalCount: result?.hits });
    genericStore.getState().isLoadingFn(false);
  },
}));

export default adminUsersStore;

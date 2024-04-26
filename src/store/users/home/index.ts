import { customToast } from "src/components/Toast";
import { ERROR } from "src/config/app.const";
import { getUsersList } from "src/services/apis/users/home";
import { create } from "zustand";

interface HomeState {
  userList: any;
  getUserList: (payload: any) => void;
}

const homeStore = create<HomeState>()((set) => ({
  userList: [],
  getUserList: async (state) => {
    const result = await getUsersList(state);
    set({ userList: result.result });
    customToast(ERROR, result.result);
  },
}));

export default homeStore;

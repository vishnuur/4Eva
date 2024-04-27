import { getUsersList } from "src/services/apis/users/home";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface HomeState {
  userList: any;
  totalCount: number;
  getUserList: (payload: any) => void;
  getUserListVirtulized: (payload: any) => void;
}

const homeStore = create<HomeState>()((set, get) => ({
  userList: [],
  totalCount: 0,
  getUserList: async (state) => {
    const result = await getUsersList(state);
    set({ userList: result.result });
    set({ totalCount: result.hits });
    // customToast(ERROR, result.result);
  },
  getUserListVirtulized: async (state) => {
    if (
      get().totalCount !== get().userList?.length &&
      state.page <= get().totalCount / state.limitBy
    ) {
      genericStore.getState().isLoadingFn(true);
      const result = await getUsersList(state);

      set({ userList: [...get().userList, ...result.result] });
      genericStore.getState().isLoadingFn(false);
    }
  },
}));

export default homeStore;

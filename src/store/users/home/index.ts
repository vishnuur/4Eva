import { getUsersList } from "src/services/apis/users/home";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface HomeState {
  userList: any;
  totalCount: number;
  listLoading: boolean;
  getUserList: (payload: any) => void;
  getUserListVirtulized: (payload: any) => void;
}

const homeStore = create<HomeState>()((set, get) => ({
  userList: [],
  totalCount: 0,
  listLoading: false,
  getUserList: async (state) => {
    set({ listLoading: true });
    const result = await getUsersList(state);
    set({ userList: result.result });
    set({ totalCount: result.hits });
    set({ listLoading: false });
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

import { customToast } from "src/components/Toast";
import { ERROR } from "src/config/app.const";
import { userLoginAPI, userRegisterAPI } from "src/services/apis/users/auth";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface AuthState {
  loginSuccess: any;
  signUpSuccess: boolean;
  onSigningUp: (state: any) => void;
  onLogingIn: (state: any) => void;
  setLoginSuccess: (state: boolean) => void;
  userId: string | number;
  setUserId: (payload: any) => void;
  isProfileCreated: boolean;
}

const authStore = create<AuthState>()((set, get) => ({
  loginSuccess: false,
  signUpSuccess: false,
  userId: "",
  isProfileCreated: false,
  onSigningUp: async (state) => {
    genericStore.getState().isLoadingFn(true);
    const result = await userRegisterAPI(state);
    if (!result.status) {
      set({ signUpSuccess: false });
      customToast(ERROR, result.result);
    } else {
      set({ signUpSuccess: true });
      get().onLogingIn(state);
    }
    genericStore.getState().isLoadingFn(false);
  },
  onLogingIn: async (state) => {
    genericStore.getState().isLoadingFn(true);
    const result = await userLoginAPI(state);
    console.log(result, "result");
    if (!result.status) {
      set({ loginSuccess: false });
      customToast(ERROR, result.result);
    } else {
      set({ userId: result?.data[0]?.userId });
      localStorage.setItem("userId", result?.data[0]?.userId);
      set({ loginSuccess: result.status });
      set({ isProfileCreated: result.Profile });
    }
    genericStore.getState().isLoadingFn(false);
  },
  setLoginSuccess: (state) => {
    set({ loginSuccess: state });
  },
  setUserId: (payload: any) => {
    set({ userId: payload });
  },
}));

export default authStore;

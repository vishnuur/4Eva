import { customToast } from "src/components/Toast";
import { ERROR } from "src/config/app.const";
import { adminLoginAPI } from "src/services/apis/admin/auth";
import genericStore from "src/store/generic";
import { create } from "zustand";

interface AuthState {
  loginSuccess: any;
  onLogingIn: (state: any) => void;
  setLoginSuccess: (state: boolean) => void;
  userToken: string | number;
  setUserToken: (payload: any) => void;
}

const adminAuthStore = create<AuthState>()((set) => ({
  loginSuccess: false,
  signUpSuccess: false,
  userToken: "",
  isProfileCreated: false,
  onLogingIn: async (state) => {
    genericStore.getState().isLoadingFn(true);
    const result = await adminLoginAPI(state);
    if (!result.status) {
      set({ loginSuccess: false });
      customToast(ERROR, result.result);
    } else {
      set({ userToken: result?.auth_token });
      localStorage.setItem("userToken", result?.auth_token);
      set({ loginSuccess: result.status });
    }
    genericStore.getState().isLoadingFn(false);
  },
  setLoginSuccess: (state) => {
    set({ loginSuccess: state });
  },
  setUserToken: (payload: any) => {
    set({ userToken: payload });
  },
}));

export default adminAuthStore;

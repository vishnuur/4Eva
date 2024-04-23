import { customToast } from "src/components/Toast";
import { ERROR } from "src/config/app.const";
import { userLoginAPI, userRegisterAPI } from "src/services/apis/users/auth";
import { create } from "zustand";

interface AuthState {
  loginSuccess: boolean;
  signUpSuccess: boolean;
  onSigningUp: (state: any) => void;
  onLogingIn: (state: any) => void;
  setLoginSuccess: (state: boolean) => void;
  userId: string | number;
  setUserId: (payload: any) => void;
}

const authStore = create<AuthState>()((set) => ({
  loginSuccess: false,
  signUpSuccess: false,
  userId: "",
  onSigningUp: async (state) => {
    const result = await userRegisterAPI(state);
    if (!result.status) {
      set({ signUpSuccess: false });
      customToast(ERROR, result.result);
    } else {
      set({ signUpSuccess: true });
    }
  },
  onLogingIn: async (state) => {
    const result = await userLoginAPI(state);
    if (!result.status) {
      set({ loginSuccess: false });
      customToast(ERROR, result.result);
    } else {
      set({ userId: result?.data[0]?.userId });
      localStorage.setItem("userId", result?.data[0]?.userId);
      set({ loginSuccess: result.status });
    }
  },
  setLoginSuccess: (state) => {
    set({ loginSuccess: state });
  },
  setUserId: (payload: any) => {
    set({ userId: payload });
  },
}));

export default authStore;

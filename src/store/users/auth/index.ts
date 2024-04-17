import { create } from "zustand";

interface AuthState {
  loginSuccess: boolean;
  onSigningUp: (state: any) => void;
  onLogingIn: (state: any) => void;
}

const authStore = create<AuthState>()((set) => ({
  loginSuccess: false,
  //   increase: (by) => set((state) => ({ bears: state.bears + by })),
  onSigningUp: (state) => {
    console.log(state);
  },
  onLogingIn: (state) => {
    console.log(state);
    set({ loginSuccess: true });
  },
}));

export default authStore;

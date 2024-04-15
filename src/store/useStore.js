import create from "zustand";

export const useStore = create((set) => ({
  mode: "student",
  userData: {
    nickname: "chan",
    id: "1",
  },
  setMode: (mode) => {
    set((state) => ({ ...state, mode: mode }));
  },
  setUserData: (user) => {
    set((state) => ({ ...state, userData: { ...state.userData, ...user } }));
  },
}));

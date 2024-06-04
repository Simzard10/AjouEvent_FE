// ../store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  savedKeyword: "",
  savedOption1: "",
  savedOption2: "아주대학교-일반",

  setSavedKeyword: (savedKeyword) => {
    set({ savedKeyword });
  },
  setSavedOption1: (savedOption1) => {
    set({ savedOption1 });
  },
  setSavedOption2: (savedOption2) => {
    set({ savedOption2 });
  },
}));

export default useStore;

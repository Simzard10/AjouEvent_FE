// ../store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  id: "",
  name: "",
  major: "",
  keyword: "",
  type: "아주대학교-일반",

  setId: (id) => {
    set({ id });
  },
  setName: (name) => {
    set({ name });
  },
  setMajor: (major) => {
    set({ major });
  },
  setKeyword: (keyword) => {
    set({ keyword });
  },
  setType: (type) => {
    set({ type });
  },
}));

export default useStore;

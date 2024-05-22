// ../store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  id: "",
  name: "",
  major: "",
  keyword: "",
  type: "",

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

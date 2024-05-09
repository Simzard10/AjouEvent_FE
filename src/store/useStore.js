// ../store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  id: "",
  name: "",
  major: "",

  setId: (id) => {
    set({ id: id });
  },
  setName: (name) => {
    set({ name: name });
  },
  setMajor: (major) => {
    set({ major: major });
  },
}));

export default useStore;

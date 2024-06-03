// ../store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  id: "",
  name: "",
  major: "",
  keyword: "",
  optionOne: "아주대 공지사항",
  optionTwo: "아주대학교-일반",

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
  setOptionOne: (optionOne) => {
    set({ optionOne });
  },
  setOptionTwo: (optionTwo) => {
    set({ optionTwo });
  },
}));

export default useStore;

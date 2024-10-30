import { create } from "zustand";

const useStore = create((set) => ({
  savedKeyword: "",
  savedOption1: "",
  savedOption2: "아주대학교-일반",
  isAuthorized: false,
  isTopicTabRead: true, 
  isKeywordTabRead: true, 
  isSubscribedTabRead: true, 

  setSavedKeyword: (savedKeyword) => {
    set({ savedKeyword });
  },
  setSavedOption1: (savedOption1) => {
    set({ savedOption1 });
  },
  setSavedOption2: (savedOption2) => {
    set({ savedOption2 });
  },
  setIsAuthorized: () => {
    set({ isAuthorized: true });
  },
  setIsTopicTabRead: (isRead) => {
    set({ isTopicTabRead: isRead });
  },
  setIsKeywordTabRead: (isRead) => {
    set({ isKeywordTabRead: isRead });
  },
  setIsSubscribedTabRead: (isRead) => {
    set({ isSubscribedTabRead: isRead });
  }
}));

export default useStore;
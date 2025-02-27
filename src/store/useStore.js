import { create } from 'zustand';
import requestWithAccessToken from '../services/jwt/requestWithAccessToken';

// useStore.js
const useStore = create((set) => ({
  savedKeyword: '',
  savedOption1: '',
  savedOption2: '아주대학교-일반',
  isAuthorized: false,
  isTopicTabRead: true,
  isKeywordTabRead: true,
  unreadNotificationCount: 0, // 푸시 알림 배지 개수 상태
  topics: [], // 사용자가 구독한 topics
  subscribeItems: [], // 구독된 항목들을 저장하는 상태 추가
  keywords: [], // 사용자가 구독한 keywords
  subscribedKeywords: [], // 구독된 키워드들을 저장하는 상태 추가

  setSubscribeItems: (items) => set({ subscribeItems: items }),

  setSubscribedKeywords: (keywords) => set({ subscribedKeywords: keywords }),

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

  // ✅ 🔹 `setUnreadNotificationCount` 추가
  setUnreadNotificationCount: (count) => set({ unreadNotificationCount: count }),

  // 안 읽은 푸시 알림 배지 개수 가져오는 함수
  fetchUnreadNotificationCount: async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/notification/unread-count`
      );
      set({ unreadNotificationCount: response.data.unreadNotificationCount });

      if (navigator.setAppBadge) {
        navigator.setAppBadge(response.data.unreadNotificationCount).catch(console.error);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  },

  // 특정 토픽을 읽음 상태로 변경하고 전체 읽음 상태를 갱신하는 함수
  markTopicAsRead: async (topic) =>
    set(async (state) => {
      const updatedItems = state.subscribeItems.map((item) =>
        item.englishTopic === topic ? { ...item, isRead: true } : item,
      );

      // 모든 항목이 읽음 상태인지 확인하여 isTopicTabRead를 갱신
      const allTopicsRead = updatedItems.every((item) => item.isRead === true);

      // 상태 업데이트
      set({
        subscribeItems: updatedItems,
        isTopicTabRead: allTopicsRead,
      });

      // 모든 항목이 읽음 상태일 경우 서버에 읽음 상태 업데이트
      if (allTopicsRead && !state.isTopicTabRead) {
        try {
          await requestWithAccessToken(
            'post',
            `${process.env.REACT_APP_BE_URL}/api/event/updateTopicTabRead`,
          );
        } catch (error) {
          console.error(
            'Error updating topic read status on the server:',
            error,
          );
        }
      }
    }),

  // 특정 토픽을 읽음 상태로 변경하고 전체 읽음 상태를 갱신하는 함수
  markKeywordAsRead: async (keyword) =>
    set(async (state) => {
      const updatedItems = state.subscribedKeywords.map((item) =>
        item.encodedKeyword === keyword.encodedKeyword
          ? { ...item, isRead: true }
          : item,
      );

      // 모든 항목이 읽음 상태인지 확인하여 isTopicTabRead를 갱신
      const allKeywordsRead = updatedItems.every(
        (item) => item.isRead === true,
      );

      // 상태 업데이트
      set({
        subscribedKeywords: updatedItems,
        isKeywordTabRead: allKeywordsRead,
      });

      // 모든 항목이 읽음 상태일 경우 서버에 읽음 상태 업데이트
      if (allKeywordsRead && !state.isKeywordTabRead) {
        // 중복 API 호출 방지
        try {
          await requestWithAccessToken(
            'post',
            `${process.env.REACT_APP_BE_URL}/api/event/updateKeywordTabRead`,
          );
        } catch (error) {
          console.error(
            'Error updating keyword read status on the server:',
            error,
          );
        }
      }
    }),

  updateTopicReadStatus: (topics) => {
    const allTopicsRead = topics.every((topic) => topic.isRead);
    set({ isTopicTabRead: allTopicsRead });
  },

  updateKeywordReadStatus: (keywords) => {
    const allKeywordsRead = keywords.every((keyword) => keyword.isRead);
    set({ isKeywordTabRead: allKeywordsRead });
  },

  // 읽음 상태 업데이트
  setIsTopicTabRead: async (isRead) => {
    set({ isTopicTabRead: isRead });
    if (isRead) {
      await requestWithAccessToken(
        'post',
        `${process.env.REACT_APP_BE_URL}/api/event/updateTopicTabRead`,
      );
    }
  },

  setIsKeywordTabRead: async (isRead) => {
    set({ isKeywordTabRead: isRead });
    if (isRead) {
      await requestWithAccessToken(
        'post',
        `${process.env.REACT_APP_BE_URL}/api/event/updateKeywordTabRead`,
      );
    }
  },

  // setIsSubscribedTabRead: (isRead) => set({ isSubscribedTabRead: isRead }),

  // 모든 topic의 읽음 상태 확인 및 구독 탭 뱃지 업데이트
  updateTopicReadStatus: (topics) => {
    const allTopicsRead = topics.every((topic) => topic.isRead);
    set({ isTopicTabRead: allTopicsRead });
  },

  updateKeywordReadStatus: (keywords) => {
    const allKeywordsRead = keywords.every((keyword) => keyword.isRead);
    set({ isKeywordTabRead: allKeywordsRead });
  },

  // 구독 상태 불러오기
  fetchMemberStatus: async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/event/readStatus`,
      );
      set({
        isTopicTabRead: response.data.isTopicTabRead,
        isKeywordTabRead: response.data.isKeywordTabRead,
        // isSubscribedTabRead: response.data.isTopicTabRead && response.data.isKeywordTabRead,
      });
    } catch (error) {
      console.error('Error fetching read status', error);
    }
  },

  // 사용자가 구독한 topic 목록 가져오기
  fetchSubscribedTopics: async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/topic/subscriptions`,
      );
      const topics = response.data;
      set({ topics }); // 상태에 구독한 topic 설정
    } catch (error) {
      console.error('Error fetching subscribed topics', error);
    }
  },

  fetchSubscribedKeywords: async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/keyword/userKeywords`,
      );
      const keywords = response.data;
      set({ subscribedKeywords: keywords });
    } catch (error) {
      console.error('Error fetching subscribed keywords', error);
    }
  },

  // 구독 항목을 서버에서 불러오는 함수
  fetchSubscribeItems: async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/topic/subscriptions`,
      );
      const topics = response.data;
      set({ subscribeItems: topics });
    } catch (error) {
      console.error('Error fetching subscribe items:', error);
    }
  },

  // 토픽 구독 및 구독 취소
  subscribeToTopic: async (topic) => {
    try {
      await requestWithAccessToken(
        'post',
        `${process.env.REACT_APP_BE_URL}/api/topic/subscribe`,
        { topic },
      );
      set((state) => ({
        topics: state.topics.map((t) =>
          t.englishTopic === topic ? { ...t, subscribed: true } : t,
        ),
      }));
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  },

  unsubscribeFromTopic: async (topic) => {
    try {
      await requestWithAccessToken(
        'post',
        `${process.env.REACT_APP_BE_URL}/api/topic/unsubscribe`,
        { topic },
      );
      set((state) => ({
        topics: state.topics.map((t) =>
          t.englishTopic === topic ? { ...t, subscribed: false } : t,
        ),
      }));
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  },
}));

export default useStore;

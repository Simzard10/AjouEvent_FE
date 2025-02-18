import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteChangeTracker from './RouteChangeTracker';
import { Analytics } from '@vercel/analytics/react';
import useStore from './store/useStore';
import HomePage from './pages/homePage/HomePage';
import SearchEventPage from './pages/searchPage/SearchEventPage';
import EventDetailPage from './pages/eventPage/EventDetailPage';
import LoginPage from './pages/loginPage/LoginPage';
import MyPage from './pages/myPage/MyPage';
import LikedEventPage from './pages/likedPage/LikedEventPage';
import SubscribePage from './pages/subscribePage/SubscribePage';
import KeywordSubscribePage from './pages/subscribePage/KeywordSubscribePage';
import LoginSuccess from './pages/loginPage/LoginSuccess';
import GuidePage from './pages/GuidePage';
import ProfileModificationPage from './pages/myPage/ProfileModificationPage';
import DeleteAccountPage from './pages/myPage/DeleteAccountPage';
import SignUpSelectPage from './pages/signupPage/SignUpSelectPage';
import RegisterMemberInfoPage from './pages/signupPage/RegisterMebmerInfoPage';
import PrivacyAgreementPage from './pages/signupPage/PrivacyAgreementPage';
import NotificationPage from './pages/notificationPage/NotificationPage';
import requestWithAccessToken from '../src/services/jwt/requestWithAccessToken';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/notification',
    element: <NotificationPage />,
  },
  {
    path: '/event',
    element: <SearchEventPage />,
  },
  {
    path: '/event/:id',
    element: <EventDetailPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/privacy-agreement',
    element: <PrivacyAgreementPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/liked',
    element: <LikedEventPage />,
  },
  {
    path: '/subscribe',
    element: <SubscribePage />,
  },
  {
    path: '/subscribe/keywordSubscribe',
    element: <KeywordSubscribePage />,
  },
  {
    path: '/loginSuccess',
    element: <LoginSuccess />,
  },
  {
    path: '/guide',
    element: <GuidePage />,
  },
  {
    path: '/profile-modification',
    element: <ProfileModificationPage />,
  },
  {
    path: '/delete-account',
    element: <DeleteAccountPage />,
  },
  {
    path: '/register-info',
    element: <RegisterMemberInfoPage />,
  },
  {
    path: '/signUp/select',
    element: <SignUpSelectPage />,
  },
]);

function App() {
  const { unreadNotificationCount, fetchUnreadNotificationCount } = useStore();

  // 최초 렌더링 시 안읽은 푸시 알림 개수 가져오기
  useEffect(() => {
    fetchUnreadNotificationCount();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.type === "updateBadge") {
          fetchUnreadNotificationCount(); // 서비스워커 이벤트가 발생하면, 알림 개수 다시 불러오기
        }
      });
    }
  }, []);
  
  return (
    <div className="App">
      <RouterProvider router={ROUTER}>
        <RouteChangeTracker />
      </RouterProvider>
      <Analytics />
    </div>
  );
}

export default App;

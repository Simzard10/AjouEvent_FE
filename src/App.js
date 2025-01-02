import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteChangeTracker from './RouteChangeTracker';
import { Analytics } from '@vercel/analytics/react';
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

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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

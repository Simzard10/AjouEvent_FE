import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import SearchEventPage from "./searchPage/SearchEventPage";
import SubscribePage from "./subscribePage/SubscribePage";
import KeywordSubscribePage from "./subscribePage/KeywordSubscribePage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginSuccess from "./loginPage/LoginSuccess";
import MyPage from "./pages/MyPage";
import LikedEventPage from "./likedPage/LikedEventPage";
import HomePage from "./homePage/HomePage";
import GuidePage from "./pages/GuidePage";
import RouteChangeTracker from "./RouteChangeTracker";
import PrivacyAgreementPage from "./pages/PrivacyAgreementPage";
import { Analytics } from '@vercel/analytics/react';
import ProfileModificationPage from "./pages/ProfileModificationPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import RegisterMebmerInfoPage from "./pages/RegisterMebmerInfoPage";
import SignUpSelectPage from "./pages/SignUpSelectPage";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/event",
    element: <SearchEventPage />,
  },
  {
    path: "/event/:id",
    element: <EventDetailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/privacy-agreement",
    element: <PrivacyAgreementPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/liked",
    element: <LikedEventPage />,
  },
  {
    path: "/subscribe",
    element: <SubscribePage />,
  },
  {
    path: "/subscribe/keywordSubscribe",
    element: <KeywordSubscribePage />,
  },
  {
    path: "/loginSuccess",
    element: <LoginSuccess />,
  },
  {
    path: "/guide",
    element: <GuidePage />,
  },
  {
    path: "/profile-modification",
    element: <ProfileModificationPage />,
  },
  {
    path: "/delete-account",
    element: <DeleteAccountPage />,
  },
  {
    path: "/register-info",
    element: <RegisterMebmerInfoPage />,
  },
  {
    path: "/signUp/select",
    element: <SignUpSelectPage />,
  }
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

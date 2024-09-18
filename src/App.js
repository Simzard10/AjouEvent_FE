import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import SearchEventPage from "./searchPage/SearchEventPage";
import SignUpPage from "./pages/SignUpPage";
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
import FindPasswordPage from "./pages/FindPasswordPage";
import { Analytics } from '@vercel/analytics/react';
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PasswordConfirmationPage from "./pages/PasswordConfirmationPage";
import ProfileModificationPage from "./pages/ProfileModificationPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";

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
    path: "/signUp",
    element: <SignUpPage />,
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
    path: "/findPassword",
    element: <FindPasswordPage />,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/password-confirmation",
    element: <PasswordConfirmationPage />,
  },
  {
    path: "/profile-modification",
    element: <ProfileModificationPage />,
  },
  {
    path: "/delete-account",
    element: <DeleteAccountPage />,
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

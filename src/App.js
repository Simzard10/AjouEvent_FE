import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SearchEventPage from "./searchPage/SearchEventPage";
import SignUpPage from "./pages/SignUpPage";
import SubscribePage from "./pages/SubscribePage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginSuccess from "./login/LoginSuccess";
import MyPage from "./pages/MyPage";
import LikedEventPage from "./likedPage/LikedEventPage";
import HomePage from "./pages/HomePage";

//Google Analytics
import ReactGA from "react-ga";

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

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
    path: "/signIn",
    element: <SignInPage />,
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
    path: "/loginSuccess",
    element: <LoginSuccess />,
  },
  {
    path: "/subscribe",
    element: <SubscribePage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={ROUTER} />
    </div>
  );
}

export default App;

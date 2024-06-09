import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import SearchEventPage from "./searchPage/SearchEventPage";
import SignUpPage from "./pages/SignUpPage";
import SubscribePage from "./subscribePage/SubscribePage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginSuccess from "./loginPage/LoginSuccess";
import MyPage from "./pages/MyPage";
import LikedEventPage from "./likedPage/LikedEventPage";
import HomePage from "./homePage/HomePage";
import GuidePage from "./pages/GuidePage";
import RouteChangeTracker from "./RouteChangeTracker";

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
    path: "/loginSuccess",
    element: <LoginSuccess />,
  },
  {
    path: "/guide",
    element: <GuidePage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={ROUTER}>
        <RouteChangeTracker />
      </RouterProvider>
    </div>
  );
}

export default App;

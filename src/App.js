import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import EventPage from "./pages/EventPage";
import SignUpPage from "./pages/SignUpPage";
import SubscribePage from "./pages/SubscribePage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginSuccess from "./login/LoginSuccess";
import MyPage from "./pages/MyPage";
import SavedEventPage from "./pages/SavedEventPage";
import EventUpload from "./events/EventUpload";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <EventPage />,
  },
  {
    path: "/:id",
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
    path: "/saved",
    element: <SavedEventPage />,
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

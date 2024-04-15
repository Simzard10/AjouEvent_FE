// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import EventPage from "./pages/EventPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
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
    path: "/events",
    element: <EventPage />,
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;

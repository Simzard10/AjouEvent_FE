import React from "react";
import SignIn from "../components/SignIn";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import BottomNavbar from "../components/BottomNavbar";
const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
  width: 100vw;
  overflow-x: hidden;
`;

export default function SignInPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <SignIn></SignIn>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

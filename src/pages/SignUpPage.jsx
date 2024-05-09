import React from "react";
import SignUp from "../components/SignUp";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import BottomNavbar from "../components/BottomNavbar";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export default function SignUpPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <SignUp></SignUp>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

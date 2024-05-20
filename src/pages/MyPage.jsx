import React, { useEffect } from "react";
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

export default function MyPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <p>MyPage</p>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

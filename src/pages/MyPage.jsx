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
  let accessToken = localStorage.getItem("accessToken");
  return (
    <AppContaioner>
      <TopBar></TopBar>
      {accessToken ? <p>MyPage</p> : <p>로그인이 필요한 서비스입니다.</p>}
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

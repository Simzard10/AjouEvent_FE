import React, { useEffect } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetFCMToken from "../fcm/GetFCMToken";
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

export default function MainPage() {
  const navigate = useNavigate();
  const handleBtnClick = async () => {
    navigate("/event");
  };

  return (
    <AppContaioner>
      <TopBar></TopBar>
      <p>임시 구독 페이지</p>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

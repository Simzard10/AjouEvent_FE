import React, { useEffect } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import BottomNavbar from "../components/BottomNavbar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";
import GetFCMToken from "../fcm/GetFCMToken";

const AppContaioner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const MainContentContaioner = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  padding: 80px 0 80px 0;
`;

export default function EventPage() {
  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한이 허용됨");
        try {
          await GetFCMToken();
        } catch (error) {
          console.error("토큰을 가져오는 도중 오류가 발생했습니다:", error);
        }
      } else {
        console.log("알림 권한 허용 안됨");
      }
    }
    requestPermission();
  }, []);
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <MainContentContaioner>
        <SearchDropBox></SearchDropBox>
        <SearchBar></SearchBar>
        <EventMain></EventMain>
      </MainContentContaioner>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

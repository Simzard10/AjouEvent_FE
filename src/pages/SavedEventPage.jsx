import React, { useEffect } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventSaved from "../events/EventSaved";
import BottomNavbar from "../components/BottomNavbar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";
import GetUserPermission from "../fcm/GetUserPermission";

const AppContaioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function SavedEventPage() {
  useEffect(() => {
    GetUserPermission();
  }, []);
  let accessToken = localStorage.getItem("accessToken");

  return (
    <AppContaioner>
      <TopBar />
      {accessToken ? (
        <MainContentContaioner>
          <SearchDropBox />
          <SearchBar />
          <EventSaved />
        </MainContentContaioner>
      ) : (
        <p>로그인이 필요한 서비스 입니다</p>
      )}
      <BottomNavbar />
    </AppContaioner>
  );
}

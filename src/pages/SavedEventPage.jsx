import React, { useEffect } from "react";
import styled from "styled-components";
import EventSaved from "../events/EventSaved";
import NavigationBar from "../components/NavigationBar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";
import GetUserPermission from "../fcm/GetUserPermission";
import LocationBar from "../components/LocationBar";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const Contaioner = styled.div`
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
  padding: 0 0 80px 0;
`;

export default function SavedEventPage() {
  useEffect(() => {
    GetUserPermission();
  }, []);
  let accessToken = localStorage.getItem("accessToken");

  return (
    <AppContaioner>
      {accessToken ? (
        <MainContentContaioner>
          <LocationBar location="내가 찜한 이벤트"></LocationBar>
          <SearchDropBox />
          <SearchBar />
          <EventSaved />
        </MainContentContaioner>
      ) : (
        <Contaioner>
          <p>로그인이 필요한 서비스입니다</p>
        </Contaioner>
      )}
      <NavigationBar />
    </AppContaioner>
  );
}

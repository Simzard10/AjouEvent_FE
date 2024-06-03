import React, { useEffect } from "react";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import NavigationBar from "../components/NavigationBar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";
import GetUserPermission from "../fcm/GetUserPermission";

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
    GetUserPermission();
  }, []);

  return (
    <AppContaioner>
      <MainContentContaioner>
        <SearchDropBox />
        <SearchBar />
        <EventMain />
      </MainContentContaioner>
      <NavigationBar />
    </AppContaioner>
  );
}

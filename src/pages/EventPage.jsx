import React from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import BottomNavbar from "../components/BottomNavbar";
import SearchDropBox from "../events/SearchDropBox";

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
  align-items: center;
  flex-direction: column;
  padding: 80px 0 80px 0;
`;

export default function EventPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <MainContentContaioner>
        <SearchDropBox></SearchDropBox>
        <EventMain></EventMain>
      </MainContentContaioner>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

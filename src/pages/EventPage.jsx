import React, { useState } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import BottomNavbar from "../components/BottomNavbar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";

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
  const [events, setEvents] = useState([]);
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <MainContentContaioner>
        <SearchDropBox setEvents={setEvents}></SearchDropBox>
        <SearchBar setEvents={setEvents}></SearchBar>
        <EventMain events={events} setEvents={setEvents}></EventMain>
      </MainContentContaioner>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

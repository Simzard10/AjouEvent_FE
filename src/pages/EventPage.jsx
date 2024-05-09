import React from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import BottomNavbar from "../components/BottomNavbar";

const AppContaioner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
`;

export default function EventPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <EventMain></EventMain>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

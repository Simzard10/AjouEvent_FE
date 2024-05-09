import React from "react";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import BottomNavbar from "../components/BottomNavbar";
import EventDetail from "../events/EventDetail";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
`;

export default function EventDetailPage() {
  return (
    <AppContaioner>
      <TopBar></TopBar>
      <EventDetail></EventDetail>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

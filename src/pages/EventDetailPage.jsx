import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import EventDetail from "../events/EventDetail";

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

export default function EventDetailPage() {
  return (
    <AppContaioner>
      <EventDetail></EventDetail>
      <NavigationBar></NavigationBar>
    </AppContaioner>
  );
}

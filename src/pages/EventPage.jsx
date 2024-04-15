import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EventMain from "../events/EventMain";

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
      <LandingNavbar></LandingNavbar>
      <EventMain></EventMain>
    </AppContaioner>
  );
}

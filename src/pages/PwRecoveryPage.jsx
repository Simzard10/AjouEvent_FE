import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import styled from "styled-components";
import PwRecovery from "../components/PwRecovery";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100vh;
  overflow-y: hidden;
`;

export default function PwRecoveryPage() {
  return (
    <AppContaioner>
      <LandingNavbar></LandingNavbar>
      <PwRecovery></PwRecovery>
    </AppContaioner>
  );
}

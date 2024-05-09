import React from "react";
import TopBar from "../components/TopBar";
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
      <TopBar></TopBar>
      <PwRecovery></PwRecovery>
    </AppContaioner>
  );
}

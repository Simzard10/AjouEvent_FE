import React from "react";
import styled from "styled-components";
import TabBar from "../components/TabBar";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  overflow: auto;
`;

export default function GuidePage() {
  return (
    <AppContaioner>
      <TabBar Title={`사용 가이드 ver.0.0.3`} />
      <img
        alt="IOSInstall"
        src={`${process.env.PUBLIC_URL}/image/installIOS.svg`}
      ></img>
      <img
        alt="AndroidInstall"
        src={`${process.env.PUBLIC_URL}/image/installAndriod.svg`}
      ></img>
      <hr />
    </AppContaioner>
  );
}

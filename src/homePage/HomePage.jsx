import React, { useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GetUserPermission from "../fcm/GetUserPermission";
import LocationBar from "../components/LocationBar";
import HomeBanner from "./HomeBanner";
import HomeHotEvent from "./HomeHotEvent";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
`;

const MainContentContaioner = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  padding: 0 0 80px 0;
`;

export default function HomePage() {
  useEffect(() => {
    GetUserPermission();
  }, []);

  return (
    <AppContaioner>
      <MainContentContaioner>
        <HomeBanner />
        <LocationBar location="이번주 인기글" />
        <HomeHotEvent />
      </MainContentContaioner>
      <NavigationBar></NavigationBar>
    </AppContaioner>
  );
}

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

export default function HomePage() {
  useEffect(() => {
    GetUserPermission();
  }, []);

  return (
    <AppContaioner>
      <HomeBanner />
      <LocationBar location="이번주 인기글" />
      <HomeHotEvent />
      <NavigationBar></NavigationBar>
    </AppContaioner>
  );
}

import React, { useEffect } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GetUserPermission from "../fcm/GetUserPermission";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      <p>homepage</p>
      <NavigationBar></NavigationBar>
    </AppContaioner>
  );
}

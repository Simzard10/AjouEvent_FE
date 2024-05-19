import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import EventMain from "../events/EventMain";
import BottomNavbar from "../components/BottomNavbar";
import SearchDropBox from "../events/SearchDropBox";
import SearchBar from "../components/SearchBar";

const AppContaioner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const MainContentContaioner = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  flex-direction: column;
  padding: 80px 0 80px 0;
`;

export default function EventPage() {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("아주대학교-일반");

  return (
    <AppContaioner>
      <TopBar></TopBar>
      <MainContentContaioner>
        <SearchDropBox type={type} setType={setType}></SearchDropBox>
        <SearchBar keyword={keyword} setKeyword={setKeyword}></SearchBar>
        <EventMain keyword={keyword} type={type}></EventMain>
      </MainContentContaioner>
      <BottomNavbar></BottomNavbar>
    </AppContaioner>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GetUserPermission from "../fcm/GetUserPermission";
import LocationBar from "../components/LocationBar";
import HomeBanner from "./HomeBanner";
import HomeHotEvent from "./HomeHotEvent";
import DailyModal from "../components/DailyModal";
import HelpBox from "../components/HelpBox";
import { redirect } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
`;

const MainContentContainer = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  padding: 0 0 80px 0;
`;

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    GetUserPermission();

    // Check if the app is running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWAInstalled(true);
      return;
    }

    const dismissedUntil = localStorage.getItem("modalDismissedUntil");
    if (dismissedUntil) {
      const now = new Date();
      if (new Date(dismissedUntil) > now) {
        return;
      }
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the default mini-infobar from appearing on mobile
      e.preventDefault();
      // Check if the prompt is available
      if (!isPWAInstalled) {
        setShowModal(true);
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, [isPWAInstalled]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const images = [
    {
      src: `${process.env.PUBLIC_URL}/icons/TestBanner0.png`,
      url: "https://ace.ajou.ac.kr/ace/paran/meeting.do?mode=view&articleNo=318550&article.offset=12&articleLimit=12#!/list",
    },
    {
      src: `${process.env.PUBLIC_URL}/icons/TestBanner1.png`,
      url: "https://ace.ajou.ac.kr/ace/paran/meeting.do?mode=view&articleNo=318550&article.offset=12&articleLimit=12#!/list",
    },
    {
      src: `${process.env.PUBLIC_URL}/icons/TestBanner2.png`,
      url: "https://ace.ajou.ac.kr/ace/paran/meeting.do?mode=view&articleNo=318550&article.offset=12&articleLimit=12#!/list",
    },
  ];

  return (
    <AppContainer>
      <MainContentContainer>
        <HelpBox />
        <HomeBanner images={images} />
        <LocationBar location="이번주 인기글" />
        <HomeHotEvent />
      </MainContentContainer>
      <NavigationBar />
      {showModal && <DailyModal onClose={handleCloseModal} />}
    </AppContainer>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GetUserPermission from "../fcm/GetUserPermission";
import LocationBar from "../components/LocationBar";
import HomeBanner from "./HomeBanner";
import HomeHotEvent from "./HomeHotEvent";
import DailyModal from "../components/DailyModal";
import HelpBox from "../components/HelpBox";

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

  return (
    <AppContainer>
      <MainContentContainer>
        <HelpBox />
        <HomeBanner />
        <LocationBar location="이번주 인기글" />
        <HomeHotEvent />
      </MainContentContainer>
      <NavigationBar />
      {showModal && <DailyModal onClose={handleCloseModal} />}
    </AppContainer>
  );
}

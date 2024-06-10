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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  z-index: 1000;
`;

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetUserPermission(setIsLoading);
  }, []);

  useEffect(() => {
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
      {isLoading && <LoadingOverlay>알림 서비스 등록 중 ...</LoadingOverlay>}
      <MainContentContainer>
        <HelpBox setIsLoading={setIsLoading} />
        <HomeBanner images={images} />
        <LocationBar location="이번주 인기글" />
        <HomeHotEvent />
      </MainContentContainer>
      <NavigationBar />
      {showModal && <DailyModal onClose={handleCloseModal} />}
    </AppContainer>
  );
}

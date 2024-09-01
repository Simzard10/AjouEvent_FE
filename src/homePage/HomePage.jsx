import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import GetUserPermission from "../fcm/GetUserPermission";
import LocationBar from "../components/LocationBar";
import HomeBanner from "./HomeBanner";
import HomeHotEvent from "./HomeHotEvent";
import DailyModal from "../components/DailyModal";
import HelpBox from "../components/HelpBox";
import PWAPrompt from 'react-ios-pwa-prompt';

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

// Style for the push notification prompt
const PushNotificationPromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  text-align: center;
`;

const PushNotificationPromptButton = styled.button`
  background-color: #0A5cA8;  // Changed color to #0A5cA8
  color: #fff;
  padding: 15px 50px;  // Increase the padding to make the button longer
  font-size: 18px;
  border: none;
  border-radius: 25px;  // Rounded corners
  cursor: pointer;
  margin-top: 20px;
  width: 80%;  // Make the button take up more horizontal space
  max-width: 300px;
`;

const LaterOption = styled.div`
  margin-top: 20px;
  color: #808080;  // Gray color for the text
  text-decoration: underline;
  cursor: pointer;
`;

const BellIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;  // Add margin to create space between the icon and the heading
`;

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerImages, setBannerImages] = useState([]);
  const [isIOS, setIsIOS] = useState(false); // iOS 장치 여부 상태 추가
  const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false);
  const [showPushNotificationPrompt, setShowPushNotificationPrompt] = useState(false); // State for showing push notification prompt

  // useEffect(() => {
  //   GetUserPermission(setIsLoading);
  // }, []);

  useEffect(() => {
    const fetchBannerImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/event/banner`);
        const data = await response.json();
        setBannerImages(data);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerImages();
  }, []);

  useEffect(() => {
    // iOS 장치 여부 확인
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream;
    setIsIOS(isDeviceIOS);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsPWAInstalled(true);

      // Check if it's the first time opening the PWA
      const isFirstTimeOpen = localStorage.getItem('isFirstTimeOpen');
      if (!isFirstTimeOpen) {
        setShowPushNotificationPrompt(true);
        localStorage.setItem('isFirstTimeOpen', 'false'); // Mark as opened
      }
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
      e.preventDefault();
      if (!isPWAInstalled) {
        setShowModal(true);
      }
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, [isPWAInstalled]);

  useEffect(() => {
    // iOS 장치인 경우에만 PWA 프롬프트를 표시
    if (isIOS) {
      setShouldShowPWAPrompt(true);
    }
  }, [isIOS]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAllowNotifications = () => {
    GetUserPermission(setIsLoading);
    setShowPushNotificationPrompt(false); // Hide the prompt after getting permission
  };

  return (
    <AppContainer>
      {isLoading && <LoadingOverlay>알림 서비스 등록 중 ...</LoadingOverlay>}
      
      {showPushNotificationPrompt ? (
        <PushNotificationPromptContainer>
          <BellIcon
            alt="알람"
            src={`${process.env.PUBLIC_URL}/icons/notiOn.svg`}
          />
          <h1>푸시 알림 받기</h1>
          <p>푸시 알림 구독하고 릴로 PWA의 소식을 가장 먼저 받아보세요!</p>
          <PushNotificationPromptButton onClick={handleAllowNotifications}>
            알림 받기
          </PushNotificationPromptButton>
          <LaterOption onClick={() => setShowPushNotificationPrompt(false)}>
            나중에 받을게요
          </LaterOption>
        </PushNotificationPromptContainer>
      ) : (
        <MainContentContainer>
          <HelpBox setIsLoading={setIsLoading} />
          <HomeBanner images={bannerImages} />
          <LocationBar location="이번주 인기글" />
          <HomeHotEvent />
        </MainContentContainer>
      )}
      
      <NavigationBar />
      {showModal && <DailyModal onClose={handleCloseModal} />}
      {/* iOS 장치라면 PWAPrompt 표시 */}
      {isIOS && (
        <PWAPrompt 
          promptOnVisit={1} 
          timesToShow={1}
          copyTitle="AjouEvent 앱 설치하기 - 아이폰"
          copySubtitle="홈 화면에 앱을 추가하고 각종 공지사항, 키워드 알림을 받아보세요."
          copyDescription="AjouEvent는 앱설치 없이 홈화면에 추가를 통해 사용할 수 있습니다. 홈화면에 추가된 앱을 실행한 뒤 알림 허용을 누르시면 됩니다!"
          copyShareStep="하단 메뉴에서 '공유' 아이콘을 눌러주세요.(크롬은 상단)"
          copyAddToHomeScreenStep="아래의 '홈 화면에 추가' 버튼을 눌러주세요."
          appIconPath="https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png"
          isShown={shouldShowPWAPrompt} 
        />
      )}
    </AppContainer>
  );
}
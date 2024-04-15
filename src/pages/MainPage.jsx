import React, { useEffect } from "react";
import LandingNavbar from "../components/LandingNavbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetFCMToken from "../fcm/GetFCMToken";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
`;

export default function MainPage() {
  const navigate = useNavigate();
  const handleBtnClick = async () => {
    navigate("/events");
  };

  useEffect(() => {
    async function requestPermission() {
      console.log("권한 요청 중...");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("알림 권한이 허용됨");
        try {
          await GetFCMToken();
        } catch (error) {
          console.error("토큰을 가져오는 도중 오류가 발생했습니다:", error);
        }
      } else {
        console.log("알림 권한 허용 안됨");
      }
    }
    requestPermission();
  }, []);

  return (
    <AppContaioner>
      <LandingNavbar></LandingNavbar>
      <p>임시 메인페이지</p>
      <button onClick={handleBtnClick}> 이벤트 조회페이지로 이동</button>
    </AppContaioner>
  );
}
import React from "react";
import styled from "styled-components";
import GetUserPermission from "../fcm/GetUserPermission";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StickyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  top: 0;
  gap: 6px;
  z-index: 100;
  padding: 10px;
`;

const TapIcon = styled.img`
  aspect-ratio: 1;
  width: 40px;
  object-fit: cover;
  object-position: center;
  opacity: 0.75;
  cursor: pointer; /* 클릭 가능한 아이콘 표시 */
`;

const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const HelpBox = () => {
  const navigate = useNavigate();
  const handleBellClick = () => {
    Toast.fire({
      icon: "success",
      title: `알림 설정 요청`,
    });
    GetUserPermission();
  };
  const handleInstallClicked = () => {
    navigate("/guide");
  };
  return (
    <StickyContainer>
      <TapIcon
        onClick={handleBellClick}
        loading="lazy"
        src={`${process.env.PUBLIC_URL}/icons/notiOn.svg`}
        alt="bellIcon"
      />

      <TapIcon
        onClick={handleInstallClicked}
        loading="lazy"
        src={`${process.env.PUBLIC_URL}/icons/InstallAppOn.svg`}
        alt="installIcon"
      />
    </StickyContainer>
  );
};

export default HelpBox;

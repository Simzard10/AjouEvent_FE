import React from 'react';
import styled from 'styled-components';
import GetUserPermission from '../services/fcm/GetUserPermission';
import { useNavigate } from 'react-router-dom';

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

const HelpBox = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const handleBellClick = () => {
    navigate('/notification');
  };
  const handleInstallClicked = () => {
    navigate('/guide');
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

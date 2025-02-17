import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

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

const TapIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TapIcon = styled.img`
  aspect-ratio: 1;
  width: 40px;
  object-fit: cover;
  object-position: center;
  opacity: 0.75;
  cursor: pointer;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  font-size: 8px;
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 50%;
  min-width: 15px;
  min-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HelpBox = () => {
  const navigate = useNavigate();
  const { unreadNotificationCount, fetchUnreadNotificationCount } = useStore();

  useEffect(() => {
    fetchUnreadNotificationCount(); // 처음 마운트될 때 최신 알림 개수 가져오기
  }, []);

  const handleBellClick = () => {
    navigate('/notification');
  };

  const handleInstallClicked = () => {
    navigate('/guide');
  };

  return (
    <StickyContainer>
      <TapIconContainer onClick={handleBellClick}>
        <TapIcon
          loading="lazy"
          src={`${process.env.PUBLIC_URL}/icons/notiOn.svg`}
          alt="bellIcon"
        />
        {unreadNotificationCount > 0 && <Badge>{unreadNotificationCount}</Badge>}
      </TapIconContainer>

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
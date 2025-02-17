import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TabBar from '../../components/TabBar';
import NotificationCard from './NotificationCard';
import { useNavigate } from 'react-router-dom';
import requestWithAccessToken from '../../services/jwt/requestWithAccessToken';
import { use } from 'react';
import useStore from '../../store/useStore';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  min-height: 100vh;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(239, 237, 239, 0.2);
`;

const TabButton = styled.button`
  flex: 1;
  padding: 16px;
  text-align: center;
  font-size: 1.125rem;
  font-family: 'Pretendard Variable';
  font-weight: 600;
  border: none;
  background: none;
  color: ${(props) => (props.$active ? 'black' : 'gray')};
  cursor: pointer;
  border-bottom: ${(props) =>
    props.$active ? '2px solid black' : '1px solid gray'};
  transition: color 0.3s ease-in-out;
`;

const TabContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const KeywordCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const KeywordRegistrationBanner = styled.div`
  display: flex;
  padding: 16px;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.05);
  justify-content: space-between;
  align-items: center;
  font-family: 'Pretendard Variable';
  font-size: 18px;
  font-weight: 600;
`;

const StyledButton = styled.button`
  background-color: #0a5ca8;
  color: #fff;
  padding: 4px 14px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Pretendard Variable';
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #1a4f8b;
  }
`;

const BellIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 600;
  color: gray;
  padding: 16px;
`;

const NotificationPage = () => {
  const { fetchUnreadNotificationCount } = useStore();
  const [activeTab, setActiveTab] = useState('topic');
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keywordCount, setKeywordCount] = useState(0);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = useCallback(async () => {
    if (!hasNext && page !== 0) return; // page === 0일 때는 무조건 실행
    try {
      setLoading(true);
      let apiUrl =
        activeTab === "topic"
          ? `${process.env.REACT_APP_BE_URL}/api/notification/topic?page=${page}&size=10`
          : `${process.env.REACT_APP_BE_URL}/api/notification/keyword?page=${page}&size=10`;

      const response = await requestWithAccessToken("get", apiUrl);
      console.log("Notification response:", response);

      setNotifications((prevNotifications) =>
        page === 0 ? response.data.result : [...prevNotifications, ...response.data.result]
      );

      setHasNext(response.data.hasNext);

      fetchUnreadNotificationCount();
      
    } catch (error) {
      setError(error);
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasNext, activeTab]);

  const fetchUserKeywords = async () => {
    try {
      const response = await requestWithAccessToken(
        'get',
        `${process.env.REACT_APP_BE_URL}/api/keyword/userKeywords`,
      );
      const userKeywords = response.data;
      setKeywordCount(userKeywords.length);
    } catch (error) {
      console.error('Error fetching user keywords:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, activeTab]);

  useEffect(() => {
    fetchUserKeywords();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [hasNext]);

  const KeywordSettingButtonClick = () => {
    navigate('/subscribe/keywordSubscribe');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(0); // 탭 변경 시 페이지 초기화
    setNotifications([]); // 탭 변경 시 기존 알림 목록 초기화
  };

  return (
    <AppContainer>
      <TabBar Title="알림" />

      <TabContainer>
        <TabButton
          $active={activeTab === 'topic'}
          onClick={() => handleTabChange('topic')} 
        >
          구독
        </TabButton>
        <TabButton
          $active={activeTab === 'keyword'}
          onClick={() => handleTabChange('keyword')} 
        >
          키워드
        </TabButton>
      </TabContainer>
      {activeTab === 'keyword' ? (
        <KeywordRegistrationBanner>
          <KeywordCountContainer>
            <BellIcon
              src={`${process.env.PUBLIC_URL}/icons/notification.svg`}
              alt="notification"
            />
            <div>알림 등록한 키워드 {keywordCount}개</div>
          </KeywordCountContainer>
          <StyledButton onClick={KeywordSettingButtonClick}>
            키워드 설정
          </StyledButton>
        </KeywordRegistrationBanner>
      ) : null}
      <TabContentContainer>
        {!loading &&
          !error &&
          notifications
          .filter(notification => 
            activeTab === "keyword" ? notification.keywordName : notification.topicName
          )
          .map((notification) => (
            <NotificationCard
              key={notification.id}
              id={notification.id}
              title={notification.title}
              imageUrl={notification.imageUrl}
              clickUrl={notification.clickUrl}
              notifiedAt={notification.notifiedAt}
              topicName={notification.topicName} 
              keywordName={activeTab === "keyword" ? notification.keywordName : null} // Keyword 탭에서만 keyword 표시
              read={notification.read}
            />
        ))}
        <div ref={observerRef} style={{ height: 10 }}></div>
        {loading && <MessageContainer>Loading...</MessageContainer>}
        {!loading && error && (
          <MessageContainer>Error fetching notifications</MessageContainer>
        )}
      </TabContentContainer>
    </AppContainer>
  );
};

export default NotificationPage;

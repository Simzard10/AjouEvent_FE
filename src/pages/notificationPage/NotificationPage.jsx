import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TabBar from '../../components/TabBar';
import NotificationCard from './NotificationCard';

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

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('topic');
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const observerRef = useRef(null);

  const fetchNotifications = useCallback(async () => {
    if (!hasNext) return;
    try {
      setNotifications([
        {
          id: 727,
          title:
            '엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청긴제목',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:27.440163',
          notificationType: 'KEYWORD',
          topicName: '테스트',
          read: false,
        },
        {
          id: 724,
          title:
            '엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청긴제목',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:27.440163',
          notificationType: 'KEYWORD',
          topicName: '테스트',
          read: true,
        },
        {
          id: 725,
          title:
            '엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청긴제목',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:27.440163',
          notificationType: 'KEYWORD',
          topicName: '테스트',
          read: true,
        },
        {
          id: 726,
          title:
            '엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청엄청긴제목',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:27.440163',
          notificationType: 'KEYWORD',
          topicName: '테스트',
          read: false,
        },
        {
          id: 725,
          title: '[테스트]',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:26.896515',
          notificationType: 'TOPIC',
          topicName: '테스트',
          read: false,
        },
        {
          id: 725,
          title:
            '[테스트]-긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목긴제목',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73868',
          notifiedAt: '2025-01-21T16:07:26.896515',
          notificationType: 'TOPIC',
          topicName: '테스트',
          read: false,
        },
        {
          id: 722,
          title: '테스트-[테스트]',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73867',
          notifiedAt: '2025-01-21T16:06:56.193068',
          notificationType: 'KEYWORD',
          topicName: '테스트',
          read: false,
        },
        {
          id: 720,
          title: '[테스트]',
          body: '테스트 공지입니다',
          imageUrl:
            'https://www.ajou.ac.kr/_res/ajou/kr/img/intro/img-symbol.png',
          clickUrl: 'https://www.ajouevent.com/event/73867',
          notifiedAt: '2025-01-21T16:06:55.385147',
          notificationType: 'TOPIC',
          topicName: '테스트',
          read: true,
        },
      ]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [page, hasNext]);

  useEffect(() => {
    fetchNotifications();
  }, [page]);

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

  return (
    <AppContainer>
      <TabBar Title="알림" />

      <TabContainer>
        <TabButton
          $active={activeTab === 'topic'}
          onClick={() => setActiveTab('topic')}
        >
          구독
        </TabButton>
        <TabButton
          $active={activeTab === 'keyword'}
          onClick={() => setActiveTab('keyword')}
        >
          키워드
        </TabButton>
      </TabContainer>

      <TabContentContainer>
        {notifications
          .filter(
            (notification) =>
              notification.notificationType ===
              (activeTab === 'topic' ? 'TOPIC' : 'KEYWORD'),
          )
          .map((notification) => (
            <NotificationCard
              key={notification.id}
              id={notification.id}
              title={notification.title}
              body={notification.body}
              imageUrl={notification.imageUrl}
              clickUrl={notification.clickUrl}
              notifiedAt={notification.notifiedAt}
              topicName={notification.topicName}
              read={notification.read}
            />
          ))}
        <div ref={observerRef} style={{ height: 10 }}></div>
      </TabContentContainer>
    </AppContainer>
  );
};

export default NotificationPage;

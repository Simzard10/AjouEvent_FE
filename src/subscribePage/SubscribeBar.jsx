import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EtoKCodes } from "../departmentCodes";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MenuBarContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  background: #ffffff;
  padding: 12px 10px 0px 16px;
  font-family: "Pretendard Variable";
  font-weight: 600;
`;

const MenuItemContainer = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MenuItem = styled.div`
  background-color: ${(props) => (props.isSelected ? '#0A5CA8' : '#ffffff')};
  color: ${(props) => (props.isSelected ? '#ffffff' : '#000000')};
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 600px;
  border: 2px solid #f7f7f7;
  cursor: pointer;
`;

const ViewAllButton = styled.div`
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 600px;
  border: 2px solid #f7f7f7;
  background-color: #ffffff;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#e0e0e0' : '#ffffff')}; /* 항상 회색 유지 */
  p {
    margin: 0;
  }
`;

const ViewAllIcon = styled.img`
  width: 18px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const ModalOverlay = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  overflow-y: auto;
  padding: 24px;
  z-index: 1001;
  width: 90%;
  height: 80%;
`;

const ModalHeaderIcon = styled.img`
  aspect-ratio: 1;
  width: 20px;
  object-fit: contain;
  object-position: center;
`;

const ModalHeaderTitle = styled.h1`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin: 0;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 16px 0;
  gap: 8px;
`;

const MenuItemInModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-family: "Pretendard Variable";
  font-weight: 600;
`;

const CategoryTitle = styled.h2`
  font-family: "Pretendard Variable";
  font-size: 30px;
  font-weight: 700;
  margin-top: 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const SubscribeBar = ( { onTopicSelect } ) => {
  const [menuItems, setMenuItems] = useState([]);
  const [subscribeItems, setSubscribeItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleTopicClick = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic(null); 
      onTopicSelect(null);    
    } else {
      setSelectedTopic(topic); 
      onTopicSelect(topic);  
    }
  };

  const handleCategoryClick = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await requestWithAccessToken(
          "get",
          `${process.env.REACT_APP_BE_URL}/api/topic/subscriptionsStatus`
        );
        const datas = response.data;
        setMenuItems(datas);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchSubscribeItems = async () => {
      try {
        const response = await requestWithAccessToken(
          "get",
          `${process.env.REACT_APP_BE_URL}/api/topic/subscriptions`
        );
        const topics = response.data;
        setSubscribeItems(topics);
      } catch (error) {
        console.error("Error fetching subscribe items:", error);
      }
    };

    fetchSubscribeItems();
  }, [menuItems]);

  const handleSubscribe = async (topic) => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      Toast.fire({
        icon: "info",
        title: `${topic.koreanTopic} 구독 중`,
      });

      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/topic/subscribe`,
        { topic: topic.englishTopic }
      );

      Swal.fire({
        icon: "success",
        title: "구독 성공",
        text: `${topic.koreanTopic}를 구독하셨습니다`,
      });

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.koreanTopic === topic.koreanTopic ? { ...item, subscribed: true } : item
        )
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "구독 실패",
        text: "서버 에러",
      });
      console.error("Error subscribing to topic:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnsubscribe = async (topic) => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      Toast.fire({
        icon: "info",
        title: `${topic.koreanTopic} 구독 취소 중`,
      });

      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/topic/unsubscribe`,
        { topic: topic.englishTopic }
      );

      Swal.fire({
        icon: "success",
        title: "구독 취소 성공",
        text: `${topic.koreanTopic}를 구독 취소하셨습니다`,
      });

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.koreanTopic === topic.koreanTopic ? { ...item, subscribed: false } : item
        )
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "구독 실패",
        text: "서버 에러",
      });
      console.error("Error unsubscribing from topic:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const categorizeAndSortItems = (items) => {
    const categories = {
      학과: [],
      단과대: [],
      공지사항: [],
      기숙사: [],
      대학원: []
    };

    items.forEach(item => {
      if (categories[item.classification]) {
        categories[item.classification].push(item);
      }
    });

    Object.keys(categories).forEach(category => {
      categories[category].sort((a, b) => a.koreanOrder - b.koreanOrder);
    });

    return categories;
  };

  const categorizedItems = categorizeAndSortItems(menuItems);

  return (
  <Container>
    <MenuBarContainer>
      <ViewAllButton isSelected={true} onClick={() => setShowModal(true)}>
        <ViewAllIcon src={`${process.env.PUBLIC_URL}/icons/gear.svg`} />
        <p>구독 설정</p>
      </ViewAllButton>
      <MenuItemContainer>
        {Array.isArray(subscribeItems) ? (
          subscribeItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => handleTopicClick(item.englishTopic)}
              isSelected={selectedTopic === item.englishTopic} // 선택된 토픽인지 확인
            >
              {item.koreanTopic}
            </MenuItem>
          ))
        ) : (
          <p>구독 항목이 없습니다</p>
        )}
      </MenuItemContainer>
    </MenuBarContainer>

    {showModal && (
      <>
        <ModalOverlay onClick={() => setShowModal(false)} />
        <ModalContent>
          <ModalHeader>
            <ModalHeaderIcon
              src={`${process.env.PUBLIC_URL}/icons/arrow_back.svg`}
              onClick={() => setShowModal(false)}
            />
            <ModalHeaderTitle>전체 구독 항목</ModalHeaderTitle>
          </ModalHeader>
          {Object.keys(categorizedItems).map((category) => (
            <div key={category}>
              <CategoryTitle onClick={() => handleCategoryClick(category)}>
      {category}
      <img
        src={
          openCategory === category
            ? `${process.env.PUBLIC_URL}/icons/arrow_down.svg`
            : `${process.env.PUBLIC_URL}/icons/arrow_right.svg`
        }
        alt="arrow"
        style={{ width: '24px', height: '24px' }} // 아이콘 크기 조정
      />
    </CategoryTitle>
              {openCategory === category &&
                categorizedItems[category].map((item) => (
                  <MenuItemInModal key={item.id}>
                    <div>{item.koreanTopic}</div>
                    <div>
                      {item.subscribed ? (
                  <ModalHeaderIcon
                    onClick={() => handleUnsubscribe(item)}
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/icons/alarm_filled.svg`}
                  />
                ) : (
                  <ModalHeaderIcon
                    onClick={() => handleSubscribe(item)}
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/icons/alarm_empty.svg`}
                  />
                )}
                    </div>
                  </MenuItemInModal>
                ))}
            </div>
          ))}
        </ModalContent>
      </>
    )}
  </Container>
  );
};

export default SubscribeBar;
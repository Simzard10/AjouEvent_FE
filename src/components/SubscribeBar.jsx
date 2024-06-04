import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EtoKCodes } from "../departmentCodes";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";

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
  display: flex;
  height: fit-content;
  padding: 8px 12px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 600px;
  border: 2px solid #f7f7f7;
  background-color: #ffffff;
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
`;

const SubscribeBar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [subscribeItems, setSubscribeItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
        const topics = response.data.topics;
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
      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/topic/subscribe`,
        { topic: topic }
      );
      alert(`${EtoKCodes[topic]} 구독 완료`);

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.topic === topic ? { ...item, subscribed: true } : item
        )
      );
    } catch (error) {
      console.error("Error subscribing to topic:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnsubscribe = async (topic) => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/topic/unsubscribe`,
        { topic: topic }
      );
      alert(`${EtoKCodes[topic]} 구독 취소`);

      setMenuItems((prevMenuItems) =>
        prevMenuItems.map((item) =>
          item.topic === topic ? { ...item, subscribed: false } : item
        )
      );
    } catch (error) {
      console.error("Error unsubscribing from topic:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container>
      <MenuBarContainer>
        <ViewAllButton onClick={() => setShowModal(true)}>
          <ViewAllIcon src={`${process.env.PUBLIC_URL}/icons/Menu.svg`} />
          <p>전체</p>
        </ViewAllButton>
        <MenuItemContainer>
          {subscribeItems.map((item, index) => (
            <MenuItem key={index}>{item}</MenuItem>
          ))}
        </MenuItemContainer>
      </MenuBarContainer>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalHeaderIcon
                onClick={() => setShowModal(false)}
                loading="lazy"
                src={`${process.env.PUBLIC_URL}/icons/arrow_back.svg`}
              />
              <ModalHeaderTitle>전체 항목</ModalHeaderTitle>
            </ModalHeader>
            {menuItems.map((item, index) => (
              <MenuItemInModal key={index}>
                {EtoKCodes[item.topic]}
                {item.subscribed ? (
                  <ModalHeaderIcon
                    onClick={() => handleUnsubscribe(item.topic)}
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/icons/alarm_filled.svg`}
                  />
                ) : (
                  <ModalHeaderIcon
                    onClick={() => handleSubscribe(item.topic)}
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/icons/alarm_empty.svg`}
                  />
                )}
              </MenuItemInModal>
            ))}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SubscribeBar;

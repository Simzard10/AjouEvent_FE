import React, { useState } from "react";
import styled from "styled-components";

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
  height: 60px;
  overflow-x: auto;
  white-space: nowrap;
  background: #f0f0f0;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const MenuItem = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  margin: 12px;
  background: #e0e0e0;
  border-radius: 25px;
  position: relative;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  margin-left: 12px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const ViewAllButton = styled.button`
  margin-left: auto;
  padding: 10px;
  color: rgb(0, 102, 179);
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  position: sticky;
  right: 0;
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
  padding: 20px;
  border-radius: 10px;
  z-index: 1001;
  width: 80%;
  max-width: 600px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const MenuItemInModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const SubscribeBar = () => {
  const [menuItems, setMenuItems] = useState([
    "소프트웨어학과",
    "소프트웨어융합대학",
    "아주대학교-일반",
    "아주대학교-장학",
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleRemoveItem = (index) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <MenuBarContainer>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            {item}
            <CloseButton onClick={() => handleRemoveItem(index)}>x</CloseButton>
          </MenuItem>
        ))}
        <ViewAllButton onClick={() => setShowModal(true)}>전체</ViewAllButton>
      </MenuBarContainer>
      {showModal && (
        <ModalOverlay
          show={showModal.toString()}
          onClick={() => setShowModal(false)}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>전체 구독 메뉴</h2>
              <ModalCloseButton onClick={() => setShowModal(false)}>
                x
              </ModalCloseButton>
            </ModalHeader>
            <ul>
              {menuItems.map((item, index) => (
                <MenuItemInModal key={index}>
                  {item}
                  <CloseButton onClick={() => handleRemoveItem(index)}>
                    x
                  </CloseButton>
                </MenuItemInModal>
              ))}
            </ul>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SubscribeBar;

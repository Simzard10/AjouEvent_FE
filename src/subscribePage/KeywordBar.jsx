import React, { useState, useEffect } from "react";
import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import useStore from "../store/useStore"; 

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
  border: 2px solid #f7f7f7;  // 회색 테두리
  background-color: #e0e0e0;  // 회색 배경
  cursor: pointer;
  p {
    margin: 0;
    color: #333; // 텍스트 색상 조정
  }
`;

const ViewAllIcon = styled.img`
  width: 18px;
  aspect-ratio: 1;
  object-fit: cover;
`;

const NotificationBadge = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  display: ${({ isRead }) => {
    return isRead === false ? "inline-block" : "none";
  }};
`;

const KeywordBar = ({ onKeywordSelect, selectedKeyword }) => {
  const { isKeywordTabRead, setIsKeywordTabRead } = useStore(); 
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscribeKeywords();
  }, []);

  const fetchSubscribeKeywords = async () => {
    try {
      const response = await requestWithAccessToken(
        "get",
        `${process.env.REACT_APP_BE_URL}/api/keyword/userKeywords`
      );
      setKeywords(response.data);
    } catch (error) {
      console.error("Error fetching subscribe keywords:", error);
    }
  };

  const handleItemClick = (keyword) => {
    onKeywordSelect(keyword);
    
      setKeywords((prevItems) =>
        prevItems.map((item) =>
          item.encodedKeyword === keyword.encodedKeyword
            ? { ...item, isRead: true }
            : item
        )
      );
   
  };

  return (
    <Container>
      <MenuBarContainer>
        <ViewAllButton onClick={() => navigate('/subscribe/keywordSubscribe')}>
          <ViewAllIcon src={`${process.env.PUBLIC_URL}/icons/alarm_filled.svg`} />
          <p>키워드 설정</p>
        </ViewAllButton>
        <MenuItemContainer>
          {keywords.map((item, index) => (
            <MenuItem
              key={index}
              isSelected={selectedKeyword?.encodedKeyword === item.encodedKeyword}
              onClick={() => handleItemClick(item)}
            >
              {item.koreanKeyword}
              <NotificationBadge isRead={item.isRead} />
            </MenuItem>
          ))}
        </MenuItemContainer>
      </MenuBarContainer>
    </Container>
  );
};

export default KeywordBar;
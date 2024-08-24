import React, { useState, useEffect } from "react";
import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
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


const KeywordBar = () => {
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();

  useEffect (() => {
    fetchSubscribeKeywords();
  }, []);

  // 사용자가 설정한 키워드 리스트 가져오기
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

  
  const handleItemClick = () => {
    navigate('/subscribe/keywordSubscribe', { state: { keywords } });
  };

  return (
    <Container>
      <MenuBarContainer>
        <ViewAllButton onClick={() => handleItemClick()}>
          <ViewAllIcon src={`${process.env.PUBLIC_URL}/icons/alarm_filled.svg`} />
          <p>키워드 설정</p>
        </ViewAllButton>
        <MenuItemContainer>
          {keywords.map((item, index) => (
            <MenuItem key={index}>{item.koreanKeyword}</MenuItem>
          ))}
        </MenuItemContainer>
      </MenuBarContainer>
    </Container>
  );
};

export default KeywordBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import Swal from "sweetalert2";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const MainContentContaioner = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  padding: 0 20px 80px 20px;
`;

const TapWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 0px 16px 0px;
  gap: 8px;
`;

const TapIcon = styled.img`
  aspect-ratio: 1;
  width: 20px;
  object-fit: contain;
  object-position: center;
  cursor: pointer; /* 클릭 가능한 아이콘 표시 */
`;

const TapTitle = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const TemporaryContaioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor};
  border-radius: 0.5rem;
  border: 1px solid gray;
  width: 6rem;
  height: 1.4rem;
  color: ${(props) => props.color};
  font-size: 0.8rem;
  text-decoration: none;
  margin: 0 1rem 0 1rem;
`;

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const SubscribeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
`;

const SubscribeInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const SubscribeButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 7px 15px;
  cursor: pointer;
`;

const KeywordListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const KeywordHeader = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

const KeywordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0;
`;

const KeywordInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeywordText = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const KeywordTag = styled.span`
  background-color: #f1f1f1;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-left: 8px;
`;

const DeleteIcon = styled.span`
  cursor: pointer;
  color: red;
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

export default function KeywordSubscribePage() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const [keywords, setKeywords] = useState(location.state?.keywords || []);
  const [isProcessing, setIsProcessing] = useState(false);

  // 뒤로가기 클릭 시 구독 페이지로 이동
  const arrowBackClicked = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/subscribe");
    }
  };

  // 키워드 구독 취소
  const handleDeleteKeyword =  async (keyword) => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      Toast.fire({
        icon: "info",
        title: `${keyword.koreanKeyword} 구독 취소 중`,
      });

      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/keyword/unsubscribe`,
        { englishKeyword: keyword.englishKeyword }
      );

      Swal.fire({
        icon: "success",
        title: "구독 취소 성공",
        text: `${keyword.koreanKeyword}를 구독 취소하셨습니다`,
      });

      setKeywords(prevKeywords =>
        prevKeywords.filter(item => item.englishKeyword !== keyword.englishKeyword)
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

  

  return (
    <AppContainer>
      {accessToken ? (
        <MainContentContaioner>
        <TapWrapper>
          <TapIcon
            onClick={arrowBackClicked}
            loading="lazy"
            src={`${process.env.PUBLIC_URL}/icons/arrow_back.svg`}
          />
          <TapTitle>키워드 구독</TapTitle>
        </TapWrapper>
          <SubscribeContainer>
            <SubscribeInputContainer>
              <SubscribeInput placeholder="알림 받을 키워드를 입력해주세요." />
              <SubscribeButton>구독</SubscribeButton>
            </SubscribeInputContainer>
            <KeywordHeader>
              알림 설정한 키워드 {keywords.length} / 10
            </KeywordHeader>
            <KeywordListContainer>
              {keywords.map((item, index) => (
                <KeywordItem key={index}>
                  <KeywordInfo>
                    <KeywordText>
                      {item.koreanKeyword}
                      <KeywordTag>{item.topicName}</KeywordTag>
                    </KeywordText>
                  </KeywordInfo>
                  <DeleteIcon onClick={() => handleDeleteKeyword(item)}>🗑️</DeleteIcon>
                </KeywordItem>
              ))}
            </KeywordListContainer>
          </SubscribeContainer>
        </MainContentContaioner>
      ) : (
        <TemporaryContaioner>
          <p>로그인이 필요한 서비스입니다</p>
          <StyledLink bgcolor={"white"} color={"black"} to="/login">
            로그인
          </StyledLink>
        </TemporaryContaioner>
      )}
      <NavigationBar />
    </AppContainer>
  );
}

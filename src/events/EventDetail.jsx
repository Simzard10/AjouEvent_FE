import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CalendarModal from "../components/CalendarModal";
import TabBar from "../components/TabBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import Swal from "sweetalert2";
import EventBanner from "./EventBanner";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: "Pretendard Variable";
`;

const EventContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  margin: 0;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Line = styled.div`
  margin: 0;
`;

const Writer = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Subject = styled.div`
  width: fit-content;
  padding: 3px 4px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: rgba(84, 84, 84, 0.08);
  font-size: 14px;
  color: rgba(84, 84, 84);
  font-weight: bold;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

const LinkButton = styled.div`
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  margin: 24px 0 16px 0;
  cursor: pointer;
  display: inline-block;
`;

const ContentContaioner = styled.div`
  width: calc(100%-48px);
  margin: 16px 24px 0px 24px;
  margin-bottom: 68px;
`;

const SubtitleContainer = styled.section`
  width: 100%;
  justify-content: space-between;
  display: flex;
  gap: 20px;
  font: 700 12px "Pretendard Variable", sans-serif;
`;

const StyledDate = styled.time`
  color: rgba(0, 0, 0, 0.4);
  line-height: 130%;
`;

const Stats = styled.div`
  align-self: start;
  display: flex;
  gap: 8px;
  color: #c2c8d1;
  white-space: nowrap;
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  padding-right: 20px;
  gap: 4px;
`;

const StatIcon = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 14px;
`;

const StatValue = styled.span`
  font-family: "Pretendard Variable";
`;

const HorizontalLine = styled.hr`
  width: 312px;
  height: 1px;
  margin: 24px 0 24px 0;
  background: rgba(0, 0, 0, 0.08);
  border: 0;
`;

const BottomContainer = styled.div`
  width: 100%;
  z-index: 5;
  position: fixed;
  bottom: 0;
  border: 1px solid rgba(35, 102, 175, 0.08);
  background-color: #fff;
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: rgba(35, 102, 175, 1);
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 8px 16px 8px;
`;

const BottomImage = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
  align-self: flex-start;
  margin-top: 12px;
`;

const BottomBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3px 4px;
  flex: 1;
`;

const Button = styled.button`
  font-feature-settings: "ss10" on;
  font-family: "Pretendard Variable";
  border-radius: 4px;
  background-color: rgba(35, 102, 175, 0.08);
  color: rgba(35, 102, 175, 1);
  padding: 14px 60px;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Stat({ iconSrc, value, altText }) {
  return (
    <StatItem>
      <StatIcon src={iconSrc} alt={altText} loading="lazy" />
      <StatValue>{value}</StatValue>
    </StatItem>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [content, setContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // const response = await requestWithAccessToken(
        //   "get",
        //   `${process.env.REACT_APP_BE_URL}/api/event/detail/${id}`
        // );
        const accessToken = localStorage.getItem("accessToken");
        const config = accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {};
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/event/detail/${id}`,
          config,
          { withCredentials: true }
        );

        if (response.data.content) {
          let sliceContent = response.data.content.split("\\n");
          setContent(sliceContent);
        }

        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRedirect = () => {
    if (event && event.url) {
      window.location.href = event.url;
    } else {
      Swal.fire({
        icon: "warning",
        title: "url 에러",
        text: "바로가기 가능한 url이 없습니다.",
      });
    }
  };

  const handleStarClick = async () => {
    try {
      if (event.star) {
        await requestWithAccessToken(
          "delete",
          `${process.env.REACT_APP_BE_URL}/api/event/like/${id}`
        );
        setEvent((prevEvent) => ({
          ...prevEvent,
          star: false,
          likesCount: prevEvent.likesCount - 1,
        }));
      } else {
        await requestWithAccessToken(
          "post",
          `${process.env.REACT_APP_BE_URL}/api/event/like/${id}`
        );
        setEvent((prevEvent) => ({
          ...prevEvent,
          star: true,
          likesCount: prevEvent.likesCount + 1,
        }));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Container>
      {event ? (
        <EventContainer>
          <TabBar Title={"공지사항"} />
          <EventBanner images={event.imgUrl} />
          <ContentContaioner>
            <TitleContainer>
              <Subject>{event.subject}</Subject>
              <Title>{event.title}</Title>
              <SubtitleContainer>
                <StyledDate>{formatDate(event.createdAt)}</StyledDate>
                <Stats>
                  <Stat
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/62c7bb15f5fd13739601caff1be349795102bd00b8ccfe603cd2e43498657c46?apiKey=75213697ab8e4fbfb70997e546d69efb&"
                    value={event.viewCount}
                    altText="Statistic icon 1"
                  />
                  <Stat
                    onClick={handleStarClick}
                    iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/52d95bd6c4badc487be46d013f44cd23b9800d5d1e753fb3a364bcb97b18044f?apiKey=75213697ab8e4fbfb70997e546d69efb&"
                    value={event.likesCount}
                    altText="Statistic icon 2"
                  />
                </Stats>
              </SubtitleContainer>
            </TitleContainer>
            <HorizontalLine />
            <Content>
              {content.map((line, index) => (
                <Line key={index}>{line}</Line>
              ))}
            </Content>
            <Writer>작성자: {event.writer}</Writer>
            <LinkButton onClick={handleRedirect}>바로가기</LinkButton>
          </ContentContaioner>
          <BottomContainer>
            {event.star ? (
              <BottomImage
                onClick={handleStarClick}
                loading="lazy"
                src={`${process.env.PUBLIC_URL}/icons/FilledBookmarkIcon.svg`}
                alt="Calendar"
              />
            ) : (
              <BottomImage
                onClick={handleStarClick}
                loading="lazy"
                src={`${process.env.PUBLIC_URL}/icons/EmptyBookmarkIcon.svg`}
                alt="Calendar"
              />
            )}

            <BottomBody>
              <Button onClick={() => setIsModalOpen(true)}>
                캘린더에 추가
              </Button>
            </BottomBody>
          </BottomContainer>
          {isModalOpen && (
            <CalendarModal
              setIsModalOpen={setIsModalOpen}
              title={event.title}
              content={content}
            />
          )}
        </EventContainer>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EventDetail;

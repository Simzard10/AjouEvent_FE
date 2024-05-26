import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 160px);
  padding: 20px;
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

const Subject = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const LikeCount = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

const SliderContainer = styled.div`
  padding-left: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SliderWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.translate}px);
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  margin: 20px 0 20px 0;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  z-index: 10;

  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 30px;")}
`;

const ImageWapper = styled.div`
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const DetailContaioner = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  object-fit: cover;
`;

const LinkButton = styled.div`
  background-color: #9a9a9a;
  text-align: center;
  width: 120px;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
`;

const ContentContaioner = styled.div`
  width: 90%;
  margin: 0 20px 0 20px;
  overflow: hidden;
`;

const BackButton = styled.button`
  position: absolute;
  top: 100px;
  left: 10px;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
`;

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/event/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        let sliceContent = response.data.content.split("\\n");
        setContent(sliceContent);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const nextSlide = () => {
    if (event && event.imgUrl && currentIndex < event.imgUrl.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateTranslateValue = () => {
    return -(currentIndex * 295);
  };

  const handleRedirect = () => {
    if (event && event.url) {
      window.location.href = event.url;
    } else {
      alert("바로가기 가능한 url이 없습니다.");
    }
  };

  const handleStarClick = async () => {
    try {
      console.log("event.star" + event.star);
      let accessToken = localStorage.getItem("accessToken");
      if (event.star) {
        await axios.delete(
          `${process.env.REACT_APP_BE_URL}/api/event/like/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEvent((prevEvent) => ({
          ...prevEvent,
          star: false,
          likesCount: prevEvent.likesCount - 1,
        }));
      } else {
        await axios.post(
          `${process.env.REACT_APP_BE_URL}/api/event/like/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
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
        <>
          <BackButton onClick={() => window.history.back()}>
            뒤로가기
          </BackButton>
          <SliderContainer>
            <Arrow direction="left" onClick={prevSlide}>
              &lt;
            </Arrow>
            <SliderWrapper translate={calculateTranslateValue()}>
              {event.imgUrl &&
                event.imgUrl.map((url, index) => (
                  <Image key={index} src={url} alt={`Image ${index + 1}`} />
                ))}
            </SliderWrapper>
            <Arrow direction="right" onClick={nextSlide}>
              &gt;
            </Arrow>
          </SliderContainer>
          <ContentContaioner>
            <Subject>{event.type}</Subject>
            <Title>{event.title}</Title>
            <DetailContaioner>
              <ImageWapper onClick={handleStarClick}>
                {event.star ? <FilledStarIcon /> : <EmptyStarIcon />}
              </ImageWapper>
              <LikeCount>{event.likesCount}</LikeCount>
            </DetailContaioner>

            <Content>
              {content.map((line, index) => (
                <Line key={index}>{line}</Line>
              ))}
            </Content>
            <Writer>작성자: {event.writer}</Writer>
          </ContentContaioner>

          <LinkButton onClick={handleRedirect}>바로가기</LinkButton>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EventDetail;

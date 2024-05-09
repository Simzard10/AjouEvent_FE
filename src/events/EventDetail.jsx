import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Writer = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Subject = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://ajou-event.shop/api/event/detail/${id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <Container>
      {event ? (
        <>
          <Title>{event.title}</Title>
          <Content>{event.content}</Content>
          <Writer>작성자: {event.writer}</Writer>
          <Subject>주제: {event.subject}</Subject>
          <ImageContainer>
            {event.imgUrls.map((url, index) => (
              <Image key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
          </ImageContainer>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EventDetailPage;

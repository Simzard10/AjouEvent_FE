import { useState, useEffect } from "react";
import styled from "styled-components";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import EventCard from "../events/EventCard";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

export default function HomeHotEvent() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadHotEvent = async () => {
      if (error || loading) return;

      setLoading(true);
      try {
        const response = await requestWithAccessToken(
          "get",
          `${process.env.REACT_APP_BE_URL}/api/event/popular`
        );
        const newEvents = response.data;

        setEvents(newEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadHotEvent();
  }, []);

  return (
    <>
      <FlexContainer>
        {events.map((event, index) => (
          <EventCard
            key={`${event.eventId}-${index}`}
            id={event.eventId}
            title={event.title}
            subject={event.subject}
            imgUrl={event.imgUrl}
            likesCount={event.likesCount}
            star={event.star}
          />
        ))}
      </FlexContainer>
      {error && <p>더 이상 불러올 이벤트가 없습니다.</p>}
    </>
  );
}

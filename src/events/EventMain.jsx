import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const FlexContainer = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;
`;

const Observer = styled.div`
  height: 3rem;
  width: 100%;
`;

const EventMain = () => {
  const [events, setEvents] = useState([]);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 초기 페이지는 0
  const pageSize = 10; // 페이지 당 이벤트 수

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://ajou-event.shop/api/event/all?page=${page}&size=${pageSize}`
      );
      const newEvents = response.data.content;
      console.log("NewData:" + newEvents);
      setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      setLoading(false);
      console.log("Loading:" + loading);
      setPage((prevPage) => prevPage + 1);
      console.log("Page:" + page);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("스크롤");
      fetchData();
    }
  }, [inView]);

  if (loading && events.length === 0) {
    return <p>Loading...</p>;
  }

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <FlexContainer>
      {events.map((event) => (
        <EventCard
          key={event.eventId}
          id={event.eventId}
          title={event.title}
          imgUrl={event.imgUrl}
          star={event.star}
        />
      ))}
      <Observer ref={ref}>Observer</Observer>
      {loading && <p>Loading...</p>}
    </FlexContainer>
  );
};

export default EventMain;

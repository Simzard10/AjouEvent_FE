import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "axios";

const FlexContainer = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  overflow: auto;
`;

const EventMain = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 초기 페이지는 1
  const pageSize = 10; // 페이지 당 이벤트 수

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ajou-event.shop/api/event/all?page=${page}&size=${pageSize}`
        );
        const newEvents = response.data.content;
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // 스크롤을 감지하고, 맨 아래로 스크롤되면 페이지를 증가시킴
  // 스크롤을 감지하고, 맨 아래로 스크롤되면 페이지를 증가시킴
  const handleScroll = () => {
    console.log("Scrolled!"); // 스크롤 이벤트가 제대로 감지되는지 확인

    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    // 현재 스크롤 위치와 브라우저 창의 높이를 더한 값이 문서의 총 높이와 같으면 마지막까지 스크롤된 것으로 간주
    if (
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight
    ) {
      console.log("Reached bottom of the page!"); // 페이지의 맨 아래까지 스크롤되었을 때 확인
    }

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {loading && <p>Loading more...</p>}
    </FlexContainer>
  );
};

export default EventMain;

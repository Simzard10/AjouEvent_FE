import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const EventMain = ({ events, setEvents }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const bottomRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/api/event/all?page=${page}&size=${pageSize}`
      );
      const newEvents = response.data.result;

      // Check if there are no more new events to fetch
      if (newEvents.length === 0) {
        setHasMore(false);
      } else {
        setEvents((prevEvents) => {
          const eventIds = new Set(prevEvents.map((event) => event.eventId));
          const filteredEvents = newEvents.filter(
            (event) => !eventIds.has(event.eventId)
          );
          return [...prevEvents, ...filteredEvents];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, setEvents]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [loading, hasMore, fetchData]);

  if (loading && events.length === 0) {
    return (
      <FlexContainer>
        <p>Loading...</p>
      </FlexContainer>
    );
  }

  if (events.length === 0) {
    return (
      <FlexContainer>
        <p>No events found.</p>
      </FlexContainer>
    );
  }

  return (
    <>
      <FlexContainer>
        {events.map((event, index) => (
          <EventCard
            key={`${event.eventId}-${index}`} // 고유 키 생성
            id={event.eventId}
            title={event.title}
            imgUrl={event.imgUrl}
            star={event.star}
          />
        ))}
      </FlexContainer>
      <div ref={bottomRef} style={{ height: "1px" }}></div>
      {loading && <p>Loading more events...</p>}
      {!hasMore && <p>No more events to load.</p>}
    </>
  );
};

export default EventMain;

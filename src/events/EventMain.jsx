import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useStore from "../store/useStore";
import { KtoECodes } from "../departmentCodes";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const ErrorMessage = styled.p`
  margin-left: 20px;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.98px;
`;

const EventMain = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { keyword, setKeyword, optionTwo, setOptionTwo } = useStore(
    (state) => ({
      keyword: state.keyword,
      setKeyword: state.setKeyword,
      optionOne: state.optionOne,
      setOptionOne: state.setOptionOne,
      optionTwo: state.optionTwo,
      setOptionTwo: state.setOptionTwo,
    })
  );
  const accessToken = localStorage.getItem("accessToken");

  const pageSize = 10;

  const bottomRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/api/event/${KtoECodes[optionTwo]}?page=${page}&size=${pageSize}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const newEvents = response.data.result;

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
  }, [loading, hasMore, page, optionTwo, keyword]);

  // Handle infinite scroll
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

  // Handle type and keyword changes
  useEffect(() => {
    const fetchInitData = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      setEvents([]);
      setPage(0);
      setHasMore(true);

      try {
        console.log(
          `${process.env.REACT_APP_BE_URL}/api/event/${KtoECodes[optionTwo]}?page=0&size=${pageSize}&keyword=${keyword}`
        );
        // 비동기적으로 type 설정되어서 departmentCodes[type] 가 undefined 뜰 때 오류나길래 예외처리함.
        if (!KtoECodes[optionTwo]) {
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/event/${KtoECodes[optionTwo]}?page=0&size=${pageSize}&keyword=${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const newEvents = response.data.result;

        if (newEvents.length === 0) {
          setHasMore(false);
        } else {
          // setEvents(newEvents);
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
    };

    fetchInitData();
  }, [optionTwo, keyword]);

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
      <div ref={bottomRef} style={{ height: "1px" }}></div>
      {loading && <p>이벤트 불러 오는 중...</p>}
      {!hasMore && <p>더 이상 불러올 이벤트가 없습니다.</p>}
    </>
  );
};

export default EventMain;

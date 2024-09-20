import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import KeywordBar from "./KeywordBar";
import SearchBar from "../components/SearchBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import KeywordEventCard from "../events/KeywordEventCard";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
`;

const KeywordListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 0 20px 0 20px;
`;

export default function KeywordTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const pageSize = 10;
  const bottomRef = useRef(null);

  const fetchEvents = useCallback(async (keyword) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setIsError(false);

    try {
      const url = keyword
        ? `${process.env.REACT_APP_BE_URL}/api/event/getSubscribedPostsByKeyword/${encodeURIComponent(keyword.englishKeyword)}?page=${page}&size=${pageSize}`
        : `${process.env.REACT_APP_BE_URL}/api/event/getSubscribedPostsByKeyword?page=${page}&size=${pageSize}`;

      console.log(`Fetching events from: ${url}`);

      const response = await requestWithAccessToken("get", url);
      const newEvents = response.data.result;

      setEvents((prevEvents) => [...prevEvents, ...newEvents]);

      if (newEvents.length < pageSize) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, selectedKeyword]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchEvents(selectedKeyword);
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
  }, [hasMore, fetchEvents]);

  const handleKeywordSelect = (keyword) => {
    if (selectedKeyword && selectedKeyword.englishKeyword === keyword.englishKeyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
    setEvents([]);
    setPage(0);
    setHasMore(true);
  };

  useEffect(() => {
    fetchEvents(selectedKeyword); // selectedKeyword나 페이지 변경 시 데이터 로드
  }, [selectedKeyword]);

  return (
    <AppContainer>
      <KeywordBar onKeywordSelect={handleKeywordSelect} selectedKeyword={selectedKeyword} />
      <SearchBar setKeyword={setSelectedKeyword} />
      <KeywordListContainer>
        {events.map((event, index) => (
          <KeywordEventCard
            key={`${event.eventId}-${index}`}
            id={event.eventId}
            title={event.title}
            subject={event.subject}
            content={event.content}
            imgUrl={event.imgUrl}
            likesCount={event.likesCount}
            viewCount={event.viewCount}
            star={event.star}
            url={event.url}
            writer={event.writer}
            createdAt={event.createdAt}
            keyword={event.keyword}
          />
        ))}
      </KeywordListContainer>
      {loading && <p>로딩중...</p>}
      {isError && <p>서버 에러</p>}
      <div ref={bottomRef} style={{ height: "1px" }}></div>
    </AppContainer>
  );
}
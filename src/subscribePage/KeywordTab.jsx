import React, { useEffect, useState } from "react";
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
  const [isError, setIsError] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const fetchEvents = async (keyword) => {
    setLoading(true);
    setIsError(false);

    try { 
      const url = keyword
        ? `${process.env.REACT_APP_BE_URL}/api/event/getSubscribedPostsByKeyword/${encodeURIComponent(keyword.englishKeyword)}`
        : `${process.env.REACT_APP_BE_URL}/api/event/getSubscribedPostsByKeyword`;

      console.log(`Fetching events from: ${url}`);

      const response = await requestWithAccessToken("get", url);
      
      // 응답 데이터가 배열인지 확인
      setEvents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(selectedKeyword);
  }, [selectedKeyword]);

  const handleKeywordSelect = (keyword) => {
    // 선택된 키워드가 이미 선택된 상태라면 해제
    if (selectedKeyword && selectedKeyword.englishKeyword === keyword.englishKeyword) {
      console.log('selectedKeyword === keywrod')
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
  };

  return (
    <AppContainer>
      <KeywordBar
        onKeywordSelect={handleKeywordSelect}
        selectedKeyword={selectedKeyword} // 현재 선택된 키워드를 전달
      />
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
    </AppContainer>
  );
}
import React, { useEffect, useState, useRef } from "react";
import useStore from "../store/useStore";
import styled from "styled-components";
import KeywordBar from "./KeywordBar";
import SearchBar from "../components/SearchBar";
import EventCard from "../events/EventCard";

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

export default function SubscribeTab() {

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isError, setIsError] = useState(false);
    const bottomRef = useRef(null);

    return (
        <AppContainer>
            <KeywordBar />
            <div>
                {/* <KeywordListContainer>
                    {events.map((event, index) => (
                        <EventCard
                            key={`${event.eventId}-${index}`}
                            id={event.eventId}
                            title={event.title}
                            subject={event.subject}
                            content={event.content}
                            imgUrl={event.imgUrl}
                            likesCount={event.likesCount}
                            viewCount={event.viewCount}
                            star={event.star}
                        />
                    ))}
                </KeywordListContainer> */}
                <div ref={bottomRef} style={{ height: "1px" }}></div>
                {loading && <p>로딩중...</p>}
                {!hasMore && <p>불러올 이벤트가 없습니다.</p>}
                {isError && <p>서버 에러</p>}
            </div>
        </AppContainer>
    );
}

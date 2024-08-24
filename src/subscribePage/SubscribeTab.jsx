import React, { useEffect, useState, useRef, useCallback } from "react";
import useStore from "../store/useStore";
import styled from "styled-components";
import SubscribeBar from "./SubscribeBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import SubscribeEvent from "./SubscribeEvent";
import SearchBar from "../components/SearchBar";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
`;

export default function SubscribeTab() {
    const { savedKeyword, setSavedKeyword } = useStore((state) => ({
        savedKeyword: state.savedKeyword,
        setSavedKeyword: state.setSavedKeyword,
    }));
    const [keyword, setKeyword] = useState(savedKeyword);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isError, setIsError] = useState(false);
    const pageSize = 10;
    const bottomRef = useRef(null);


    const fetchData = useCallback(async () => {
        if (loading || !hasMore || isError) return;

        setLoading(true);

        try {
            console.log(
                `api call: ${process.env.REACT_APP_BE_URL}/api/event/subscribed?AjouNormal&page=${page}&size=${pageSize}&keyword=${keyword}`
            );

            const response = await requestWithAccessToken(
                "get",
                `${process.env.REACT_APP_BE_URL}/api/event/subscribed?AjouNormal&page=${page}&size=${pageSize}&keyword=${keyword}`
            );
            const newEvents = response.data.result;

            setEvents((prevEvents) => {
                const eventIds = new Set(prevEvents.map((event) => event.eventId));
                const filteredEvents = newEvents.filter(
                    (event) => !eventIds.has(event.eventId)
                );
                return [...prevEvents, ...filteredEvents];
            });

            if (response.data.hasNext) {
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setIsError(true);
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, isError, page, keyword]);


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
    

    return (
        <AppContainer>
            <SubscribeBar />
            <SearchBar
                keyword={keyword}
                setKeyword={setKeyword}
                setPage={setPage}
                setEvents={setEvents}
                setSavedKeyword={setSavedKeyword}
                setHasMore={setHasMore}
                fetchData={fetchData}
            />
            <SubscribeEvent
                events={events}
                bottomRef={bottomRef}
                loading={loading}
                hasMore={hasMore}
                isError={isError}
            />
        </AppContainer>
    );
}

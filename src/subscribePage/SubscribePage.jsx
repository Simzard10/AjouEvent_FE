import React, { useEffect, useState, useRef, useCallback } from "react";
import useStore from "../store/useStore";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import SubscribeBar from "./SubscribeBar";
import LocationBar from "../components/LocationBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import SubscribeEvent from "./SubscribeEvent";
import SearchBar from "../components/SearchBar";
import GetUserPermission from "../fcm/GetUserPermission";

const AppContaioner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const MainContentContaioner = styled.div`
  display: flex;
  width: 100vw;
  overflow-x: hidden;
  align-items: center;
  flex-direction: column;
  padding: 0 0 80px 0;
`;

const TemporaryContaioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor};
  border-radius: 0.5rem;
  border: 1px solid gray;
  width: 6rem;
  height: 1.4rem;
  color: ${(props) => props.color};
  font-size: 0.8rem;
  text-decoration: none;
  margin: 0 1rem 0 1rem;
`;

export default function SubscribePage() {
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

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    GetUserPermission();
  }, []);

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
    <AppContaioner>
      {accessToken ? (
        <MainContentContaioner>
          <LocationBar location="구독" />
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
        </MainContentContaioner>
      ) : (
        <TemporaryContaioner>
          <p>로그인이 필요한 서비스입니다</p>
          <StyledLink bgcolor={"white"} color={"black"} to="/login">
            로그인
          </StyledLink>
        </TemporaryContaioner>
      )}
      <NavigationBar />
    </AppContaioner>
  );
}

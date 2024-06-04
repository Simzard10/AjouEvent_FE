import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import LikedEvent from "./LikedEvent";
import NavigationBar from "../components/NavigationBar";
import LikedSearchBar from "./LikedSearchBar";
import LocationBar from "../components/LocationBar";
import useStore from "../store/useStore";
import axios from "axios";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  height: 100vh;
`;

const Contaioner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function LikedEventPage() {
  const { savedKeyword, setSavedKeyword } = useStore((state) => ({
    savedKeyword: state.savedKeyword,
    setSavedKeyword: state.setSavedKeyword,
  }));
  const [keyword, setKeyword] = useState(savedKeyword);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const bottomRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      console.log(
        `api call: ${process.env.REACT_APP_BE_URL}/api/event/liked?AjouNormal&page=${page}&size=${pageSize}&keyword=${keyword}`
      );
      // const response = await axios.get(
      //   `${process.env.REACT_APP_BE_URL}/api/event/liked?AjouNormal&page=${page}&size=${pageSize}&keyword=${keyword}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );
      const response = await requestWithAccessToken(
        "get",
        `${process.env.REACT_APP_BE_URL}/api/event/liked?AjouNormal&page=${page}&size=${pageSize}&keyword=${keyword}`
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
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, keyword]);

  useEffect(() => {
    console.log(page);
  }, [page]);

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
          <LocationBar location="내가 찜한 이벤트"></LocationBar>
          <LikedSearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            setPage={setPage}
            setEvents={setEvents}
            setSavedKeyword={setSavedKeyword}
            setHasMore={setHasMore}
            fetchData={fetchData}
          />
          <LikedEvent
            events={events}
            bottomRef={bottomRef}
            loading={loading}
            hasMore={hasMore}
          />
        </MainContentContaioner>
      ) : (
        <Contaioner>
          <p>로그인이 필요한 서비스입니다</p>
        </Contaioner>
      )}
      <NavigationBar />
    </AppContaioner>
  );
}

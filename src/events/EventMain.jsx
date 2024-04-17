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
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (keyword === "") {
          response = await axios.get("https://ajou-event.shop/api/event/all");
        } else {
          // response = await ProductSearchApi(keyword);
        }
        setEvents(response.data.reverse()); // Reversing the order of events
        setLoading(false); // 데이터 로딩 완료 후 상태 업데이트
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 업데이트
      }
    };

    fetchData();
  }, [keyword]);

  // 데이터 로딩 중이면 로딩 표시
  if (loading) {
    return <p>Loading...</p>;
  }

  // 데이터가 없으면 빈 화면 표시
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
    </FlexContainer>
  );
};

export default EventMain;

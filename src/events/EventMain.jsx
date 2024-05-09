import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (keyword === "") {
          response = await axios.get("https://ajou-event.shop/api/event/all");
        } else {
          // response = await ProductSearchApi(keyword);
        }
        setEvents(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <FlexContainer>
      {events.map((event) => (
        <Link key={event.eventId} to={`/event/${event.eventId}`}>
          <EventCard
            title={event.title}
            imgUrl={event.imgUrl}
            star={event.star}
          />
        </Link>
      ))}
    </FlexContainer>
  );
};

export default EventMain;

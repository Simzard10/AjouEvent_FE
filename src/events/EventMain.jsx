import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useStore from "../store/useStore";

const departmentCodes = {
  AI모빌리티공학과: "AIMOBILITYENGINEERING",
  "아주대학교-일반": "AJOUNORMAL",
  "아주대학교-장학": "AJOUSCHOLARSHIP",
  인공지능융합학과: "APPLIEDARTIFICIALINTELLIGENCE",
  응용화학생명공학과: "APPLIEDCHEMISTRYBIOLOGICALENGINEERING",
  건축학과: "ARCHITECTURE",
  생명과학과: "BIOLOGICALSCIENCE",
  경영대학: "BUSINESS",
  경영학과: "BUSINESSADMINISTRATION",
  화학공학과: "CHEMICALENGINEERING",
  화학과: "CHEMISTRY",
  건설시스템공학과: "CIVILSYSTEMSENGINEERING",
  소프트웨어융합대학: "COMPUTINGINFORMATICS",
  문화콘텐츠학과: "CULTURECONTENTS",
  사이버보안학과: "CYBERSECURITY",
  다산학부대학: "DASAN",
  디지털미디어학과: "DIGITALMEDIA",
  경제학과: "ECONOMICS",
  전자공학과: "ELECTRICALCOMPUTERENGINEERING",
  공과대학: "ENGINEERING",
  영어영문학과: "ENGLISHLANGUAGELITERATURE",
  환경안전공학과: "ENVIRONMENTALSAFETYENGINEERING",
  금융공학과: "FINANCIALENGINEERING",
  불어불문학과: "FRENCHLANGUAGELITERATURE",
  글로벌경영학과: "GLOBALBUSINESS",
  대학원: "GRADUATE",
  사학과: "HISTORY",
  인문대학: "HUMANITIES",
  산업공학과: "INDUSTRIALENGINEERING",
  정보통신대학: "INFORMATIONTECHNOLOGY",
  융합시스템공학과: "INTEGRATIVESYSTEMSENGINEERING",
  지능형반도체공학과: "INTELLIGENCESEMICONDUCTORENGINEERING",
  국제학부대학: "INTERNATIONAL",
  국어국문학과: "KOREANLANGUAGELITERATURE",
  경영인텔리전스학과: "MANAGEMENTINTELLIGENCE",
  첨단신소재공학과: "MATERIALSSCIENCEENGINEERING",
  수학과: "MATHMATICS",
  기계공학과: "MECHANICALENGINEERING",
  의과대학: "MEDICINE",
  국방디지털융합학과: "MILITARYDIGITALCONVERGENCE",
  자연과학대학: "NATURALSCIENCE",
  간호대학: "NURSING",
  약학대학: "PHARMACY",
  물리학과: "PHYSICS",
  정치외교학과: "POLITICALSCIENCEDIPLOMACY",
  심리학과: "PSYCHOLOGY",
  행정학과: "PUBLICADMINISTRATION",
  사회과학대학: "SOCIALSCIENCE",
  사회학과: "SOCIOLOGY",
  소프트웨어학과: "SOFTWARE",
  스포츠레저학과: "SPORTSLEISURESTUDIES",
  교통시스템공학과: "TRANSPORTATIONSYSTEMSENGINEERING",
  테스트: "TEST",
};

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
  const { keyword, setKeyword, type, setType } = useStore((state) => ({
    keyword: state.keyword,
    setKeyword: state.setKeyword,
    type: state.type,
    setType: state.setType,
  }));

  const pageSize = 10;

  const bottomRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=${page}&size=${pageSize}&keyword=${keyword}`
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
  }, [loading, hasMore, page, type, keyword]);

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
      if (type === "" || keyword === "") {
        setType("아주대학교-일반");
        setKeyword("");
      }
      setLoading(true);
      setEvents([]);
      setPage(0);
      setHasMore(true);

      try {
        console.log(
          `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=0&size=${pageSize}&keyword=${keyword}`
        );
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=0&size=${pageSize}&keyword=${keyword}`
        );
        const newEvents = response.data.result;

        if (newEvents.length === 0) {
          setHasMore(false);
        } else {
          setEvents(newEvents);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitData();
  }, [type, keyword]);

  if (loading && events.length === 0) {
    return (
      <FlexContainer>
        <ErrorMessage>Loading...</ErrorMessage>
      </FlexContainer>
    );
  }

  if (events.length === 0) {
    return (
      <FlexContainer>
        <ErrorMessage>No events found...</ErrorMessage>
      </FlexContainer>
    );
  }

  return (
    <>
      <FlexContainer>
        {events.map((event, index) => (
          <EventCard
            key={`${event.eventId}-${index}`}
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

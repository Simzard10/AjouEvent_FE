import styled from "styled-components";
import EventCard from "./EventCard";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import useStore from "../store/useStore";

const departmentCodes = {
  AI모빌리티공학과: "AIMobilityEngineering",
  "아주대학교-일반": "AjouNormal",
  "아주대학교-장학": "AjouScholarship",
  인공지능융합학과: "AppliedArtificialIntelligence",
  응용화학생명공학과: "AppliedChemistryBiologicalEngineering",
  건축학과: "Architecture",
  생명과학과: "BiologicalScience",
  경영대학: "Business",
  경영학과: "BusinessAdministration",
  화학공학과: "ChemicalEngineering",
  화학과: "Chemistry",
  건설시스템공학과: "CivilSystemsEngineering",
  소프트웨어융합대학: "ComputingInformatics",
  문화콘텐츠학과: "CultureContents",
  사이버보안학과: "CyberSecurity",
  다산학부대학: "Dasan",
  디지털미디어학과: "DigitalMedia",
  경제학과: "Economics",
  전자공학과: "ElectricalComputerEngineering",
  공과대학: "Engineering",
  영어영문학과: "EnglishLanguageLiterature",
  환경안전공학과: "EnvironmentalSafetyEngineering",
  금융공학과: "FinancialEngineering",
  불어불문학과: "FrenchLanguageLiterature",
  글로벌경영학과: "GlobalBusiness",
  대학원: "Graduate",
  사학과: "History",
  인문대학: "Humanities",
  산업공학과: "IndustrialEngineering",
  정보통신대학: "InformationTechnology",
  융합시스템공학과: "IntegrativeSystemsEngineering",
  지능형반도체공학과: "IntelligenceSemiconductorEngineering",
  국제학부대학: "International",
  국어국문학과: "KoreanLanguageLiterature",
  경영인텔리전스학과: "ManagementIntelligence",
  첨단신소재공학과: "MaterialsScienceEngineering",
  수학과: "Mathmatics",
  기계공학과: "MechanicalEngineering",
  의과대학: "Medicine",
  국방디지털융합학과: "MilitaryDigitalConvergence",
  자연과학대학: "NaturalScience",
  간호대학: "Nursing",
  약학대학: "Pharmacy",
  물리학과: "Physics",
  정치외교학과: "PoliticalScienceDiplomacy",
  심리학과: "Psychology",
  행정학과: "PublicAdministration",
  사회과학대학: "SocialScience",
  사회학과: "Sociology",
  소프트웨어학과: "Software",
  스포츠레저학과: "SportsLeisureStudies",
  교통시스템공학과: "TransportationSystemsEngineering",
  테스트: "Test",
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
  const accessToken = localStorage.getItem("accessToken");

  const pageSize = 10;

  const bottomRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=${page}&size=${pageSize}&keyword=${keyword}`,
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
      // if (type === "" || keyword === "") {
      //   setType("아주대학교-일반");
      //   setKeyword("");
      // }
      setLoading(true);
      setEvents([]);
      setPage(0);
      setHasMore(true);

      try {
        console.log(
          `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=0&size=${pageSize}&keyword=${keyword}`
        );
        // 비동기적으로 type 설정되어서 departmentCodes[type] 가 undefined 뜰 때 오류나길래 예외처리함.
        if (!departmentCodes[type]) {
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/event/${departmentCodes[type]}?page=0&size=${pageSize}&keyword=${keyword}`,
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
            subject={event.subject}
            imgUrl={event.imgUrl}
            likesCount={event.likesCount}
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

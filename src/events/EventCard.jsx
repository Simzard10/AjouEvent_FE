import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CardContainer = styled.div`
  width: calc(48% - 1rem);
  height: 12rem;
  text-decoration: none;
  margin: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* 호버 시 그림자 효과 추가 */
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 8rem;
`;

const DetailsContainer = styled.div`
  padding: 4px 10px;
`;

const ImageWapper = styled.div`
  width: 20px;
  height: 20px;
  object-fit: cover;
  cursor: pointer;
`;

const TitleText = styled.div`
  height: 20px;
  font-size: 0.7rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 4px;
`;

const EventCard = ({ id, title, imgUrl, star }) => {
  const [cardStar, setCardStar] = useState(star);
  const navigate = useNavigate();

  const handleStarClick = async (e) => {
    e.stopPropagation();

    try {
      let accessToken = localStorage.getItem("accessToken");
      if (cardStar) {
        await axios.delete(`https://ajou-event.shop/api/event/like/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCardStar(!cardStar);
      } else {
        await axios.post(
          `https://ajou-event.shop/api/event/like/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCardStar(!cardStar);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/${id}`);
  };
  return (
    <CardContainer onClick={handleCardClick}>
      <Image src={imgUrl} alt={title} />
      <DetailsContainer>
        <TitleText>{title}</TitleText>
        <SubDetailContainer>
          <ImageWapper onClick={handleStarClick}>
            {cardStar ? (
              <FilledStarIcon></FilledStarIcon>
            ) : (
              <EmptyStarIcon></EmptyStarIcon>
            )}
          </ImageWapper>
        </SubDetailContainer>
      </DetailsContainer>
    </CardContainer>
  );
};

export default EventCard;

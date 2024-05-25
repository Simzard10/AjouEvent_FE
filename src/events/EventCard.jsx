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

const SubjectText = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  color: rgb(0, 102, 179);
`;

const LikeCountText = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
`;

const SubDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const LikeContainer = styled.div`
  display: flex;
  width: 30px;
  justify-content: space-between;
  align-items: center;
`;

const EventCard = ({ id, title, subject, imgUrl, likesCount, star }) => {
  const [cardStar, setCardStar] = useState(star);
  const [likesCount, setLikesCount] = useState(likesCount);
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
        setLikesCount(likesCount - 1);
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
        setLikesCount(likesCount + 1);
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
          <SubjectText>{subject}</SubjectText>
          <LikeContainer>
            <ImageWapper onClick={handleStarClick}>
              {cardStar ? (
                <FilledStarIcon></FilledStarIcon>
              ) : (
                <EmptyStarIcon></EmptyStarIcon>
              )}
            </ImageWapper>
            <LikeCountText>{likesCount}</LikeCountText>
          </LikeContainer>
        </SubDetailContainer>
      </DetailsContainer>
    </CardContainer>
  );
};

export default EventCard;

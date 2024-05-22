import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";
import { Link } from "react-router-dom";
import axios from "axios";

const CardContainer = styled(Link)`
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
  const handleStarClick = async (e) => {
    e.stopPropagation();
    try {
      let accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://ajou-event.shop/api/event/like/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.successContent);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <CardContainer to={`/${id}`}>
      <Image src={imgUrl} alt={title} />
      <DetailsContainer>
        <TitleText>{title}</TitleText>
        <SubDetailContainer onClick={handleStarClick}>
          <ImageWapper>
            {star ? (
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

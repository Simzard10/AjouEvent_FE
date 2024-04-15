import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";

const CardContainer = styled.div`
  width: 43%;
  margin: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;

  cursor: pointer;
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
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const SubDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 4px;
`;

const EventCard = ({ id, title, imgUrl, star }) => {
  const handleCardClick = () => {
    // history.push(`/product/detail/${id}`);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <Image src={imgUrl} alt={title} />
      <DetailsContainer>
        <TitleText>{title}</TitleText>
        <SubDetailContainer>
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

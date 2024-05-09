import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";
import { Link } from "react-router-dom";

const CardContainer = styled(Link)`
  width: calc(50% - 10px);
  height: 15rem;
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
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap; /* 텍스트가 넘치면 한 줄로 표시 */
  overflow: hidden; /* 넘치는 부분은 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
`;

const SubDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 4px;
`;

const EventCard = ({ id, title, imgUrl, star }) => {
  return (
    <CardContainer to={`/event/${id}`}>
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

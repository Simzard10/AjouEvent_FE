import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TapWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 0px 16px 0px;
  gap: 8px;
`;

const TapIcon = styled.img`
  margin-left: 24px;
  aspect-ratio: 1;
  width: 20px;
  object-fit: contain;
  object-position: center;
  cursor: pointer; /* 클릭 가능한 아이콘 표시 */
`;

const TapTitle = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const TabBar = ({ Title }) => {
  const navigate = useNavigate();

  const arrowBackClicked = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/event");
    }
  };

  return (
    <TapWrapper>
      <TapIcon
        onClick={arrowBackClicked}
        loading="lazy"
        src={`${process.env.PUBLIC_URL}/icons/arrow_back.svg`}
      />
      <TapTitle>{Title}</TapTitle>
    </TapWrapper>
  );
};

export default TabBar;

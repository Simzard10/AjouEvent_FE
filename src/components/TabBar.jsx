import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import styled from "styled-components";

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
`;

const TapTitle = styled.h1`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const TabBar = ({ Title }) => {
  return (
    <TapWrapper>
      <TapIcon
        onClick={() => window.history.back()}
        loading="lazy"
        src={`${process.env.PUBLIC_URL}/icons/arrow_back.svg`}
      />
      <TapTitle>{Title}</TapTitle>
    </TapWrapper>
  );
};

export default TabBar;

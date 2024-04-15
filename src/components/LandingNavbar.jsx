import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GetUserPermission from "../fcm/GetUserPermission";

const NavbarContainer = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100vw;
  height: 3rem;
  padding: 1rem 0 1rem 0;
  background-color: rgb(0, 102, 179);
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 50%;
  height: 100%;
  height: inherit;
  background-color: inherit;
  text-decoration: none;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 50%;
  height: 100%;
  height: inherit;
  background-color: inherit;
`;

const LogoText = styled.span`
  align-items: center;
  width: 12rem;
  height: 1.5rem;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.5rem;
  color: white;
  margin-left: 1rem;
`;

const AlarmImg = styled.img`
  width: 4vw;
  height: 4vh;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor};
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  border: 0;
  width: 5rem;
  height: 1.4rem;
  color: ${(props) => props.color};
  font-size: 0.8rem;
  text-decoration: none;
  margin: 0 1rem 0 1rem;
`;
export default function LandingNavbar() {
  const handleAlarmClick = () => {
    GetUserPermission();
  };
  return (
    <NavbarContainer>
      <LogoContainer to="/">
        <LogoText>아주대 공지사항 알림</LogoText>
      </LogoContainer>
      <BtnContainer>
        <AlarmImg
          alt="알람"
          src={`${process.env.PUBLIC_URL}/icons/mdi_bell.svg`}
          onClick={handleAlarmClick}
        ></AlarmImg>
        <StyledLink bgcolor={"white"} color={"black"} to="/signIn">
          로그인하기
        </StyledLink>
      </BtnContainer>
    </NavbarContainer>
  );
}
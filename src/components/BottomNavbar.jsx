import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarContainer = styled.div`
  z-index: 5;
  position: fixed;
  bottom: 0;
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

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: inherit;
  background-color: inherit;
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

export default function BottomNavbar() {
  return (
    <NavbarContainer>
      <BtnContainer>
        <StyledLink bgcolor={"white"} color={"black"} to="/">
          홈
        </StyledLink>
        <StyledLink bgcolor={"white"} color={"black"} to="/events">
          이벤트페이지
        </StyledLink>
        <StyledLink bgcolor={"white"} color={"black"} to="/">
          찜한 페이지
        </StyledLink>
        <StyledLink bgcolor={"white"} color={"black"} to="/">
          마이페이지
        </StyledLink>
      </BtnContainer>
    </NavbarContainer>
  );
}

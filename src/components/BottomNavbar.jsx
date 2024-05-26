import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";

const NavbarContainer = styled.div`
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 0;
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

export default function BottomNavbar() {
  return (
    <NavbarContainer>
      <BtnContainer>
        <NavButton selected={false} link={"/subscribe"} icon={"Subscribe"} />
        <NavButton selected={true} link={"/"} icon={"Home"} />
        <NavButton selected={false} link={"/saved"} icon={"Bookmark"} />
        <NavButton selected={false} link={"/mypage"} icon={"Mypage"} />
      </BtnContainer>
    </NavbarContainer>
  );
}

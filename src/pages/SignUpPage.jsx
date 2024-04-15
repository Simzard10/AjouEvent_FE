import React from "react";
import SignUp from "../components/SignUp";
import LandingNavbar from "../components/LandingNavbar";
import styled from "styled-components";

const AppContaioner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export default function SignUpPage() {
  return (
    <AppContaioner>
      <LandingNavbar></LandingNavbar>
      <SignUp></SignUp>
    </AppContaioner>
  );
}

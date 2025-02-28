import React from 'react';
import Login from './Login';
import styled from 'styled-components';
import NavigationBar from '../../components/NavigationBar';
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
  width: 100vw;
  overflow-x: hidden;
`;

export default function LoginPage() {
  return (
    <AppContainer>
      <Login></Login>
      <NavigationBar></NavigationBar>
    </AppContainer>
  );
}

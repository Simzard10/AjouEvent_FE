import React from 'react';
import styled from 'styled-components';
import NavigationBar from '../../components/NavigationBar';
import DeleteAccount from '../../components/DeleteAccount';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100vw;
  overflow-x: hidden;
`;

export default function DeleteAccountPage() {
  return (
    <AppContainer>
      <DeleteAccount></DeleteAccount>
      <NavigationBar></NavigationBar>
    </AppContainer>
  );
}

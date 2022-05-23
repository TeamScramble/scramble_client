import React, { useContext, useEffect } from 'react';
import Main from 'pages/main/Main';
import WaitingRoom from 'pages/waitingRoom/WaitingRoom';
import styled from 'styled-components';
import Router from 'router';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import ContextProvider, {
  UserContextProvider,
  PageContextProvider,
  PageContext,
  SocketContextProvider,
  GameContextProvider,
} from 'context';

import { Reset } from 'styled-reset';

const MainWrapper = styled.main`
  background-color: #f6f6f6;
  width: 100%;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
`;

const App = () => {
  const { currentPage, dispatchCurrentPage } = useContext(PageContext);

  return (
    <ContextProvider
      contexts={[
        UserContextProvider,
        PageContextProvider,
        SocketContextProvider,
        GameContextProvider,
      ]}
    >
      <BrowserRouter>
        <Reset />
        <MainWrapper>
          <Router currentPage={currentPage} />
        </MainWrapper>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;

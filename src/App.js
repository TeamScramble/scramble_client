import React, { useContext, useEffect } from 'react';
import Main from 'components/main/Main';
import WaitingRoom from 'components/waitingRoom/WaitingRoom';
import styled from 'styled-components';
import Router from 'components/router';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import ContextProvider, {
  UserContextProvider,
  PageContextProvider,
  PageContext,
  SocketContextProvider,
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

  useEffect(() => {
    console.log('currentPage', currentPage);
  }, []);
  return (
    <ContextProvider
      contexts={[
        UserContextProvider,
        PageContextProvider,
        SocketContextProvider,
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

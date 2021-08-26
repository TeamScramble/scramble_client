import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from 'components/main/Main';
import styled from 'styled-components';
import { Reset } from 'styled-reset';

const MainWrapper = styled.main`
  background-color: #f6f6f6;
  width: 100%;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
`;

const App = () => {
  return (
    <React.Fragment>
      <Reset />

      <MainWrapper>
        <Main />
      </MainWrapper>
    </React.Fragment>
  );
};

export default App;

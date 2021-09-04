import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/react';

import styled from 'styled-components';

const loadingStyle = css`
  display: block;
  margin: 0 auto !important;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingString = styled.div`
  font-family: 'CookieRun';
  font-weight: 700;
  margin: 0 5px 30px 0;
  font-size: 45px;
  .word {
    &:nth-child(5n + 1) {
      color: #ff8080;
    }
    &:nth-child(5n + 2) {
      color: #ff8b3d;
    }
    &:nth-child(5n + 3) {
      color: #fed000;
    }
    &:nth-child(5n + 4) {
      color: #77d077;
    }
    &:nth-child(5n) {
      color: #87ceeb;
    }
  }
`;

const Loading = ({ color = '#ccf6c8', loadingString = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <LoadingString>
        {loadingString.split('').map(item => {
          return <span className={item !== ' ' ? 'word' : 'space'}>{item}</span>;
        })}
      </LoadingString>
      <PulseLoader color={color} css={loadingStyle} speedMultiplier={0.5} size={14} />
    </LoadingContainer>
  );
};

export default Loading;

import React from 'react';
import logo from 'public/images/scramble_logo2.png';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: 100px;
`;

const GameRoomHeader = () => {
  return (
    <HeaderContainer>
      <Image src={logo} alt="스크램블 로고" />
    </HeaderContainer>
  );
};

export default GameRoomHeader;

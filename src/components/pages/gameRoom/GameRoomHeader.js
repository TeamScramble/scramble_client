import React from 'react';
import logo from 'public/images/scramble_logo2.png';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  margin-right: auto;
`;

const Image = styled.img`
  height: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const GameRoomHeader = () => {
  const handleClickLogo = () => {
    window.location.reload();
  };
  return (
    <HeaderContainer>
      <Image src={logo} alt="스크램블 로고" onClick={handleClickLogo} />
    </HeaderContainer>
  );
};

export default GameRoomHeader;

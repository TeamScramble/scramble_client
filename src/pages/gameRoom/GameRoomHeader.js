import React, { useContext, useEffect, useState } from 'react';
import logo from 'public/images/scramble_logo2.png';
import styled from 'styled-components';
import Timer from 'pages/gameRoom/Timer';
import Rounder from 'pages/gameRoom/Rounder';
import { SocketContext } from 'context';

const HeaderContainer = styled.div`
  display: flex;
  margin-right: auto;
  flex-direction: column;
`;

const Image = styled.img`
  height: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const GameInfoContainer = styled.div`
  width: 100%;
  margin: 10px 0;
  background-color: white;
  display: flex;
  align-items: center;
`;

const GameRoomHeader = () => {
  const [maxRound, setMaxRound] = useState(0);
  const [round, setRound] = useState(0);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('start round', data => {
      setMaxRound(data.max_round);
      setRound(data.round);
      socket.emit('ready set', {});
    });
  }, []);

  const handleClickLogo = () => {
    window.location.reload();
  };
  return (
    <HeaderContainer>
      <Image src={logo} alt="스크램블 로고" onClick={handleClickLogo} />
      <GameInfoContainer>
        <Timer />
        <Rounder round={round} maxRound={maxRound} />
      </GameInfoContainer>
    </HeaderContainer>
  );
};

export default GameRoomHeader;

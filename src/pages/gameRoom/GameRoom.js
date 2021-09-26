import React, { useEffect, useContext, useState } from 'react';
import { SocketContext, GameContext, UserContext } from 'context';
import styled from 'styled-components';
import { CopyArea } from 'components/helpers';
import GameRoomHeader from './GameRoomHeader';
import Chat from './Chat';
import WhiteBoard from './WhiteBoard';
import GameUsers from './GameUsers';

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameContentWrapper = styled.div`
  margin: 0 0 80px 0;
  height: 600px;

  display: flex;
`;

const GameRoom = () => {
  const socket = useContext(SocketContext);
  const { roomId } = useContext(UserContext);

  return (
    <Wrapper>
      <GameRoomHeader />

      <GameContentWrapper>
        <GameUsers />
        <WhiteBoard />
        <Chat />
      </GameContentWrapper>
      <CopyArea text={`localhost:3000/?room_id=${roomId}`} />
    </Wrapper>
  );
};

export default GameRoom;

import React, { useEffect, useContext, useState } from 'react';
import { SocketContext, GameContext, UserContext } from 'context';
import styled from 'styled-components';
import { CopyArea } from 'components/helpers';
import GameRoomHeader from './GameRoomHeader';
import Chat from './Chat/Chat';
import GameUsers from './GameUsers';

const Wrapper = styled.div`
  padding: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameContentWrapper = styled.div`
  height: 600px;
  background-color: #fff;
  display: flex;
`;

const GameRoom = () => {
  const socket = useContext(SocketContext);
  const { roomId } = useContext(UserContext);
  const { userList, dispatchUserList } = useContext(GameContext);

  useEffect(() => {
    socket.on('update user', data => {
      dispatchUserList(data.users);
    });
  }, []);

  return (
    <Wrapper>
      <GameRoomHeader />

      <GameContentWrapper>
        <GameUsers userList={userList} />
        <Chat />
      </GameContentWrapper>
      <CopyArea text={`localhost:3000/?room_id=${roomId}`} />
    </Wrapper>
  );
};

export default GameRoom;

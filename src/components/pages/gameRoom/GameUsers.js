import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import crownIcon from 'public/images/crown.svg';
import { SocketContext, GameContext } from 'context';

const UserWrapper = styled.div`
  margin: 0 10px 0 0;
  width: 190px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;

  .me {
    color: #777;
  }
`;

const Icon = styled.img`
  width: 20px;
  margin: 0 5px 0 0;
`;

const Users = () => {
  const socket = useContext(SocketContext);
  const { userList, dispatchUserList, questioner, dispatchQuestioner } =
    useContext(GameContext);

  return (
    <UserWrapper>
      {userList.map(item => {
        return (
          <UserItem key={item.id}>
            {userList[0].id === item.id && <Icon src={crownIcon} alt="방장 아이콘" />}
            <div>
              {item.nickname}
              <span className="me">{item.id === socket.id && ' (나)'}</span>
              <span className="me">{questioner.id === item.id && ' 출제자'}</span>
              <span className="me">'점수': {item.score}</span>
            </div>
          </UserItem>
        );
      })}
    </UserWrapper>
  );
};

export default Users;

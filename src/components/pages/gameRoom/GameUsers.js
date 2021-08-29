import React, { useContext } from 'react';
import styled from 'styled-components';
import crownIcon from 'public/images/crown.svg';
import { SocketContext } from 'context';

const UserWrapper = styled.div``;

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

const Users = ({ userList }) => {
  const socket = useContext(SocketContext);

  return (
    <UserWrapper>
      {userList.map(item => {
        return (
          <UserItem key={item.id}>
            {userList[0].id === item.id && <Icon src={crownIcon} alt="방장 아이콘" />}
            <div>
              {item.nickname}
              <span className="me">{item.id === socket.id && ' (나)'}</span>
            </div>
          </UserItem>
        );
      })}
    </UserWrapper>
  );
};

export default Users;

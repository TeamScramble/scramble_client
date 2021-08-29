import React, { useContext } from 'react';
import styled from 'styled-components';
import { SocketContext } from 'context';
import ownerIcon from 'public/images/crown.svg';

const UserListWrapper = styled.div`
  display: flex;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 0 10px 10px 0;
  .nickname {
  }
  .me {
    color: #777;
  }
`;

const Icon = styled.img`
  width: 20px;
  margin: 0 5px 0 0;
`;

const WaitingUsers = ({ users }) => {
  const socket = useContext(SocketContext);
  return (
    <UserListWrapper>
      {users.map((item, index) => {
        return (
          <UserItem key={item.id}>
            {index === 0 && <Icon src={ownerIcon} alt="방장 아이콘" />}
            <div className="nickname">
              {item.nickname}
              <span className="me">{item.id === socket.id && ' (나)'}</span>
            </div>
          </UserItem>
        );
      })}
    </UserListWrapper>
  );
};

export default WaitingUsers;

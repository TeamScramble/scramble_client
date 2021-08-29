import React, { createContext, useState } from 'react';
import generateName from 'ko-nickname';

const defaultUserInfo = {
  nickname: '',
  dispatchNickname: () => {},
  roomId: '',
  dispatchRoomId: () => {},
  userId: '',
  dispatchUserId: () => {},
};

export const UserContext = createContext(defaultUserInfo);

export const UserContextProvider = ({ children }) => {
  const [nickname, setNickname] = useState(generateName());
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');

  const dispatchNickname = nickname => {
    setNickname(nickname);
  };
  const dispatchRoomId = id => {
    setRoomId(id);
  };
  const dispatchUserId = id => {
    setUserId(id);
  };

  return (
    <UserContext.Provider
      value={{
        nickname,
        dispatchNickname,
        roomId,
        dispatchRoomId,
        userId,
        dispatchUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

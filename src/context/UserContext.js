import React, { createContext, useState } from 'react';
import generateName from 'ko-nickname';

const defaultUserInfo = {
  nickname: '',
  dispatchNickname: () => {},
  roomId: '',
  dispatchRoomId: () => {},
  userId: '',
  dispatchUserId: () => {},
  isSoved: false,
  dispatchIsSolved: () => {},
};

export const UserContext = createContext(defaultUserInfo);

export const UserContextProvider = ({ children }) => {
  const [nickname, setNickname] = useState(generateName());
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  const dispatchNickname = nickname => {
    setNickname(nickname);
  };
  const dispatchRoomId = id => {
    setRoomId(id);
  };
  const dispatchUserId = id => {
    setUserId(id);
  };
  const dispatchIsSolved = status => {
    setIsSolved(status);
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
        isSolved,
        dispatchIsSolved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

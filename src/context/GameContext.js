import React, { createContext, useState } from 'react';

const defaultGameInfo = {
  userList: '',
  dispatchUserList: () => {},
};

export const GameContext = createContext(defaultGameInfo);

export const GameContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const dispatchUserList = userList => {
    setUserList(userList);
  };

  return (
    <GameContext.Provider value={{ userList, dispatchUserList }}>
      {children}
    </GameContext.Provider>
  );
};

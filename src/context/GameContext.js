import React, { createContext, useState } from 'react';

const defaultGameInfo = {
  userList: [],
  dispatchUserList: () => {},
  questioner: {
    id: '',
    nickname: '',
  },
  dispatchQuestioner: () => {},
};

export const GameContext = createContext(defaultGameInfo);

export const GameContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const [questioner, setQuestioner] = useState({ id: '', nickname: '' });
  const dispatchUserList = userList => {
    setUserList(userList);
  };

  const dispatchQuestioner = questionerData => {
    setQuestioner(questionerData);
  };

  return (
    <GameContext.Provider
      value={{ userList, dispatchUserList, questioner, dispatchQuestioner }}
    >
      {children}
    </GameContext.Provider>
  );
};

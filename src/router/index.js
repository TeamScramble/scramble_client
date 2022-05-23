import React, { useContext } from 'react';
import Main from 'pages/main/Main';
import WaitingRoom from 'pages/waitingRoom/WaitingRoom';
import GameRoom from 'pages/gameRoom/GameRoom';
import { PageContext } from 'context';

const Router = () => {
  const { currentPage } = useContext(PageContext);
  switch (currentPage) {
    case 'main':
      return <Main />;
    case 'waitingRoom':
      return <WaitingRoom />;
    case 'gameRoom':
      return <GameRoom />;
    default:
      return <Main />;
  }
};

export default Router;

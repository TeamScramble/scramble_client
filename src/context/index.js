import React from 'react';

import { UserContextProvider, UserContext } from 'context/UserContext';
import { PageContextProvider, PageContext } from 'context/PageContext';
import { SocketContextProvider, SocketContext } from 'context/SocketContext';
import { GameContextProvider, GameContext } from './GameContext';

export default function ContextProvider({ contexts, children }) {
  return contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children,
  );
}

export { UserContextProvider, UserContext };
export { PageContextProvider, PageContext };
export { SocketContextProvider, SocketContext };
export { GameContextProvider, GameContext };

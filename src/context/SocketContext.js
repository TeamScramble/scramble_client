import React, { useState, createContext } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://127.0.0.1:8080/';

export const socket = io(SOCKET_URL);
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SocketContext } from 'context';
import ChatBubble from './ChatBubble';
import ChatBar from './ChatBar';

const ChatWrapper = styled.div`
  position: relative;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const ChatContainer = styled.div`
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  height: 550px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 10px;
  }
`;

const ChatBarContainer = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 1px;
`;

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log('hi');
    socket.on('show message', data => {
      setMessageList(messageList => [...messageList, data]);
    });
  }, []);

  return (
    <ChatWrapper>
      <ChatContainer>
        {messageList
          .slice()
          .reverse()
          .map(item => {
            return <ChatBubble key={item.id} item={item} />;
          })}
      </ChatContainer>
      <ChatBarContainer>
        <ChatBar messageInput={messageInput} setMessageInput={setMessageInput} />
      </ChatBarContainer>
    </ChatWrapper>
  );
};

export default Chat;

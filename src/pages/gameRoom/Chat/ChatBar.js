import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SocketContext } from 'context';

const ChatBarWrapper = styled.div`
  border-top: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
  display: flex;
  height: 100%;
`;

const ChatInput = styled.input`
  outline: none;
  flex: 5;
  border: none;
`;

const EnterButton = styled.button`
  background-color: #f9c0c0;
  flex: 1;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const ChatBar = ({ messageInput, setMessageInput }) => {
  const socket = useContext(SocketContext);

  const handleMessageInput = e => {
    setMessageInput(e.target.value);
  };

  const SendMessage = () => {
    if (messageInput) {
      socket.emit('send message', { message: messageInput }, error => {
        if (error) {
          alert(error);
        }
      });
      setMessageInput('');
    }
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      SendMessage();
    }
  };

  return (
    <ChatBarWrapper>
      <ChatInput
        value={messageInput}
        onChange={handleMessageInput}
        onKeyUp={handleEnter}
      />
      <EnterButton onClick={SendMessage}>전송</EnterButton>
    </ChatBarWrapper>
  );
};

export default ChatBar;

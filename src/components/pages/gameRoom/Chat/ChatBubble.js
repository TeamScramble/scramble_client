import { socket } from 'context/SocketContext';
import React from 'react';
import styled, { css } from 'styled-components';

const ChatBubbleContainer = styled.div`
  margin: 0 0 10px 0;

  .messageContainer {
    span {
      word-break: break-word;
      width: auto;
      height: auto;
      flex-basis: content;
      align-items: center;
      border: 1px solid #ddd;
      padding: 10px 10px;
    }
  }

  ${props =>
    props.isMine
      ? css`
          margin-left: auto;
          .messageContainer {
            display: flex;

            span {
              margin-left: auto;
              word-break: break-word;
              width: auto;
              height: auto;
              flex-basis: content;
              align-items: center;
              border: 1px solid #ddd;
              padding: 10px 10px;
              border-radius: 17px 0 17px 17px;
            }
          }
        `
      : css`
          .messageContainer {
            display: flex;
            span {
              border-radius: 0 17px 17px 17px;
            }
          }
        `}

  .nickname {
    font-size: 13px;
    margin: 0 0 5px 0;
  }
`;

const ChatBubble = ({ item }) => {
  return (
    <ChatBubbleContainer isMine={item.user_id === socket.id}>
      <div className="nickname">{item.nickname}</div>
      <div className="messageContainer">
        <span>{item.message}</span>
      </div>
    </ChatBubbleContainer>
  );
};

export default ChatBubble;

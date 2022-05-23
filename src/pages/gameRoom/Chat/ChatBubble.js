import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { MESSAGE_TYPE } from 'components/helpers/constants';
import { SocketContext, UserContext } from 'context';

const MyMessage = css`
  margin-left: auto;
  .messageContainer {
    display: flex;
    flex-basis: content;
    align-items: center;
    width: auto;
    height: auto;
    span {
      margin-left: auto;
      word-break: break-word;
      border: 1px solid #ddd;
      padding: 10px 10px;
      border-radius: 17px 0 17px 17px;
    }
  }
`;

const MySolvedMessage = css`
  ${() => MyMessage};
  color: gray;
`;

const OtherSolvedMessage = css`
  ${() => OtherMessage}
  color: gray;
`;

const OtherMessage = css`
  .messageContainer {
    display: flex;
    flex-basis: content;
    align-items: center;
    width: auto;
    height: auto;
    span {
      word-break: break-word;

      border: 1px solid #ddd;
      padding: 10px 10px;

      border-radius: 0 17px 17px 17px;
    }
  }
`;

const CorrectMessage = css`
  color: green;
  border: none;
`;

const SystemMessage = css`
  color: blue;
  border: none;
`;

const Solved = css`
  color: red;
  border: none;
`;

const ChatBubbleContainer = styled.div`
  margin: 0 0 10px 0;

  ${props => {
    switch (props.type) {
      case MESSAGE_TYPE.correct:
        return CorrectMessage;
      case MESSAGE_TYPE.system:
        return SystemMessage;
      case MESSAGE_TYPE.solved:
        return props.isMine ? MySolvedMessage : OtherSolvedMessage;

      case MESSAGE_TYPE.all:
        return props.isMine ? MyMessage : OtherMessage;
      default:
        return;
    }
  }}

  .nickname {
    font-size: 13px;
    margin: 0 0 5px 0;
  }
`;

const ChatBubble = ({ item }) => {
  const socket = useContext(SocketContext);
  const { isSolved } = useContext(UserContext);
  if (item.type === MESSAGE_TYPE.solved) {
    return isSolved ? (
      <ChatBubbleContainer isMine={item.user_id === socket.id} type={item.type}>
        <div className="nickname">{item.nickname}</div>
        <div className="messageContainer">
          <span>{item.message}</span>
        </div>
      </ChatBubbleContainer>
    ) : (
      <div />
    );
  } else {
    return (
      <ChatBubbleContainer isMine={item.user_id === socket.id} type={item.type}>
        {item.type === MESSAGE_TYPE.all ? (
          <>
            <div className="nickname">{item.nickname}</div>
            <div className="messageContainer">
              <span>{item.message}</span>
            </div>
          </>
        ) : (
          <span>{item.message}</span>
        )}
      </ChatBubbleContainer>
    );
  }
};

export default ChatBubble;

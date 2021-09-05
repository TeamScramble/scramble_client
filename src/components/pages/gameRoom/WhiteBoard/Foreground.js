import React, { useEffect, useContext } from 'react';
import { SocketContext, GameContext } from 'context';
import styled from 'styled-components';
import { FOREGROUND_TYPE } from 'components/helpers/constants';

const Container = styled.div`
  width: 700px;
  height: 600px;
  background-color: ${props => (props.isStarted ? 'none' : '#999')};
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .words {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wordButton {
    outline: none;
    margin: 0 10px 0 0;
    border: 1px solid #777;
    border-radius: 4px;
    background-color: #fff;
    padding: 10px 20px;
    font-weight: 700;

    font-size: 20px;

    &:hover {
      cursor: pointer;
    }

    &:active {
      background: #ccc;
    }
  }

  .solver {
    font-weight: 700;
    font-size: 20px;
  }
`;

const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  background-color: #fff;
  .title {
    font-size: 25px;
    font-family: 'CookieRun';
    font-weight: 700;
  }
  .scoreBoard {
    font-size: 18px;
    font-weight: 700;
  }
`;

const Foreground = ({
  isQuestioner,
  words,
  isStarted,
  questionerName,
  setIsStarted,
  type,
  prevUsers,
}) => {
  const socket = useContext(SocketContext);
  const { userList } = useContext(GameContext);

  useEffect(() => {}, [userList, prevUsers]);

  const handleClickWord = word => {
    socket.emit('choice word', { word: word });
    setIsStarted(true);
  };
  if (type === FOREGROUND_TYPE.choiceWord) {
    return (
      <Container isStarted={isStarted}>
        {isQuestioner ? (
          <div className="words">
            {words.map((item, index) => {
              return (
                <button
                  className="wordButton"
                  key={index}
                  onClick={() => handleClickWord(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        ) : (
          !isStarted && (
            <div className="solver">{`${questionerName}님이 문제를 고르고 있어요`}</div>
          )
        )}
      </Container>
    );
  } else if (type === FOREGROUND_TYPE.finishSet) {
    return (
      <Container>
        <FinishContainer>
          <div className="title">점수표</div>
          <div className="scoreBoard">
            {userList.map((item, index) => {
              return (
                <div key={index}>
                  {`${item.nickname} : ${prevUsers[index].score} -> ${item.score} (+${
                    item.score - prevUsers[index].score
                  })`}
                </div>
              );
            })}
          </div>
        </FinishContainer>
      </Container>
    );
  }
};

export default Foreground;

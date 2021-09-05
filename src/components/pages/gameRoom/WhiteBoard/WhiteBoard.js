import React, { useState, useEffect, useContext } from 'react';
import { SocketContext, GameContext, UserContext } from 'context';
import WhiteBoardContent from './WhiteBoardContent';
import styled from 'styled-components';
import Foreground from './Foreground';
import { FOREGROUND_TYPE } from 'components/helpers/constants';

const Container = styled.div`
  border: 1px solid #ddd;

  position: relative;
  margin: 0 10px 0 0;
`;

const WhiteBoard = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [words, setWords] = useState([]);
  const [foregroundType, setForegroundType] = useState(FOREGROUND_TYPE.choiceWord);
  const [prevUsers, setPrevUsers] = useState([]);
  const [time, setTime] = useState(0);
  const socket = useContext(SocketContext);
  const { questioner, dispatchQuestioner, userList, dispatchUserList } =
    useContext(GameContext);
  const { isSolved, dispatchIsSolved } = useContext(UserContext);

  useEffect(() => {
    socket.on('choice word', data => {
      setIsStarted(false);
      setPrevUsers(userList);
      setWords(data.words);
      setForegroundType(FOREGROUND_TYPE.choiceWord);
      dispatchQuestioner({ id: data.questioner.id, nickname: data.questioner.nickname });
    });

    socket.on('start set', data => {
      setIsStarted(true);
    });

    // 세트 종료
    socket.on('finish set', data => {
      dispatchIsSolved(false);

      dispatchUserList(data.users);
      setForegroundType(FOREGROUND_TYPE.finishSet);
      setTimeout(() => {
        socket.emit('ready set', {});
      }, 5000);
    });

    socket.on('get time', data => {
      setTime(data.time);
    });
  }, []);

  return (
    <Container>
      <WhiteBoardContent />
      <div>time:{time}</div>
      {/**IF NOT STARTED OR NOT QUESTIONER, RENDER */}
      {(!isStarted || !(questioner.id === socket.id)) && (
        <>
          <Foreground
            isQuestioner={questioner.id === socket.id}
            words={words}
            isStarted={isStarted}
            setIsStarted={setIsStarted}
            questionerName={questioner.nickname}
            type={foregroundType}
            prevUsers={prevUsers}
          />
        </>
      )}
      {foregroundType === FOREGROUND_TYPE.finishSet && (
        <>
          <Foreground type={foregroundType} prevUsers={prevUsers} />
        </>
      )}
    </Container>
  );
};

export default WhiteBoard;

import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from 'context';
import styled from 'styled-components';

const TimerContainer = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Timer = () => {
  const socket = useContext(SocketContext);
  const [time, setTime] = useState(0);
  useEffect(() => {
    socket.on('get time', data => {
      setTime(data.time);
    });
  }, []);

  return (
    <TimerContainer>
      <div className="time">남은시간 : {time}초</div>
    </TimerContainer>
  );
};

export default Timer;

import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { UserContext, PageContext, SocketContext, PageContextProvider } from 'context';
import InvalidAccess from './InvalidAccess';
import logo from 'public/images/scramble_logo2.png';

const ROUND_RANGE = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const Wrapper = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 25px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RightContainer = styled.div`
  margin: 0 0 0 30px;
  background-color: tomato;
  display: flex;
  width: 100vw;
  max-width: 500px;
  height: 300px;
  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    height: 50px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-family: 'CookieRun';
    font-size: 22px;
    box-sizing: border-box;
  }
`;

const Image = styled.img`
  height: 100px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #00000001;
  }
`;

const RoomInfoWrapper = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RoomInfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 300px;
  width: 100vw;
  max-width: 500px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 1px 1px 5px #00000020;
`;

const SelectorContainer = styled.div`
  width: 100%;
  .menu {
    margin: 0 0 5px 0;
    font-weight: 700;
    font-size: 15px;
  }
`;

const Selector = styled.select`
  padding: 5px 10px;
  width: 100%;
  height: 30px;
`;

const Option = styled.option`
  padding: 5px;
`;

const PlayButton = styled.button`
  width: 100vw;
  max-width: 500px;
  padding: 15px 20px;
  border: none;
  background-color: #ccf6c8;
  box-sizing: border-box;
  border: 4px;
  box-shadow: 1px 1px 5px #00000020;
  font-size: 20px;
  font-family: 'CookieRun';
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #ccf6c899;
  }
`;

const WaitingRoom = () => {
  const { nickname, dispatchNickname, roomId, userId } = useContext(UserContext);
  const { dispatchCurrentPage } = useContext(PageContext);
  const socket = useContext(SocketContext);
  const [round, setRound] = useState(2);
  const [userNicknameList, setUserNicknameList] = useState([]);
  const [userIdList, setUserIdList] = useState([]);

  const handleRoundSelect = e => {
    setRound(e.target.value);
  };

  const isRoomOwner = userId => {
    return !userIdList[0] === socket.id;
  };

  useEffect(() => {
    socket.on('start success', data => {
      console.log('message', data.message);
      dispatchCurrentPage('gameRoom');
    });

    socket.on('update user', data => {
      setUserNicknameList(data.nicknames);
      setUserIdList(data.users);
    });
  }, []);

  const handleClickPlay = useCallback(() => {
    socket.emit('start game', { round: round }, error => {
      if (error) {
        console.log('error', error);
      }
    });
  }, [round]);

  return (
    <Wrapper>
      <Image src={logo} alt="스크램블 로고" />
      <div className="title">'{nickname}'님의 방 정보 설정</div>

      <ContentWrapper>
        <LeftContainer>
          <RoomInfoWrapper>
            <RoomInfoContainer>
              <SelectorContainer>
                <div className="menu">Round</div>
                <Selector value={round} onChange={handleRoundSelect}>
                  {ROUND_RANGE.map(item => {
                    return (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    );
                  })}
                </Selector>
              </SelectorContainer>
            </RoomInfoContainer>
          </RoomInfoWrapper>
          <PlayButton onClick={handleClickPlay} disabled={!(userIdList[0] === socket.id)}>
            PLAY !
          </PlayButton>
        </LeftContainer>
        <RightContainer>
          {userNicknameList.map(item => {
            return <div className="user">{item}</div>;
          })}
        </RightContainer>
      </ContentWrapper>
      <div>URL:{`localhost:3000/?room_id=${roomId}`}</div>
    </Wrapper>
  );
};

export default WaitingRoom;

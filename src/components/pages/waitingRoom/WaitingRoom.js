import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { UserContext, PageContext, SocketContext, GameContext } from 'context';
import { CopyArea } from 'components/helpers';
import logo from 'public/images/scramble_logo2.png';
import WaitingUsers from './WaitingUsers';

const ROUND_RANGE = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const Wrapper = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    margin: 30px 0 0 0;
    font-weight: 700;
    font-size: 25px;
  }
`;

const ContentWrapper = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  align-items: flex-start;
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
  display: flex;
  align-items: flex-start;

  width: 100vw;
  max-width: 500px;
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
  border: 1px solid #ddd;
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
  margin: 20px 0 0 0;
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
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
  &:active {
    background-color: #ccf6c899;
  }
`;

const CopyContainer = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid #ddd;

  .url {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }
`;

const WaitingRoom = () => {
  const { nickname, dispatchNickname, roomId } = useContext(UserContext);
  const { dispatchCurrentPage } = useContext(PageContext);
  const socket = useContext(SocketContext);
  const { userList, dispatchUserList } = useContext(GameContext);
  const [round, setRound] = useState(2);

  const handleRoundSelect = e => {
    setRound(e.target.value);
  };

  useEffect(() => {
    socket.on('update user', data => {
      dispatchUserList(data.users);
      console.log('update user', data.users);
    });
    socket.on('start success', data => {
      dispatchUserList(data.users);
      dispatchCurrentPage('gameRoom');
    });
  }, []);

  const handleClickPlay = useCallback(() => {
    socket.emit('start game', { round: round }, error => {
      if (error) {
        console.log('error', error);
      }
    });
    dispatchCurrentPage('gameRoom');
  }, [round]);

  return (
    <Wrapper>
      <Image src={logo} alt="스크램블 로고" />
      <div className="title">'{userList[0]?.nickname}'님의 방</div>

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
          <PlayButton
            onClick={handleClickPlay}
            disabled={userList[0] && !(userList[0].id === socket.id)}
          >
            PLAY !
          </PlayButton>
        </LeftContainer>
        <RightContainer>
          <WaitingUsers users={userList} />
        </RightContainer>
      </ContentWrapper>
      <CopyArea text={`localhost:3000/?room_id=${roomId}`} />
    </Wrapper>
  );
};

export default WaitingRoom;

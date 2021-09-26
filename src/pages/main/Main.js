import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import logo from 'public/images/scramble_logo2.png';
import { UserContext, PageContext, SocketContext } from 'context';
import { withRouter } from 'react-router-dom';
import Loading from 'components/common/Loading';

const Wrapper = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoContainer = styled.div``;

const Image = styled.img`
  height: 100px;
  &:hover {
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  margin: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 395px;
`;

const NicknameInput = styled.input`
  padding: 20px;
  width: 100%;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 15px;
`;

const PlayButton = styled.button`
  margin: 10px 0 0 0;
  padding: 20px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #ccf6c8;
  font-size: 20px;
  font-family: 'CookieRun';
  font-weight: 700;
  &:hover {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;

const LoadingContainer = styled.div`
  margin: 150px 0 0 0;
`;

const Main = withRouter(({ location }) => {
  const { nickname, dispatchNickname, dispatchRoomId } = useContext(UserContext);
  const { currentPage, dispatchCurrentPage } = useContext(PageContext);
  const socket = useContext(SocketContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on('create success', data => {
      dispatchCurrentPage('waitingRoom');
      dispatchRoomId(data.room_id);
    });

    socket.on('join fail', data => {
      alert('방 입장에 실패했습니다. ', data.message);
    });

    socket.on('join success', data => {
      dispatchRoomId(data.room_id);
      if (data.is_playing) {
        dispatchCurrentPage('gameRoom');
      } else {
        dispatchCurrentPage('waitingRoom');
      }
    });
  }, []);

  const handleNickname = e => {
    dispatchNickname(e.target.value);
  };

  const handlePlay = useCallback(() => {
    setLoading(true);

    if (!location.search) {
      socket.emit('create room', { nickname: nickname });
    } else {
      const params = new URLSearchParams(location.search);
      const roomId = params.get('room_id');
      socket.emit('join room', { room_id: roomId, nickname: nickname }, error => {
        if (error) {
          alert('방 참가 오류!', error);
        }
      });
    }
  }, [nickname]);

  const handleClickLogo = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      <LogoContainer>
        <Image src={logo} alt="스크램블 로고" onClick={handleClickLogo} />
      </LogoContainer>
      {loading ? (
        <LoadingContainer>
          <Loading color="#ddd" loadingString="Enter Room" />
        </LoadingContainer>
      ) : (
        <InputContainer>
          <NicknameInput
            placeholder={`닉네임을 입력해주세요`}
            onChange={handleNickname}
          />
          <PlayButton onClick={handlePlay} disabled={!nickname}>
            PLAY !
          </PlayButton>
        </InputContainer>
      )}
    </Wrapper>
  );
});

export default Main;

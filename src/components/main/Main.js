import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from './scramble_logo2.png';

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
  object-fit: cover;
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
    cursor: pointer;
  }
`;

const Main = () => {
  const [nickname, setNickname] = useState('');

  const handleNickname = e => {
    setNickname(e.target.value);
  };

  const handlePlay = e => {
    console.log('hi');
  };

  return (
    <Wrapper>
      <LogoContainer>
        <Image src={logo} alt="스크램블 로고" />
      </LogoContainer>
      <InputContainer>
        <NicknameInput
          placeholder="닉네임을 입력해주세요"
          onChange={handleNickname}
        />
        <PlayButton onClick={handlePlay}>PLAY !</PlayButton>
      </InputContainer>
    </Wrapper>
  );
};

export default Main;

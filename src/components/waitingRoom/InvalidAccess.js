import React from 'react';
import logo from 'public/images/scramble_logo2.png';
import styled from 'styled-components';

const DescriptionContainer = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PageDescription = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

const HomeButton = styled.div`
  margin: 30px 0 0 0;
  padding: 15px 20px;
  font-size: 15px;
  box-shadow: 1px 1px 5px #0000003a;

  background-color: #f9c0c0;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const InvalidAccess = () => {
  const handleClickHome = () => {
    console.log('hi');
  };
  return (
    <DescriptionContainer>
      <PageDescription>잘못된 접근입니다.</PageDescription>
      <HomeButton onClick={handleClickHome}>HOME</HomeButton>
    </DescriptionContainer>
  );
};

export default InvalidAccess;

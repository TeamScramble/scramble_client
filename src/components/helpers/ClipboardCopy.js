import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  height: 100%;
  padding: 0 20px;
  background-color: #f6d6ad;
  &:hover {
    cursor: pointer;
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

const ClipboardCopy = ({ text }) => {
  const doCopy = text => {
    // 흐름 1.
    if (!document.queryCommandSupported('copy')) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');
    }

    // 흐름 2.
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.position = 'fixed';

    // 흐름 3.
    document.body.appendChild(textarea);
    // focus() -> 사파리 브라우저 서포팅
    textarea.focus();
    // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
    textarea.select();
    // 흐름 4.
    document.execCommand('copy');
    // 흐름 5.
    document.body.removeChild(textarea);
  };
  return <Button onClick={() => doCopy(text)}>copy</Button>;
};

const CopyArea = ({ text }) => {
  return (
    <CopyContainer>
      <div className="url">{text}</div>
      <ClipboardCopy text={text} />
    </CopyContainer>
  );
};

export { ClipboardCopy, CopyArea };

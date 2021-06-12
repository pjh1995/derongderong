import React from 'react';
import styled from 'styled-components';

import { displaySize } from '../assets/constant';

const StartButton = ({ onClick, isPlaying, disabled }) => {
  return (
    !isPlaying && (
      <Button onClick={onClick} disabled={disabled}>
        게임 시작
      </Button>
    )
  );
};

export default StartButton;

const Button = styled.button`
  position: fixed;
  top: ${displaySize.height}px;
  left: 0;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background-color: cornflowerblue;
`;

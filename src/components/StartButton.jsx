import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

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
  top: 600px;
  left: 0;
  width: fit-content;
  height: fit-content;
  padding: 20px;
  background-color: cornflowerblue;
`;

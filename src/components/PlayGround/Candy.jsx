import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

import { displaySize } from '../../assets/constant';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { positionState, timeState, scoreState, candyListState, isPlayingState } from '../../store';

const Candy = ({ playAudio, id }) => {
  const isPlaying = useRecoilValue(isPlayingState);
  const position = useRecoilValue(positionState);
  const setTime = useSetRecoilState(timeState);
  const setScore = useSetRecoilState(scoreState);
  const [candyList, setCandyList] = useRecoilState(candyListState);

  const candyEl = useRef(null);

  const [state, setstate] = useState({
    height: 0,
    left: 0,
    cookie: -1,
  });

  useEffect(() => {
    if (state.cookie !== -1) return;
    makeCandy();
  }, [id]);

  useEffect(() => {
    if (!isPlaying) return;
    checkCandy();
  }, [position]);

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - 1 - min)) + min;
  };

  const makeCandy = () => {
    const height = getRandom(200, displaySize.height - 200);
    const left = getRandom(200, displaySize.width - 200);
    const cookie = getRandom(1, 5);
    setstate({
      height,
      left,
      cookie,
    });
  };

  const checkCandy = () => {
    if (!candyEl?.current) return;

    const reverseLeft = displaySize.width - state.left;

    const { x, y } = position;

    const inXRange = x.min <= reverseLeft && reverseLeft <= x.max;
    const inYRange = y.min <= state.height && state.height <= y.max;

    if (inXRange && inYRange) {
      onEating(id);
    }
  };

  const increaseSeconds = (extra) => {
    setTime((seconds) => seconds + extra);
  };

  const onEating = (id) => {
    playAudio();
    setCandyList(candyList.filter((candyId) => candyId !== id));
    increaseSeconds(1);
    setScore((score) => score + 10);
  };

  return state.cookie > 0 ? (
    <WrapCandy {...state} ref={candyEl}>
      <div className="rope" />
      <div className="candy">
        <i className={`candy${state.cookie}`}></i>
      </div>
    </WrapCandy>
  ) : (
    <></>
  );
};
export default Candy;

const bounce = keyframes`
    0% {
      transform:translateY(-100%);
      opacity: 0;
    }
    5% {
      transform:translateY(-100%);
      opacity: 0;
    }
    15% {
      transform:translateY(0);
      padding-bottom: 5px;
    }
    30% {
      transform:translateY(-50%);
    }
    40% {
      transform:translateY(0%);
      padding-bottom: 6px;
    }
    50% {
      transform:translateY(-30%);
    }
    70% {
      transform:translateY(0%);
      padding-bottom: 7px;
    }
    80% {
      transform:translateY(-15%);
    }
    90% {
      transform:translateY(0%);
      padding-bottom: 8px;
    }
    95% {
      transform:translateY(-7%);
    }
    97% {
      transform:translateY(0%);
      padding-bottom: 9px;
    }
    99% {
      transform:translateY(-3%);
    }
    100% {
      transform:translateY(0);
      padding-bottom: 9px;
      opacity: 1;
    }
  `;

const WrapCandy = styled.div`
  position: absolute;
  width: fit-content;
  height: ${({ height }) => `${height}px`};
  left: ${({ left }) => `${left}px`};
  top: 0;
  font-size: 0.8em;
  text-align: center;
  background-color: #111;
  color: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  font-weight: bold;
  animation: ${bounce} 1.8s ease-out;

  .rope {
    height: 100%;
    width: 0;
    border: 1px dotted #929292;
  }
  .candy {
    position: relative;
    i {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

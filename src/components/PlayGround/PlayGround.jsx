import { Suspense } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { candyListState, isPlayingState } from '../../store';

import DetectFace from './DetectFace';
import CandyList from './CandyList';

import useInterval from '../../hooks/useInterval';

import { makeCandyDelay } from '../../assets/constant';

const PlayGround = () => {
  const isPlaying = useRecoilValue(isPlayingState);
  const [candyList, setCandyList] = useRecoilState(candyListState);

  const getCandyId = () => {
    return candyList.length > 0 ? candyList[candyList.length - 1] + 1 : 1;
  };

  const addCandy = () => {
    const newId = getCandyId();
    setCandyList([...candyList, newId]);
  };

  useInterval(() => {
    if (!isPlaying) return;
    addCandy();
  }, makeCandyDelay);

  return (
    <Suspense fallback="Loading...">
      <DetectFace />
      <CandyList />
    </Suspense>
  );
};

export default PlayGround;

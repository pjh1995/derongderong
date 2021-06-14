import React, { useEffect, useState, useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import timeState from '../recoil/time';

import sound from '../assets/audios/snack_eating_sound.mp3';
import { makeCandyDelay } from '../assets/constant';

import Candy from './Candy';

const CandyList = ({ isPlaying, setScore }) => {
  const [candyList, setCandyList] = useState([]);
  const [id, setId] = useState(0);
  const setTime = useSetRecoilState(timeState);
  const audio = new Audio(sound);

  const makeCandy = useCallback(async () => {
    await setId(id + 1);
    const list = candyList;
    list.push(id);
    setCandyList(list);
    console.log('list', list);
    setTimeout(() => {
      makeCandy();
    }, makeCandyDelay);
  }, [candyList]);

  useEffect(() => {
    if (!isPlaying) return false;
    if (candyList.length === 0) makeCandy();
  }, [candyList, isPlaying, makeCandy]);

  const onEating = (id) => {
    if (audio) {
      audio.play();
    }
    setCandyList(candyList.filter((candyId) => candyId !== id));
    increaseSeconds(1);
    setScore((score) => score + 10);
  };

  const increaseSeconds = (extra) => {
    setTime((seconds) => seconds + extra);
  };

  return <>{candyList.length > 0 && candyList.map((id) => <Candy key={id} id={id} onEating={onEating} />)}</>;
};

export default CandyList;

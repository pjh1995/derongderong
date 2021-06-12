import React, { useEffect, useState, useCallback } from 'react';
import { useTimeContext } from '../Contexts/TimeContext';

import sound from '../assets/audios/snack_eating_sound.mp3';
import { makeCandyDelay } from '../assets/constant';

import Candy from './Candy';

const CandyList = ({ isPlaying, setScore }) => {
  const [candyList, setCandyList] = useState([]);
  const { setTime } = useTimeContext();
  const audio = new Audio(sound);

  let idx = 0;
  useEffect(() => {
    if (!isPlaying) return false;
    if (candyList.length === 0) makeCandy();
  }, [candyList, isPlaying]);

  const makeCandy = useCallback(() => {
    ++idx;
    const list = candyList;
    list.push(idx);
    setCandyList(list);
    setTimeout(() => {
      makeCandy();
    }, makeCandyDelay);
  }, [candyList, idx]);

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

import React, { useEffect, useState, useCallback, useRef } from 'react';

import sound from '../assets/audios/snack_eating_sound.mp3';

import Candy from './Candy';

const CandyList = ({ isPlaying }) => {
  const [candyList, setCandyList] = useState([]);
  const [max, setMax] = useState(3000);
  const audio = new Audio(sound);

  let idx = 0;
  useEffect(() => {
    if (!isPlaying) return false;
    if (candyList.length === 0) makeCandy();
  }, [candyList, isPlaying]);

  const makeCandy = useCallback(() => {
    if (max <= 0) return false;
    ++idx;
    const list = candyList;
    list.push(idx);
    setCandyList(list);
    console.log(candyList, '@@@@@@', max);
    setMax(max - 10);
    setTimeout(() => {
      makeCandy();
    }, max);
  }, [candyList, idx, max]);

  const onEating = (id) => {
    if (audio) {
      audio.play();
    }
    setCandyList(candyList.filter((candyId) => candyId !== id));
  };

  return <>{candyList.length > 0 && candyList.map((id) => <Candy key={id} id={id} onEating={onEating} />)}</>;
};

export default CandyList;

import React, { useEffect, useState, useCallback } from 'react';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { timeState, isPlayingState, scoreState } from '../recoil';

import sound from '../assets/audios/snack_eating_sound.mp3';
import { makeCandyDelay } from '../assets/constant';

import Candy from './Candy';

const CandyList = () => {
  const [candyList, setCandyList] = useState([]);

  const setTime = useSetRecoilState(timeState);
  const isPlaying = useRecoilValue(isPlayingState);
  const setScore = useSetRecoilState(scoreState);

  const [id, setId] = useState(0);

  const audio = new Audio(sound);

  useEffect(() => {
    console.log(isPlaying, id);
    if (!isPlaying) return false;

    const makeCandyInterval = setTimeout(() => {
      makeCandy();
    }, makeCandyDelay);

    // return clearInterval(makeCandyInterval);
  }, [id, isPlaying]);

  const makeCandy = async () => {
    await setId(id + 1);
    console.log('id', id);
    const list = candyList;
    list.push(id);
    setCandyList(list);
  };

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

  return (
    <>
      <h1>{candyList.length}</h1>
      {candyList.length > 0 && candyList.map((id) => <Candy key={id} id={id} onEating={onEating} />)}
    </>
  );
};

export default CandyList;

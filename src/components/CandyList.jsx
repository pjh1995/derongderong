import React, { Suspense } from 'react';

import { useRecoilValue } from 'recoil';
import { candyListState } from '../store';

import sound from '../assets/audios/snack_eating_sound.mp3';

import Candy from './Candy';

const CandyList = () => {
  const candyList = useRecoilValue(candyListState);
  const audio = new Audio(sound);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <>
      {candyList.map((id) => (
        <Suspense key={id} fallback="Loading...">
          <Candy id={id} playAudio={playAudio} />
        </Suspense>
      ))}
    </>
  );
};

export default CandyList;

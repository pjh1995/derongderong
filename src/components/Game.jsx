import React from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { isPlayingState, isLoadingState, scoreState } from '../store';

import Timer from './Timer';
import PlayGround from './PlayGround';
import StartButton from './StartButton';
import Score from './Score';

const Game = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const score = useRecoilValue(scoreState);

  const onClick = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const endGame = () => {
    const alertText = `점수 : ${score}`;
    alert(alertText);
    window.location.reload();
  };

  return (
    <>
      <PlayGround />
      {isPlaying && <Timer initialSeconds="30" endGame={endGame} />}
      {isPlaying && <Score score={score} />}
      <StartButton onClick={onClick} />
    </>
  );
};

export default Game;

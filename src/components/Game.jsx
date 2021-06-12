import React, { useState, useEffect, useRef } from 'react';

import Timer from './Timer';
import PlayGround from './PlayGround';
import StartButton from './StartButton';
import Score from './Score';

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

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
      <PlayGround isPlaying={isPlaying} setIsLoading={setIsLoading} isLoading={isLoading} setScore={setScore} />
      {isPlaying && <Timer initialSeconds="30" endGame={endGame} isLoading={isLoading} />}
      {isPlaying && <Score score={score} />}
      <StartButton onClick={onClick} isPlaying={isPlaying} disabled={isLoading} />
    </>
  );
};

export default Game;

import React, { useState, useEffect, useRef } from 'react';

import Timer from './Timer';
import PlayGround from './PlayGround';
import StartButton from './StartButton';

const Game = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const onClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const endGame = () => {
    console.log('endGame');
  };

  return (
    <>
      {isPlaying && <Timer initialSeconds="30" endGame={endGame} isLoading={isLoading} />}
      <PlayGround isPlaying={isPlaying} setIsLoading={setIsLoading} isLoading={isLoading} />
      <StartButton onClick={onClick} isPlaying={isPlaying} disabled={isLoading} />
    </>
  );
};

export default Game;

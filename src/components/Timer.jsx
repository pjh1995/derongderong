import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const { initialSeconds = 0, isLoading = false, endGame } = props;
  const [seconds, setSeconds] = useState(initialSeconds);
  const [timer, setTimer] = useState(null);

  const increaseSeconds = (extra) => {
    setSeconds((seconds) => seconds + extra);
  };

  const decreaseSeconds = () => {
    setSeconds((seconds) => seconds - 1);
  };

  useEffect(() => {
    if (seconds === 0) {
      endGame();
      return;
    }

    const timers = setTimeout(() => {
      if (isLoading) return;
      setTimer(decreaseSeconds());
    }, 1000);

    return () => clearTimeout(timers);
  });

  return (
    <div>
      <h1>00:{seconds < 10 ? `0${seconds}` : seconds}</h1>
    </div>
  );
};

export default Timer;

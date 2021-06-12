import React, { useState, useEffect } from 'react';

import { useTimeContext } from '../Contexts/TimeContext';

const Timer = (props) => {
  const { isLoading = false, endGame } = props;
  const { time, setTime } = useTimeContext();
  const [_, setTimer] = useState(null);

  const decreaseSeconds = () => {
    setTime((seconds) => seconds - 1);
  };

  useEffect(() => {
    if (time === 0) {
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
      <h1>00:{time < 10 ? `0${time}` : time}</h1>
    </div>
  );
};

export default Timer;

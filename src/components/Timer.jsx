import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import timeState from '../recoil/time';
import isLoadingState from '../recoil/isLoading';

const Timer = (props) => {
  const { endGame } = props;
  const isLoading = useRecoilValue(isLoadingState);
  const [time, setTime] = useRecoilState(timeState);
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

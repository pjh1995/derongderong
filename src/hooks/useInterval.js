import { useState, useEffect, useCallback, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  const intervalId = useRef(null);
  const [currentDelay, setDelay] = useState(delay);

  const toggleRunning = useCallback(() => setDelay((currentDelay) => (currentDelay === null ? delay : null)), [delay]);

  const clear = useCallback(() => clearInterval(intervalId.current), []);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (intervalId.current) clear();

    if (currentDelay !== null) {
      intervalId.current = setInterval(tick, currentDelay);
    }

    return clear;
  }, [currentDelay, clear]);

  return [toggleRunning, !!currentDelay];
};

export default useInterval;

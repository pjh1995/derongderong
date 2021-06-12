import { createContext, useContext, useState } from 'react';
import { initTime } from '../assets/constant';

export const TimeContext = createContext(undefined);

export function TimeContextProvider({ children }) {
  const [time, setTime] = useState(initTime);

  const value = {
    time,
    setTime,
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
}

export function useTimeContext() {
  return useContext(TimeContext);
}

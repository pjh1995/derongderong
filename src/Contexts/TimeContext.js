import { createContext, useContext, useState } from 'react';

export const TimeContext = createContext(undefined);

export function TimeContextProvider({ children }) {
  const [time, setTime] = useState(30);

  const value = {
    time,
    setTime,
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
}

export function useTimeContext() {
  return useContext(TimeContext);
}

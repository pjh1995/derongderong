import { createContext, useContext, useState } from 'react';

export const PositionContext = createContext(undefined);

export function PositionContextProvider({ children }) {
  const [position, setPosition] = useState([
    {
      min: {
        x: -999,
        y: -999,
      },
      max: {
        x: -999,
        y: -999,
      },
    },
  ]);

  const value = {
    position,
    setPosition,
  };

  return <PositionContext.Provider value={value}>{children}</PositionContext.Provider>;
}

export function usePositionContext() {
  return useContext(PositionContext);
}

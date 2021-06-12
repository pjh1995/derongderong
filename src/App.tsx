import React from 'react';

import { TimeContextProvider } from './Contexts/TimeContext';

import Game from './components/Game';
function App() {
  return (
    <div className="App">
      <TimeContextProvider>
        <Game />
      </TimeContextProvider>
    </div>
  );
}

export default App;

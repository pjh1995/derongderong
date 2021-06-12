import React from 'react';

import { PositionContextProvider } from './Contexts/PositionContext';

import TextFace from './components/TestFace';
import CandyList from './components/CandyList';
function App() {
  return (
    <PositionContextProvider>
      <div className="App">
        <TextFace />
        <CandyList />
      </div>
    </PositionContextProvider>
  );
}

export default App;

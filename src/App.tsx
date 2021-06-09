import React from 'react';
import { useRef } from 'react';

import { Candy, Video, ShowFace } from './components';
import TextFace from './components/TestFace';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="App">
      {/* <Video videoRef={videoRef} /> */}
      <TextFace />
      <Candy />
      {/* <ShowFace videoRef={videoRef} /> */}
    </div>
  );
}

export default App;

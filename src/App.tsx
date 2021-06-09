import { useRef } from 'react';

import { Candy, Video, ShowFace } from './components';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="App">
      <Video videoRef={videoRef} />
      <Candy />
      <ShowFace videoRef={videoRef} />
    </div>
  );
}

export default App;

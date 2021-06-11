import React, { useEffect, useState } from "react";
import { useRef } from "react";

import { Candy, Video, ShowFace } from "./components";
import TextFace from "./components/TestFace";

function App() {
  // const videoRef = useRef<HTMLVideoElement>(null);
  const [candyList, setCandyList] = useState<any>([]);
  let max = 3000;

  useEffect(() => {
    makeCandy();
  }, []);

  const makeCandy = () => {
    if (max <= 0) return false;

    setCandyList(candyList.push(<Candy />));
    max -= 10;
    setTimeout(() => {
      makeCandy();
    }, max);
  };

  return (
    <div className="App">
      {/* <Video videoRef={videoRef} /> */}
      <TextFace />
      {candyList.length > 0 &&
        candyList.map((NewCandy: any, key: number) => <NewCandy key={key} />)}
      ;{/* <ShowFace videoRef={videoRef} /> */}
    </div>
  );
}

export default App;

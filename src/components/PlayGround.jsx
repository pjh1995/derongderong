import { PositionContextProvider } from '../Contexts/PositionContext';

import DetectFace from './DetectFace';
import CandyList from './CandyList';

const PlayGround = ({ setIsLoading, isLoading, isPlaying, setScore }) => {
  return (
    <PositionContextProvider>
      <DetectFace setIsLoading={setIsLoading} isLoading={isLoading} />
      <CandyList isPlaying={isPlaying} setScore={setScore} />
    </PositionContextProvider>
  );
};

export default PlayGround;

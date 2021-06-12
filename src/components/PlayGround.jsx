import { PositionContextProvider } from '../Contexts/PositionContext';

import DetectFace from './DetectFace';
import CandyList from './CandyList';

const PlayGround = ({ setIsLoading, isLoading, isPlaying }) => {
  return (
    <PositionContextProvider>
      <DetectFace setIsLoading={setIsLoading} isLoading={isLoading} />
      <CandyList isPlaying={isPlaying} />
    </PositionContextProvider>
  );
};

export default PlayGround;

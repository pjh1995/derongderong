import DetectFace from './DetectFace';
import CandyList from './CandyList';

const PlayGround = ({ setIsLoading, isLoading, isPlaying, setScore }) => {
  return (
    <>
      <DetectFace setIsLoading={setIsLoading} isLoading={isLoading} />
      <CandyList isPlaying={isPlaying} setScore={setScore} />
    </>
  );
};

export default PlayGround;

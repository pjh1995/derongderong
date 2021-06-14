import { atom } from 'recoil';

const isPlayingState = atom({
  key: 'isPlayingState', // 해당 atom의 고유 key
  default: false, // 기본값
});

export default isPlayingState;

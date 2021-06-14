import { atom } from 'recoil';

const scoreState = atom({
  key: 'scoreState', // 해당 atom의 고유 key
  default: 0, // 기본값
});

export default scoreState;

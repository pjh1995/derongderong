import { atom } from 'recoil';

const candyListState = atom({
  key: 'candyListState', // 해당 atom의 고유 key
  default: [1, 2], // 기본값
});

export default candyListState;

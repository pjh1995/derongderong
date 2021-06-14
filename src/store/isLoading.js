import { atom } from 'recoil';

const isLoadingState = atom({
  key: 'isLoadingState', // 해당 atom의 고유 key
  default: true, // 기본값
});

export default isLoadingState;

import { atom } from 'recoil';

import { initTime } from '../assets/constant';

const timeState = atom({
  key: 'timeState', // 해당 atom의 고유 key
  default: initTime, // 기본값
});

export default timeState;

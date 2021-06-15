import { atom } from 'recoil';

const positionState = atom({
  key: 'positionState', // 해당 atom의 고유 key
  default: {
    x: {
      max: 999,
      min: -999,
    },
    y: {
      max: 999,
      min: -999,
    },
  }, // 기본값
});

export default positionState;

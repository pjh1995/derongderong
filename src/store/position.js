import { atom } from 'recoil';

const positionState = atom({
  key: 'positionState', // 해당 atom의 고유 key
  default: {
    min: {
      x: -999,
      y: -999,
    },
    max: {
      x: -999,
      y: -999,
    },
  }, // 기본값
});

export default positionState;

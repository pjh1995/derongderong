import React, { useEffect, useState, useCallback } from 'react';

import sound from '../assets/audios/snack_eating_sound.mp3';

import Candy from './Candy';

const CandyList = () => {
  const [candyList, setCandyList] = useState([]);
  const [max, setMax] = useState(3000);
  let idx = 0;
  useEffect(() => {
    if (candyList.length === 0) makeCandy();
  }, [candyList, idx, max]);

  const makeCandy = useCallback(() => {
    if (max <= 0) return false;
    ++idx;
    const list = candyList;
    list.push(idx);
    setCandyList(list);
    console.log(candyList, '@@@@@@', max);
    setMax(max - 10);
    setTimeout(() => {
      makeCandy();
    }, max);
  }, [candyList, idx, max]);

  const onRemove = (id) => {
    setCandyList(candyList.filter((candyId) => candyId !== id));
  };

  return (
    <>
      <audio tabindex="0" id="beep-one" controls preload="auto">
        <source src={sound} />
      </audio>
      {candyList.length > 0 && candyList.map((id) => <Candy key={id} id={id} onRemove={onRemove} />)}
    </>
  );
};

export default CandyList;

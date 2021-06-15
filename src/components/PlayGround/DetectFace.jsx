import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { displaySize, detectTime } from '../../assets/constant';

import * as faceapi from 'face-api.js';

import { useSetRecoilState, useRecoilState } from 'recoil';
import { positionState, isLoadingState } from '../../store';

const DetectFace = () => {
  // state
  const setPosition = useSetRecoilState(positionState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  // refs
  const videoEl = useRef(null);
  const canvasEl = useRef(null);

  let intervalDetectMouth = null;

  // effects
  useEffect(() => {
    async function load() {
      loadFaceApiModels().then(() => {
        loadCam();
      });
    }
    load();
    return clearInterval(intervalDetectMouth);
  }, []);

  const loadFaceApiModels = async () => {
    console.log('loading faceapi', process.env.REACT_APP_IP);
    const modelUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/models`;

    try {
      await faceapi.loadSsdMobilenetv1Model(modelUrl);
      await faceapi.loadFaceLandmarkModel(modelUrl);
      await faceapi.loadTinyFaceDetectorModel(modelUrl);
      await faceapi.loadAgeGenderModel(modelUrl);
      await faceapi.loadFaceExpressionModel(modelUrl);
    } catch (e) {
      return;
    }

    console.log('loaded faceapi');
  };

  const loadCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: displaySize })
      .then((stream) => {
        if (videoEl.current) {
          videoEl.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMinMax = (positionSet) => {
    const max = {
      x: Math.max(...positionSet.map((o) => o.x)),
      y: Math.max(...positionSet.map((o) => o.y)),
    };
    const min = {
      x: Math.min(...positionSet.map((o) => o.x)),
      y: Math.min(...positionSet.map((o) => o.y)),
    };
    return [max, min];
  };

  const drawDetections = (detections) => {
    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    if (canvasEl?.current) {
      canvasEl.current.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
      faceapi.draw.drawDetections(canvasEl.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasEl.current, resizedDetections);
    }
  };

  const detect = async () => {
    faceapi.matchDimensions(canvasEl.current, displaySize);

    intervalDetectMouth = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoEl.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const landmarks = detections[0]?.landmarks;

      if (isLoading) setIsLoading(false);
      if (!landmarks) return;

      drawDetections(detections);

      const mouth = landmarks.getMouth();
      const [max, min] = getMinMax(mouth);

      setPosition({ max, min });
    }, detectTime);
  };

  const onPlay = async () => {
    if (videoEl.current && videoEl.current.srcObject) {
      console.log(videoEl.current.srcObject);

      detect();
    }
  };

  return (
    <WrapDetectFace>
      <WrapVideo ref={videoEl} onPlay={onPlay} muted playsInline autoPlay />
      <WrapCanvas id="capture" ref={canvasEl} width={displaySize.width} height={displaySize.height}></WrapCanvas>
    </WrapDetectFace>
  );
};

export default DetectFace;

const WrapDetectFace = styled.div`
  width: ${displaySize.width}px;
  height: ${displaySize.height}px;
  position: relative;
  transform: rotateY(-180deg);
`;

const WrapCanvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
`;

const WrapVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

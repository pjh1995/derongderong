import React, { ReactElement, useState, useEffect, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';
const TestFace = (): ReactElement => {
  // state
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number }>({ width: 1280, height: 1270 });
  const [st, setSt] = useState<any>({
    position: 'absolute',
    backgroundColor: 'red',
    top: '430.07251739501953px',
    left: '519.0542984008789px',
    width: '178.27983856201172px',
    height: '117.10082530975342px',
  });
  // refs
  const videoEl = useRef<HTMLVideoElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const captureEl = useRef<HTMLCanvasElement>(null);

  // effects
  useEffect(() => {
    async function load() {
      loadFaceApiModels().then(() => {
        loadCam();
      });
    }
    load();
  }, []);

  const loadFaceApiModels = async () => {
    console.log('loading faceapi');
    const modelUrl = 'http://127.0.0.1:8080/models';

    try {
      await faceapi.loadSsdMobilenetv1Model(modelUrl);
      await faceapi.loadFaceLandmarkModel(modelUrl);

      await faceapi.loadAgeGenderModel(modelUrl);
      await faceapi.loadFaceExpressionModel(modelUrl);
    } catch (e) {
      console.log('@@@@', e);
      return;
    }

    console.log('loaded faceapi');
  };

  const loadCam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: displaySize.width, height: displaySize.height } })
      .then((stream) => {
        // setIsLoading(false);
        if (videoEl.current) {
          videoEl.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const detect = async () => {
    const landmarks1 = await faceapi.detectFaceLandmarks('idid');
    console.log(landmarks1);
    if ('getMouth' in landmarks1) {
      const mouthPosition = landmarks1.getMouth();

      const max = {
        x: Math.max(...mouthPosition.map((o) => o.x)),
        y: Math.max(...mouthPosition.map((o) => o.y)),
      };
      const min = {
        x: Math.min(...mouthPosition.map((o) => o.x)),
        y: Math.min(...mouthPosition.map((o) => o.y)),
      };

      setSt({
        ...st,
        top: `${min.y}px`,
        left: `${min.x}px`,
        width: `${max.x - min.x}px`,
        height: `${max.y - min.y}px`,
      });

      const a = document.querySelector('.candy1');
      if (a) {
        const b: {
          x: number;
          y: number;
        } = a.getBoundingClientRect();
        if (min.x <= b.x && b.x <= max.x && min.y <= b.y && b.y <= max.y) {
          console.log('먹었따!');
        }
      }
      console.log(max, min);
      // console.log(landmarks1.getMouth());
    }
    setTimeout(() => {
      detect();
    }, 3000);
  };
  const onPlay = async (): Promise<void> => {
    if (videoEl.current && videoEl.current.srcObject) {
      console.log(videoEl.current.srcObject);
      // const detection = await faceapi.detectSingleFace('idid'); // where error cames

      detect();
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <video
        ref={videoEl}
        width="1280"
        height="760"
        id="idid"
        onPlay={onPlay}
        muted
        playsInline
        autoPlay
        style={{ position: 'fixed', top: 0, left: 0 }}
      />
      <canvas id="overlay" ref={canvasEl}></canvas>
      <canvas id="capture" width="224" height="224" ref={captureEl}></canvas>
      <div style={st}>sss</div>
    </div>
  );
};

export default TestFace;

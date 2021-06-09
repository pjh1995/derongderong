import React, { ReactElement, useState, useEffect, useRef } from 'react';
// import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';
const TestFace = (): ReactElement => {
  // state
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number }>({ width: 1280, height: 1270 });

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
    if ('imageHeight' in landmarks1) console.log(landmarks1.imageHeight);
    if ('getMouth' in landmarks1) console.log(landmarks1.getMouth());
    detect();
  };
  const onPlay = async (): Promise<void> => {
    if (videoEl.current && videoEl.current.srcObject) {
      console.log(videoEl.current.srcObject);
      // const detection = await faceapi.detectSingleFace('idid'); // where error cames

      // detect();
    }
  };

  return (
    <>
      <div>
        <div>
          <div>
            <>
              <video ref={videoEl} width="1280" height="760" id="idid" onPlay={onPlay} muted playsInline autoPlay />
              <canvas id="overlay" ref={canvasEl}></canvas>
              <canvas id="capture" width="224" height="224" ref={captureEl}></canvas>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestFace;

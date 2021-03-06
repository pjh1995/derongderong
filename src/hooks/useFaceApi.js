// import React, { useState, useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { displaySize, detectTime } from '../assets/constant';

// import * as faceapi from 'face-api.js';

// import { useSetRecoilState, useRecoilState } from 'recoil';
// import { positionState, isLoadingState } from '../store';

// const useFaceApi = (videoEl) => {
//   // effects
//   useEffect(() => {
//     async function load() {
//       loadFaceApiModels().then(() => {
//         loadCam();
//       });
//     }
//     load();
//   }, []);

//   const loadFaceApiModels = async () => {
//     console.log('loading faceapi', process.env.REACT_APP_IP);
//     const modelUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/models`;

//     try {
//       await faceapi.loadSsdMobilenetv1Model(modelUrl);
//       await faceapi.loadFaceLandmarkModel(modelUrl);
//       await faceapi.loadTinyFaceDetectorModel(modelUrl);
//       await faceapi.loadAgeGenderModel(modelUrl);
//       await faceapi.loadFaceExpressionModel(modelUrl);
//     } catch (e) {
//       return;
//     }

//     console.log('loaded faceapi');
//   };

//   const loadCam = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: displaySize })
//       .then((stream) => {
//         if (videoEl.current) {
//           videoEl.current.srcObject = stream;
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const detect = async () => {
//     const canvas = faceapi.createCanvasFromMedia(videoEl.current);
//     canvas.style.cssText = 'position:fixed; top:0; left: 0;';
//     document.body.append(canvas);

//     faceapi.matchDimensions(canvas, displaySize);

//     detectMouth = setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoEl.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceExpressions();
//       const landmarks = detections[0]?.landmarks;

//       if (isLoading) setIsLoading(false);
//       if (!landmarks) return;

//       const resizedDetections = faceapi.resizeResults(detections, displaySize);

//       if (canvas) {
//         canvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//       }

//       const mouth = landmarks.getMouth();

//       const max = {
//         x: Math.max(...mouth.map((o) => o.x)),
//         y: Math.max(...mouth.map((o) => o.y)),
//       };
//       const min = {
//         x: Math.min(...mouth.map((o) => o.x)),
//         y: Math.min(...mouth.map((o) => o.y)),
//       };

//       setSt({
//         ...st,
//         top: `${min.y}px`,
//         left: `${min.x}px`,
//         width: `${max.x - min.x}px`,
//         height: `${max.y - min.y}px`,
//       });

//       setPosition({ max, min });
//     }, detectTime);
//   };

//   const onPlay = async () => {
//     if (videoEl.current && videoEl.current.srcObject) {
//       console.log(videoEl.current.srcObject);

//       detect();
//     }
//   };

//   return (
//     <WrapDetectFace>
//       <WrapVideo ref={videoEl} id="idid" onPlay={onPlay} muted playsInline autoPlay />
//       <WrapCanvas id="capture" ref={canvasEl}></WrapCanvas>
//       <div style={st}>sss</div>
//     </WrapDetectFace>
//   );
// };

// export default useFaceApi;

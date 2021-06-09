import { useRef, useEffect } from 'react';
import styled from 'styled-components';

import * as faceapi from 'face-api.js';
import React from 'react';
const modelUrl = '../hooks/models';
const Video = ({ videoRef }: { videoRef?: any }) => {
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    await faceapi.loadSsdMobilenetv1Model(modelUrl);
    await faceapi.loadFaceLandmarkModel(modelUrl);
    await faceapi.loadAgeGenderModel(modelUrl);
    await faceapi.loadFaceExpressionModel(modelUrl);

    startVideo();
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const draw = () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef);
    document.body.append(canvas);
    console.log(canvas);
    // const displaySize = { width: videoRef.cu.width, height: video.height };
    // faceapi.matchDimensions(canvas, displaySize);
    // setInterval(async () => {
    //   const detections = await faceapi
    //     .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    //     .withFaceLandmarks()
    //     .withFaceExpressions();
    //   const resizedDetections = faceapi.resizeResults(detections, displaySize);
    //   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    //   faceapi.draw.drawDetections(canvas, resizedDetections);
    //   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //   faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    // }, 100);
  };

  // video.addEventListener("playing", () => {
  //   const canvas = faceapi.createCanvasFromMedia(video);
  //   document.body.append(canvas);
  //   const displaySize = { width: video.width, height: video.height };
  //   faceapi.matchDimensions(canvas, displaySize);
  //   setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);
  //     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  //     faceapi.draw.drawDetections(canvas, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  //   }, 100);
  // });

  return <WrapVideo ref={videoRef} autoPlay id="my-image" />;
};

export default Video;

const WrapVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: rotateY(180deg);
`;

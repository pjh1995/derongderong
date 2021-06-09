import { useFaceApi } from '../hooks/useFaceApi';
import { useEffect } from 'react';
import React from 'react';

const myFaceApiConfig = {
  input: 'my-image',
  refreshRate: 250,
};
const ShowFace = ({ videoRef }: { videoRef: any }) => {
  const faces = useFaceApi(myFaceApiConfig);

  return (
    <>
      {faces &&
        videoRef &&
        'current' in videoRef &&
        faces.map((face) => {
          // Attributes
          const top = face.relativeBox.top * videoRef.current.offsetHeight;
          const left = face.relativeBox.left * videoRef.current.offsetWidth;
          const width = face.relativeBox.width * videoRef.current.offsetWidth;
          const height = face.relativeBox.height * videoRef.current.offsetHeight;

          // Rendering
          return (
            <div
              style={{
                position: 'absolute',
                width: width,
                height: height,
                left: left,
                top: top,
                border: '1px solid red',
              }}
            />
          );
        })}
    </>
  );
};
export default ShowFace;

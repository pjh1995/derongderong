import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil'; // recoil 추가
import './index.css';
import App from './App';

import dotenv from 'dotenv';
dotenv.config();

const app = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  app,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import 'antd/dist/antd.css'
import './style.scss'
import Home from './container/Home'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);


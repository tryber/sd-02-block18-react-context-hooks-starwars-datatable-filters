import React from 'react';
import ReactDOM from 'react-dom';
import SWProvider from './context/SWProvider';
import './index.css';
import App from './App';

ReactDOM.render(
  <SWProvider>
    <App />
  </SWProvider>,
  document.getElementById('root'),
);

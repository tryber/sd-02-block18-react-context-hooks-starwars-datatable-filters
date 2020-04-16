import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/';

import { ProviderContext } from './context/Provider';

ReactDOM.render(
  <ProviderContext>
    <Provider store={store}>
      <App />
    </Provider>
  </ProviderContext>,
  document.getElementById('root'),
);

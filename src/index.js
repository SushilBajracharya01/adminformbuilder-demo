import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ConfigureStore } from './_redux/configureStore';

ReactDOM.render(
  <Provider store={ConfigureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

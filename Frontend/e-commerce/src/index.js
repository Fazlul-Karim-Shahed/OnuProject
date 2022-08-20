import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>


);

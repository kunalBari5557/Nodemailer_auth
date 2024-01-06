import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme();

root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

reportWebVitals();

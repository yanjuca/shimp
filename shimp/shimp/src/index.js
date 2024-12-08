import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Certifique-se de que o App está sendo importado corretamente
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

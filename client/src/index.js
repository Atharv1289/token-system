import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import TokenContextProvider from './context/TokenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <TokenContextProvider>
  <BrowserRouter>
 
  <App />
 
  </BrowserRouter>
  </TokenContextProvider>
   
  
);


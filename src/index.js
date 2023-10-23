/**
 * This module handles the default gateway to the website
 * @module index
 * @version 0.1
 * @see react
 * @see react-dom
 * @see index.css
 * @see Function/App
 * @see react-router-dom
 * @see jquery
 * @see Popper
 * @see AuthProvider - customized authentication provider
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AuthProvider } from './context/AuthContext';

/**
 * This function provides the rendering information for the default gateway to the website
 * @function render
 * @see react
 * @see react-dom
 * @see index.css
 * @see Classes/App
 */
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

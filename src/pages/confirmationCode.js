import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useSearchParams, BrowserRouter, Navigate } from 'react-router-dom';
import '../styles/forms.css';
import axios from 'axios';

/**
 * confirmationCode.js
 * @namespace Complete
 * @see Classes/ConfirmationCode
 */

/**
 * This class provides the account verification confirmation code component
 * @class
 * @version 1.0
 * @todo Setup email server for authentication purposes
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const ConfirmationCode = () => {
  // getting the params Code from the link
  const [queryParameters] = useSearchParams();
  const code = queryParameters.get("code");

  /**
   * This function handles the onSubmit event. When submit, user status change to "Active" and link go to Login page
   * @function
   * @param {Event} event - The event from the onSubmit event
   */
  const handleSubmit = async () => {
    const res = await axios.put(`${process.env.REACT_APP_API}/api/users/confirm/${code}`);
  };

  /**
   * This function provides the HTML formatting of the confirmationCode component
   * @function
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Welcome to J4I</h1>
        <hr />
        <h2> Please click the button to verify your account and login.</h2>
        <a onClick={() => {handleSubmit()}} href="/login"><button>Verify Account</button></a>
        {/* <button onClick={() => {handleSubmit()}}>Verify Account</button> */}
      </div>
    </div>
  );
};

export default ConfirmationCode;

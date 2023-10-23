import React from 'react';
import '../styles/forms.css';

/**
 * successfulUser.js
 * @namespace Incomplete
 * @see Classes/SuccessfulUser

/**
 * This class provides the component to display successful user registration information to App.js.
 * @class
 * @version 1.0
 * @todo Setup email server for authentication purposes
 * @see react
 * @see styles/forms.css
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/App
 */
const SuccessfulUser = () => {
  /**
   * This function provides the HTML formatting for the successfulUser component to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <div className='form-steps'>
          <img src='approve.png' />
        </div>
        <h1 className='title'>You have signed up successfully!</h1>
        <br />
        <div className='text-content'>
          Thank you for choosing J4I. <br /> Please check your email for more
          information.
        </div>
      </div>
    </div>
  );
};

export default SuccessfulUser;

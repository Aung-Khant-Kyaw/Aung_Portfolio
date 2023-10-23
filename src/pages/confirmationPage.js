import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/forms.css';

/**
 * confirmationPage.js
 * @namespace Incomplete
 * @see Classes/ConfirmationPage
 */

/**
 * This class provides the successful account creation component
 * @class
 * @version 1.0
 * @todo Setup email server for authentication purposes
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 */
const ConfirmationPage = () => {
  /**
   * This function provides the HTML formatting of the ConfirmationPage component
   * @function
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>
          Please go to your email and verify your account by clicking on the link.
        </h1>{' '}
        <hr />
        <div className='button-button-solo'>
          <Link to={'/login'}>
            <button type='submit'>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

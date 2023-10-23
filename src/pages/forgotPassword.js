import React, { useState } from 'react';
import '../styles/forms.css';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

/**
 * forgotPassword.js
 * @namespace Complete
 * @see Classes/ForgotPassword
 */

/**
 * This class provides the forgot password component to App.js 
 * @class
 * @version 1.0
 * @todo Setup email server for authentication purposes
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select-us-states
 * @see Classes/App
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  /**
  * This function delay the next function.
  * @function
  */
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  /**
   * This function handles what happends when the user clicks the submit button
   * @function
   * @param {Event} event - The event from the onSubmit attribute of the submit button
   */
  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await axios.post(`${process.env.REACT_APP_API}/api/email/forgetpassword/${email}`);

    if (res.data.error) {
      toastInfo(res.data.error);
    } else {
      toastInfo("Email with link to reset password sent.")
      toastInfo("Now redirecting to login page.")
      await delay(2000);
      navigate('/login');
    }
  };


  /**
   * Provides the HTML formatting for the forgot password page to App.js
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='form-title'>Recover Password</h1>
        <hr />
        Please enter the email you signed up with. If this email address is on
        file, you will receive a link to reset your password. <br />
        <br />
        <form className='fields' onSubmit={(e) => handleSubmit(e)}>
          <label>
            Email:
            <input
              value={email}
              id='email'
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className='button-container-bottom'>
            <Link to='/login'>
              {' '}
              <button className='button-back' type='submit'>
                Back
              </button>
            </Link>
            <button type='submit' className='button-back'>Submit</button>
          </div>
        </form>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState, useEffect } from 'react';
import '../styles/forms.css';
import SelectUSState from 'react-select-us-states';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import { Link, useSearchParams, Redirect, useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import { encrypt } from '../utils/encryption';

/**
 * resetPassword.js
 * @namespace Complete
 * @see Classes/ResetPassword
 */

/**
 * This module provides the component to reset the user password to App.js
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select-us-states
 * @see react-select
 * @see Classes/App
 */

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    securityAnswer1: '',
    securityAnswer2: '',
    securityAnswer3: '',
  });
  const {
    newPassword,
    confirmPassword,
    securityAnswer1,
    securityAnswer2,
    securityAnswer3,
  } = formData;

  const [errors, setErrors] = useState('');

  const [userData, setUserData] = useState([]);
  const [errorsObject, setErrorsObject] = useState({});

  // getting the params Code from the link
  const [queryParameters] = useSearchParams();
  const code = queryParameters.get("token");

  /**
  * This function delay the next function.
  * @function
  */
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    (async () => {
      const {data}  = await axios.get(`${process.env.REACT_APP_API}/api/users/securityquestions/${code}`);
      if (data.role === 'Error'){
        toastFail(data.error);
        await delay(3000);
        navigate('/forgot-password')
      } else {
        setUserData(data);
      };
    })();
  }, [] );

  /**
   * This function handles the onChange event of the form's text fields
   * @function
   * @param {Event} event - The event from the onChange event attribute of the form's text fields
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // validate password
    const input = e.target.value;
    const id = e.target.id || e.id;
    let errObject = {}; // errObject saved in memory
    /* the following switch statement checks the validity of each field as it is filled in. */
    switch (
      id //handle what to do based on the id of the field
    ) {
      case 'newPassword':
        if (!validPassword(input)) {
          errObject[id] =
            'Password Requirements: (8-20) characters (2) Uppercase letters, (2) Lowercase letters, (2) Numbers, (2) Symbols';
          e.target.style.borderColor = 'red';
        } else {
          e.target.style.borderColor = 'green';
          errObject[id] = '';
        }
        handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
        break;
      case 'confirmPassword':
          if (formData.newPassword !== input) {
            errObject[id] = 'Confirm password entry does not match password';
            e.target.style.borderColor = 'red';
          } else {
            e.target.style.borderColor = 'green';
            errObject[id] = '';
          }
          handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
          break;
      default:
        break;
    }
  };


  /**
   * This function handles the onSubmit event of the form
   * @function
   * @param {Event} event - The event from the onSubmit event attribute of the form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      username: userData[3],
      password: encrypt(formData.newPassword, userData[3]),
      securityAnswer1: formData.securityAnswer1,
      securityAnswer2: formData.securityAnswer2,
      securityAnswer3: formData.securityAnswer3,
    }
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/users/resetpassword`,
      body
    );
    if (res.data.role === 'Error') {
      toastFail(res.data.error);
    } else {
      navigate('/confirmation-page')
    }
  };

  /**
   * This function check if errorsObject is clear or not.
   * Used to turn decide to disable the next and submit buttons
   * @returns boolean
   */
  const isError = () => {
    for (const key in errorsObject) {
      if (errorsObject[key] != '') return true;
    }
    return false;
  };

  /**
   * This is a resuable function to combine errorsObject state and memory errObject into one single object then update errorsObject state using setErrorsObject from useState hook
   * @param {errosObject} errorsObject
   * @param {errObject} errObject
   * @param {setErrorsObject} setErrorsObject
   */
  function handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject) {
    let combinedErrorObject = { ...errorsObject, ...errObject };
    setErrorsObject({ ...combinedErrorObject });
  };

    /**
   * Returns true if the given string is a valid password with two lower case letters, two upper case letters, two symbols, and two numbers
   * @param {String} text - The text to check
   * @returns {Boolean}
   */
  function validPassword(text) {
    const regex = RegExp(
      /^(?=.{8,20}$)(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[-$&@#%!?]){2,}).*/
    );
    return regex.test(text);
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='form-title'>Reset Password</h1>
        <hr />
        Confirm your identity by answering security questions.
        <br />
        <br />
        <form className='fields' onSubmit={(e) => handleSubmit(e)}>
          <label>{userData[0]}</label>
          <input
            type='text'
            id='securityAnswer1'
            name='securityAnswer1'
            // value={securityAnswer1}
            onChange={(e) => handleChange(e)}
            // onBlur={(e) => handleFocusChange(e)}
            required
          />
          <br />
          <br />

          <label>{userData[1]}</label>
          <input
            type='text'
            id='securityAnswer2'
            required
            name='securityAnswer2'
            // value={securityAnswer2}
            onChange={(e) => handleChange(e)}
            // onBlur={(e) => handleFocusChange(e)}
          />
          <br />
          <br />

          <label>{userData[2]}</label>
          <input
            required
            type='text'
            id='securityAnswer3'
            name='securityAnswer3'
            // value={securityAnswer3}
            onChange={(e) => handleChange(e)}
            // onBlur={(e) => handleFocusChange(e)}
          />
          <hr />
          <center>New Password must not match any of the last 10 passwords.</center>
          <div>
            <label>
              Set New Password:
              <input
                type='password'
                name='newPassword'
                // value={newPassword}
                onChange={handleChange}
                // onBlur={(e) => handleFocusChange(e)}
                id='newPassword'
                required
              />
            </label>
          </div>

          <div>
            <label>
              Confirm Password:
              <input
                type='password'
                name='confirmPassword'
                // value={confirmPassword}
                onChange={handleChange}
                // onBlur={(e) => handleFocusChange(e)}
                id='confirmPassword'
                required
              />
            </label>
            <div className='error'>{errors}</div>
          </div>
          <br />
          <ul>
            {Object.keys(errorsObject).map((key, index) => {
              if (errorsObject[key] != '') {
                return (
                  <li
                    className='error-message'
                    key={index}
                    style={{ color: 'red' }}
                  >
                    {errorsObject[key]}
                  </li>
                );
              }
            })}
          </ul>
          {errors !== '' ? <div className='error'>{errors}</div> : <div></div>}

          <div className='button-container-bottom'>
            <Link to='/'>
              {' '}
              <button className='button-back' type='submit'>
                Back
              </button>
            </Link>
            <button className='button-back' type='submit' disabled={isError()}>Reset Password</button>
          </div>
        </form>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
      </div>
    </div>
  );
};

export default ResetPassword;

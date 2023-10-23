import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';
import axios from 'axios';
import SubmitModal from '../modals/AdminConfirmModal';
import { validateForm } from '../../utils/fieldValidation';


/**
 * @namespace Complete
 * @see Classes/adminReg
 */

/**
 * This class provides the formatting for the component to register admin by super admin (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const AdminReg = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const { username, email} = formData;

  const [errorsObject, setErrorsObject] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  /**
   * This function handles input as it is entered into the text fields
   * @function
   * @param {Event} e - The event from the onChange attribute of the text fields
   */
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [key]: value.trim() });
    validateForm(e, errorsObject, setErrorsObject, formData);
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
   * This function handles the user clicking out of a field
   * @function
   * @param {Event} event - The event from the onBlur event of the text fields
   */
  const handleFocusChange = (event) => {
    const key = event.target.id;
    const val = event.target.value;
  };

  /** This function closes the modal after the close button is clicked
   * @function
   * */ 
  const closeModal = () => {
    setIsOpen(false);
  };

  /** This function resets the form
   * @function
   * */ 
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset();
  };

  /**
   * This function is called when the submit button is pressed
   * @function
   * @param {Event} e - The event from the onSubmit event of the button
   * @todo Change this so that it uses our own email server instead of opening the client's email program
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let body = {
        username: username,
        email: email,
        userType: 'admin'
      }
      let res = await axios.post(`${process.env.REACT_APP_API}/api/admins/regadmin`, body);
      
      if (res.data.error) {
        toastInfo("Message Error");
        throw res.data.error;        
        // display error message
      } else {
        handleReset();
        setIsOpen(true);
        // display success message
      }
    } catch (err) {
      console.error(err);
      toastInfo("Message Error");
    }    
  };

  /**
   * This function returns the HTML formatting of the Admin Register component to superAdmin.js
   * @function
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */
  return (
    <div className='dash-container'>
      <p className='dash-header'>Register Admin Account</p>
      <p className='dash-text'>
        Enter the new Admin's username and email. A email with a one-time link will be sent. 
      </p>
      <hr />
      <form ref ={formRef} className='fields' onSubmit={(e) => onSubmit(e)}>
          <label>
            Admin Username:
            <input
              id='username'
              type='text'
              required
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusChange(e)}
            />
          </label>
          <label>
            Email:
            <input
              id='email'
              type='text'
              required
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusChange(e)}
            />
          </label>
          <ul>
            {Object.keys(errorsObject).map((key, index) => {
              if (errorsObject[key] !== '') {
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
          <div className='button-container-bottom'>
            <a>
              <button className='button-back' type='submit' disabled={isError()}>
                Send Email
              </button>
            </a>
          </div>
        </form>
        <SubmitModal isOpen = {isOpen} close = {() => closeModal()}/>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default AdminReg;

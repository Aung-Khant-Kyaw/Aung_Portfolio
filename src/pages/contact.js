import React, { useState, useRef } from 'react';
import '../styles/forms.css';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SubmitModal from '../components/modals/SubmitModal';

/**
 * This class provides the contact us page component to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/App
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { name, email, subject, message } = formData;

  const [errors, setErrors] = useState({
    e_name: '',
    e_email: '',
    e_subject: '',
  });
  const { e_name, e_email, e_subject } = errors;

  const [isOpen, setIsOpen] = useState(false);

  /**
   * Ensure the string is made up of alphabetic characters including spaces and dashes
   * @function
   * @param {String} text - The string to check
   * @returns {Boolean}
   */
  const alphabeticSpaceDash = (text) => {
    //use regex to check if the string is alphabetic (including spaces and hyphens) (returns true if it is)
    const regex = RegExp(/^[a-zA-Z-( )]*$/);
    return regex.test(text);
  };

  /**
   * Make sure the string is a valid email address
   * @function
   * @param {String} text - The string to check
   * @returns {Boolean}
   */
  const validEmail = (text) => {
    const regex = RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/);
    return regex.test(text);
  };

  /**
   * Make sure the string is larger than or equal to the min and smaller than or equal to the max
   * @function
   * @param {String} text - The string to check
   * @param {number} min - The minimum length
   * @param {number} max - The maximum length
   * @returns {Boolean}
   */
  const minMaxLength = (text, min, max) => {
    return text.length >= min && text.length <= max;
  };

  /**
   * This function handles input as it is entered into the text fields
   * @function
   * @param {Event} e - The event from the onChange attribute of the text fields
   */
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [key]: value.trim() });

    switch (key) {
      case 'name':
        if (!minMaxLength(value, 2, 40)) {
          setErrors({
            ...errors,
            e_name: 'Name should have at least 2 and at most 40 characters',
          });
          e.target.style.borderColor = 'red';
        } else if (!alphabeticSpaceDash(value)) {
          setErrors({
            ...errors,
            e_name: 'Name should be only alphabetic, space, or dash characters',
          });

          e.target.style.borderColor = 'red';
        } else {
          setErrors({
            ...errors,
            e_name: '',
          });
          e.target.style.borderColor = 'green';
        }

        break;
      case 'email':
        if (!validEmail(value)) {
          setErrors({
            ...errors,
            e_email: 'This is not a valid email',
          });

          e.target.style.borderColor = 'red';
        } else {
          setErrors({
            ...errors,
            e_email: '',
          });
          e.target.style.borderColor = 'green';
        }

        break;
      case 'subject':
        if (!minMaxLength(value, 4, 70)) {
          setErrors({
            ...errors,
            e_subject:
              'Subject should have at least 4 and at most 70 characters',
          });
          e.target.style.borderColor = 'red';
        } else {
          e.target.style.borderColor = 'green';
          setErrors({
            ...errors,
            e_subject: '',
          });
        }
        break;
      default:
        break;
    }
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
        subject: subject,
        email: email,
        name: name,
        message: message
      }
      let res = await axios.post(`${process.env.REACT_APP_API}/api/email/contact`, body);
      
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
   * This function provides the HTML formatting of the contact us page to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Contact Us</h1>
        <hr />
        <div className='text-content'>
          If you have any questions or concerns, please leave us a message and
          our team will get back to you as soon as possible. <br />
        </div>
        <form ref ={formRef} className='fields' onSubmit={(e) => onSubmit(e)}>
          <label>
            Name:
            <input
              id='name'
              type='text'
              required
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusChange(e)}
            />
          </label>
          <div className='errors'>{e_name}</div>
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
          <div className='errors'>{e_email}</div>
          <label>
            Subject:
            <input
              id='subject'
              type='text'
              required
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusChange(e)}
            />
          </label>
          <div className='errors'>{e_subject}</div>

          <label>
            Message:
            <textarea
              id='message'
              rows='5'
              required
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleFocusChange(e)}
            />
          </label>
          <div className='button-container-bottom'>
            <Link to='/'>
              {' '}
              <button className='button-back' type='button'>
                Back
              </button>
            </Link>
            <a>
              <button className='button-back' type='submit' disabled={e_name || e_email || e_subject}>
                Submit
              </button>
            </a>
          </div>
        </form>
        <SubmitModal isOpen = {isOpen} close = {() => closeModal()}/>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
      </div>
    </div>
  );
};

export default Contact;

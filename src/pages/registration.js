import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/forms.css';

/**
 * This class provides the formatting for the user type registration page to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/App
 * return JSX component
 */
const Registration = () => {
  /**
   * This function provides the HTML formatting for the page for users to select their user type to App.js.
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Register for an account</h1>
        <hr />
        <div className='reg-pics'>
        </div>
        <br />
        <br />
        <div className='reg'>
          <Link to='/registration-student' state={{ userType: 'student' }}>
            <div className='reg-component'>
              <img className='regImg' src='collegeBlue.png'></img>
              <br />
              <div className='reg-text'>I am a student</div>
            </div>
          </Link>
          <Link to='/registration-business' state={{ userType: 'business' }}>
            <div className='reg-component'>
              <img className='regImg' src='brieficonblue.png'></img>
              <br />
              <div className='reg-text'>I am a business</div>
            </div>
          </Link>
        </div>
        <div className='link-text'>
        Already have an account?
        <Link to='/login'>  Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;

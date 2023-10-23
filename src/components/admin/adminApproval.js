/**
 * adminApproval.js
 * @namespace Incomplete
 * @see Modules/AdminApproval
 */
/**
 * This module provides the formatting for the admin approval component (in development)
 * @module AdminApproval
 * @version 1.0
 * @todo Finalize admin creation/functional process
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 */
import React from 'react';
import '../styles/forms.css';
import { Link } from 'react-router-dom';

/**
 * This function provides the HTML formatting of the admin approval page
 * @function
 * @returns {HTMLCollection}
 */
const AdminApproval = () => {
  return (
    <div className='page-container'>
      <div className='form-container'>
        <form className='fields'>
          <label>
            Comments/Feedback:
            <textarea id='comments' rows='5' />
            <br />
          </label>

          <div className='button-container-bottom'>
            <div className='form-steps'>
              <Link to='./'>
                <img src='deny.png' />
              </Link>
              <Link to='./'>
                <img src='approve.png' />{' '}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminApproval;

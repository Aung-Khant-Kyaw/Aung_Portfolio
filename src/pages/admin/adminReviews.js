import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
// import '../../styles/admin.css';

/**
 * adminReviews.js
 * @namespace Incomplete
 * @see Classes/AdminReviews
 */

/**
 * This class provides the component for the admin to edit reviews (in development)
 * @class
 * @version 1.0
 * @todo Finalize signup process, permissions, and workflow for admin users
 * @see react
 * @see styles/admin.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const AdminReviews = () => {
  const [history, setHistory] = useState([]);

  /**
   * This function handles the onChange event from the page's text fields
   * @function
   * @param {Event} e -This is the event from the onChange attribute of the text fields
   */
  const handleChange = (e) => {
    if (e.target.value != 'no-value') {
      setHistory([...history, `/${e.target.value}`]);
    }
  };

  /**
   * This function provides the HTML formatting of the AdminReviews component
   * @function
   * @returns {HTMLCollection}
   */

  return (
    <div className='page-container'>
      <div className='large-container'>
        <div className='adminSelect'>
          <select onChange={(e) => handleChange(e)} defaultValue='no-value'>
            <option value='no-value'> Select an Option...</option>
            <option value='admin-usercontrols'>
              User Controls (Reset Password, Delete User, etc)
            </option>
            <option value='admin-jobpostings'>View Job Postings</option>
            <option value='admin-reviews'>View Business/Student Reviews</option>
            <option value='admin-security'>
              Update Password or Security Questions
            </option>
          </select>
        </div>

        <h1 className='title'>Business/Student Reviews</h1>
        <hr />

        <table className='adminTable'>
          <thead>
            <tr>
              <th>Type</th>
              <th>Business</th>
              <th>Student</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='tableData' id='type'>
                Student Review
              </td>
              <td className='tableData' id='userName'>
                Google
              </td>
              <td className='tableData' id='userStatus'>
                John Smith
              </td>
              <td className='tableData' id='userStatus'>
                Under Review
              </td>
              <td className='tableData'>
                <select>
                  <option value='View'>View</option>
                  <option value='delete'>Delete</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='button-button-solo'>
          <Link to='/'>
            <button type='submit'>Submit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;

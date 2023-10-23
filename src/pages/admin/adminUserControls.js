import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
// import '../../styles/admin.css';

/**
 * adminUserControls.js
 * @namespace Incomplete
 * @see Classes/AdminUserControls
 */

/**
 * This class provides the component for the admin control panel (in development)
 * @class
 * @version 1.0
 * @todo Finalize signup process, permissions, and workflow for admin users
 * @see react
 * @see styles/admin.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const AdminUserControls = () => {
  const [history, setHistory] = useState([]);
  /**
   * This function handles changes of selction in the selection fields
   * @function
   * @param {Event} e - The event from the onChange attribute of the selection object
   */
  const handdleChange = (e) => {
    if (e.target.value != 'no-value') {
      setHistory([...history, `/${e.target.value}`]);
    }
  };

  /**
   * This function provides the HTML formatting of the adminUserControls component
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='large-container'>
        <div className='adminSelect'>
          <select onChange={(e) => handdleChange(e)} defaultValue='no-value'>
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
        <h1 className='title'>User Account Controls</h1>
        <hr />

        <table className='adminTable'>
          <th>User</th>
          <th>Status</th>
          <th>Date Last Active</th>
          <th>Actions</th>
          <tr>
            <td className='tableData' id='userName'>
              John Smith
            </td>
            <td className='tableData' id='userStatus'>
              Active
            </td>
            <td className='tableData' id='userDate'>
              1/2/2021
            </td>
            <td className='tableData'>
              <select>
                <option value='reset'>Reset Password</option>
                <option value='archive'>Archive</option>
                <option value='lock'>Lock</option>
                <option value='unlock'>Unlock</option>
                <option value='delete'>Delete</option>
              </select>
            </td>
          </tr>
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

export default AdminUserControls;

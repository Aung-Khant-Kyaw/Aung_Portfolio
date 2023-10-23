import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import '../styles/forms.css';

/**
 * viewJobPosting.js
 * @namespace Incomplete
 * @see Classes/ViewJobPosting
 */

/**
 * This class provides the component for a job posting (in development)
 * @class ViewJobPosting
 * @version 1.0
 * @todo Finalize job creation, storage, retrieval, and display process
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select-us-states
 */
const ViewJobPosting = () => {
  /**
   * This function provides the HTML formatting for a job posting
   * @function
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Position Title </h1>
        <h3 className='form-title'>Company Name </h3>
        <hr />
        <form className='fields' onSubmit={() => {}}>
          <label> Job Title: </label>
          <br /> <br />
          <label> Job Location: </label>
          <br /> <br />
          <label> Skill Level: </label>
          <br /> <br />
          <label> Years of Work Experience: </label> <br /> <br />
          <label> Minimum Degree: </label>
          <br /> <br />
          <label> Paid: </label>
          <br />
          <br />
          <label> Start Date: </label>
          <br /> <br />
          <label> Application Closing Date: </label>
          <br /> <br />
          <label> Duration: </label>
          <br /> <br />
          <label> Number of Positions: </label>
          <br /> <br />
          <label> Job Description: </label>
          <br />
          <br />
          <label> Requirements: </label>
          <br />
          <br />
          <label> Industry Categories: </label>
          <br />
          <br />
          <label> Links: </label>
          <br /> <br />
          <h2>Contact Info</h2>
          <label> First Name: </label>
          <br />
          <label> Last Name: </label>
          <br />
          <label> Title: </label>
          <br />
          <label> Email: </label>
          <br />
        </form>
        <div className='button-button-solo'>
          <Link to='/apply-job'>
            <button type='submit'>Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewJobPosting;

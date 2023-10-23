import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import '../styles/forms.css';
import { useState } from 'react';

/**
 * applyToJob.js
 * @namespace Incomplete
 * @see Classes/ApplyToJob
 */

/**
 * This class provides the HTML formatting for the apply to job page. (In development)
 * @class
 * @version 1.0
 * @todo Finalize job creation, storage, retrieval, and display process
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const ApplytoJob = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    school: '',
    graduationYear: '',
    gpa: '',
    websiteLink: '',
    repositoryLink: '',
    socialMediaLink: '',
  });
  const {
    name,
    email,
    address,
    school,
    graduationYear,
    gpa,
    websiteLink,
    repositoryLink,
    socialMediaLink,
  } = formData;

  /**
   * This function handles the onChange event of the form's text fields
   * @function
   * @param {Event} event - The event from the onChange event attribute of the form's text fields
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * This function handles the onSubmit event of the form
   * @function
   * @param {Event} e - The event from the onSubmit event attribute of the form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // @TODO: Send the form data to the backend
    console.log(formData);
  };

  /**
   * This function returns the HTML formatting for the page
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Position Title </h1>
        <h3 className='form-title'>Company Name </h3>
        <hr />
        <form className='fields' onSubmit={(e) => handleSubmit(e)}>
          <label>Name:</label>
          <br />
          <input
            value={name}
            id='name'
            type='text'
            required
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>Email:</label>
          <br />
          <input
            value={email}
            id='email'
            type='email'
            onChange={(e) => handleChange(e)}
            required
          />
          <br />

          <label>Address: </label>
          <br />
          <input
            value={address}
            id='address'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>School: </label>
          <br />
          <input
            value={school}
            id='school'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>Graduation Year: </label>
          <br />
          <input
            value={graduationYear}
            id='graduationYear'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>GPA: </label>
          <br />
          <input
            value={gpa}
            id='gpa'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />

          <hr className='header-spacing' />

          <label>Upload Resume</label>
          <br />
          <input type='file' name='resume' />
          <br />

          <label>Upload Cover Letter</label>
          <br />
          <input type='file' name='coverLetter' />
          <br />

          <label>Upload Additional File</label>
          <br />
          <input type='file' name='additionalDocument' />
          <br />

          <hr className='header-spacing' />

          <label>Link to Website: </label>
          <br />
          <input
            value={websiteLink}
            id='websiteLink'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>Link to Repository: </label>
          <br />
          <input
            value={repositoryLink}
            id='repositoryLink'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <label>Link to Social Media: </label>
          <br />
          <input
            value={socialMediaLink}
            id='socialMediaLink'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          <br />

          <div className='button-button-solo'>
            {/* <Link to='#'> */}
            <button type='submit'>Apply</button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplytoJob;

import React, { useState } from 'react';
import Select from 'react-select';
// import '../../styles/admin.css';
import { FILTER_SECURITY_OPTIONS } from '../../utils/constants';

/**
 * adminSecurity.js
 * @namespace Incomplete
 * @see Classes/AdminSecurity
 */

/**
 * This class provides the component for admin security question selection (in development)
 * @class
 * @version 1.0
 * @todo Finalize signup process, permissions, and workflow for admin users
 * @see react
 * @see styles/admin.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select
 */
const AdminSecurity = () => {
  const [formData, setFormData] = useState({
    updatePassword: '',
    confirmUpdatePassword: '',
    securityQuestion1: '',
    securityQuestion2: '',
    securityQuestion3: '',
    securityQuestion4: '',
    securityQuestion5: '',
    securityAnswer1: '',
    securityAnswer2: '',
    securityAnswer3: '',
    securityAnswer4: '',
    securityAnswer5: '',
  });
  const [questionVals, setQuestionVals] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState('');

  /**
   * This function handles the onChange event of selection fields
   * @function
   * @param {Event} e - This is the event from the onChange attribute of selection objects
   */
  const handleHistoryChange = (e) => {
    if (e.target.value != 'no-value') {
      setHistory([...history], `/${e.target.value}`);
    }
  };

  /**
   * This function handles question selection changes
   * @function
   * @param {String} option - The string of the new question selection
   * @param {number} index - The index of the new question selection
   */
  const handleQuestionValChange = (option, index) => {
    const newQuestionVals = questionVals;
    newQuestionVals[index] = option;
    setQuestionVals(newQuestionVals);
    setFormData({
      ...formData,
      [`securityQuestion${index + 1}`]: option.value,
    });
  };

  /**
   * This function returns the indexes of question options that are still available
   * @function
   * @returns {number[]}
   */
  const getAvailableOptions = () => {
    return FILTER_SECURITY_OPTIONS.filter((questionOption) => {
      return questionVals.indexOf(questionOption) === -1;
    });
  };

  /**
   * This function handles the onChange event of text fields
   * @function
   * @param {Event} event - The event from the onChange event attribute of the text fields
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * This function handles the onSubmit event of the submit button
   * @function
   * @param {Event} event - The event from the onSubmit event attribute of the submit button
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let val of questionVals) {
      if (val === null) {
        const error = `Please select a question for ALL fields`;
        setErrors(error);
        return;
      } else {
        setErrors('');
      }
    }

    if (validate()) {
      console.log(formData);
    }
  };

  /**
   * This function checks to make sure a valid password has been choosen
   * @function
   * @returns {Boolean}
   */
  const validate = () => {
    let isValid = true;

    if (formData.updatePassword) {
      var pattern = new RegExp(
        '^(?=.{8,20}$)(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[-$&@#%!]){2,}).*'
      );
      if (!pattern.test(formData.updatePassword)) {
        isValid = false;
        setErrors(
          'Please enter a valid password. Passwords must 8-20 characters long, uses the following symbols -$&@#%!], and at least two of each character class.'
        );
      }
    }

    if (formData.updatePassword && formData.confirmUpdatePassword) {
      if (formData.updatePassword != formData.confirmUpdatePassword) {
        isValid = false;
        setErrors("The passwords don't match.");
      }
    }

    return isValid;
  };

  /**
   * This function provides the HTML formatting of the adminSecurity component
   * @function
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='large-container'>
        <div className='adminSelect'>
          <select
            onChange={(e) => handleHistoryChange(e)}
            defaultValue='no-value'
          >
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
        <h1 className='title'>Password & Security</h1>
        <hr />

        <div className='admin-div'>
          <form className='fields' onSubmit={(e) => handleSubmit(e)}>
            <label>
              Update Password:
              <input
                type='password'
                name='updatePassword'
                value={formData.updatePassword}
                onChange={handleChange}
                id='updatePassword'
              />
            </label>
            <br />
            <br />
            <label>
              Confirm Update Password:
              <input
                type='password'
                name='confirmUpdatePassword'
                value={formData.confirmUpdatePassword}
                onChange={handleChange}
                id='confirmUpdatePassword'
              />
            </label>
            <br />
            <br />
            <label> Security Question #1:</label>
            <Select
              isSearchable={false}
              placeholder='Question #1'
              value={questionVals[0]}
              options={getAvailableOptions()}
              onChange={(e) => {
                handleQuestionValChange(e, 0);
              }}
            />
            <input
              type='text'
              id='securityAnswer1'
              value={formData.securityAnswer1}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label> Security Question #2:</label>
            <Select
              isSearchable={false}
              placeholder='Question #2'
              value={questionVals[1]}
              options={getAvailableOptions()}
              onChange={(e) => {
                handleQuestionValChange(e, 1);
              }}
            />
            <input
              type='text'
              id='securityAnswer2'
              value={formData.securityAnswer2}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label> Security Question #3:</label>
            <Select
              isSearchable={false}
              placeholder='Question #3'
              value={questionVals[2]}
              options={getAvailableOptions()}
              onChange={(e) => {
                handleQuestionValChange(e, 2);
              }}
            />
            <input
              type='text'
              id='securityAnswer3'
              value={formData.securityAnswer3}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label> Security Question #4:</label>
            <Select
              isSearchable={false}
              placeholder='Question #4'
              value={questionVals[3]}
              options={getAvailableOptions()}
              onChange={(e) => {
                handleQuestionValChange(e, 3);
              }}
            />
            <input
              type='text'
              id='securityAnswer4'
              value={formData.securityAnswer4}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label> Security Question #5:</label>
            <Select
              isSearchable={false}
              placeholder='Question #5'
              value={questionVals[4]}
              options={getAvailableOptions()}
              onChange={(e) => {
                handleQuestionValChange(e, 4);
              }}
            />
            <input
              type='text'
              id='securityAnswer5'
              value={formData.securityAnswer5}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors !== '' ? (
              <div className='error'>{errors}</div>
            ) : (
              <div></div>
            )}
            <div className='button-button-solo'>
              <a>
                <button type='submit'>Submit</button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;

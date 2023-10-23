import '../../styles/jobPosting1.css';
import '../../styles/jobPosting2.css';
import '../../styles/jobPosting3.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DEFAULT_APP } from '../../utils/constants';
import SubmitJob from '../modals/SubmitJob';
import { validEmail } from '../../utils/fieldValidation';

/**
 * This class provides the formatting for the component to the third and final page of 'POST A JOB' to jobPostingWrapper.js (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const JobPosting3 = ({
  formData,
  handleFieldChange,
  handlePageChange,
  handleCancel,
  user,
  errorsObject,
  setCurrentComponent,
  reseterrorsObject,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [appData, setAppData] = useState(DEFAULT_APP);

  useEffect(() => {
    setAppData({ ...appData, businessID: user._id });
  }, []);



  const isError3 = () => {
    const invalidFields = [];
    if (formData.skills === '') {
      invalidFields.push('Skills');
    }
    if (formData.firstName === '') {
      invalidFields.push('First Name');
    }
    if (formData.lastName === '') {
      invalidFields.push('Last Name');
    }
    if (formData.title === '') {
      invalidFields.push('Title');
    }
    if (formData.email === '' || !validEmail(formData.email)) {
      invalidFields.push('Email');
    }
    return invalidFields;
  };

  const handleFormSubmit = async () => {
    const invalidFields = isError3();
    {
      if (invalidFields.length > 0) {
        const errorMessage = `Please enter required fields: ${invalidFields.join(
          ', '
        )}`;
        setError(errorMessage);
        return;
      }
    }
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/jobs`, {
        ...formData,
        businessID: user._id,
        businessName: user.businessName,
        companyIndustry: user.companyIndustry,
        companySize: user.companySize,
      });
      setIsOpen(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/applications/defaultApp`,
        appData
      );
    } catch (e) {
      const err = e.response.data.errors;
      if (err) {
        err.forEach((error) => {
          console.error(error.msg);
          setError(`${error.msg}`);
        });
      }
    }
  };

  /**
   * This function returns the HTML formatting of the JobPosting3 component to dashboard.js
   * @function
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */
  return (
    <div className='jp2-container'>
      <div className='jp3-wrapper'>
        <div className='jp3-header'>
          <div className='jp3-headline'>
            New Job Posting <span className='jp3-step'>(3/3)</span>
          </div>
          <div className='jp3-guide'>
            Fill the fields below, then click submit to post your new job
            posting!
          </div>
        </div>

        <hr />

        <div className='jp3-body-wrapper'>
          <div className='jp3-left'>
            <div className='jp3-skills'>
              <div className='jp3-label'>Skills</div>
              <textarea
                rows='5'
                className='jp3-value'
                type='text'
                value={formData.skills}
                id='skills'
                required
                onChange={(e) => handleFieldChange(e)}
              />
            </div>

            <div className='jp3-poc'>
              <div className='jp3-poc-label'>Point Of Contact</div>

              <div className='jp3-first-name'>
                <div className='jp3-label'>First Name</div>
                <input
                  type='text'
                  className='jp3-value'
                  value={formData.firstName}
                  id='firstName'
                  required
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>

              <div className='jp3-last-name'>
                <div className='jp3-label'>Last Name</div>
                <input
                  type='text'
                  className='jp3-value'
                  value={formData.lastName}
                  id='lastName'
                  required
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>

              <div className='jp3-title'>
                <div className='jp3-label'>Title</div>
                <input
                  type='text'
                  className='jp3-value'
                  value={formData.title}
                  id='title'
                  required
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>

              <div className='jp3-email'>
                <div className='jp3-label'>Email</div>
                <input
                  type='text'
                  className='jp3-value'
                  value={formData.email}
                  id='email'
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
            </div>
            {error && (
              <div
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: 'medium',
                  textAlign: 'center',
                  margin: '10px',
                }}
              >
                {error}
              </div>
            )}
            <div className='jp3-btn-wrapper' style={{ textAlign: 'center' }}>
              <div
                className='jp3-back-btn'
                onClick={() => {
                  {
                    reseterrorsObject();
                  }
                  {
                    handlePageChange(false);
                  }
                }}
              >
                Back
              </div>

              <div
                className='jp-submit'
                onClick={handleFormSubmit}
                disabled={isError3() || isLoading}
                style={{ display: 'inline-block' }}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </div>
            </div>
            <div>
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
                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SubmitJob
        isOpen={isOpen}
        setCurrentComponent={setCurrentComponent}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default JobPosting3;

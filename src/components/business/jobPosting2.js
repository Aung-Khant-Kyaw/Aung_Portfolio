import React from 'react';
import '../../styles/jobPosting2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

/**
 * This class provides the formatting for the component to the second page of 'POST A JOB' to jobPostingWrapper.js (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const JobPosting2 = ({
  formData,
  setFormData,
  handleFieldChange,
  handlePageChange,
  handleCancel,
  isError,
}) => {
  /**
   * This function returns the HTML formatting of the JobPosting2 component to dashboard.js
   * @function
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */
  return (
    <div className='jp2-container'>
      <div className='jp2-wrapper'>
        <div className='jp2-header'>
          <div className='jp2-headline'>
            New Job Posting <span className='jp2-step'>(2/3)</span>
          </div>
          <div className='jp2-guide'>
            Fill the fields below, then click Save and Continue at the bottom.
          </div>
        </div>

        <hr />

        <div className='jp2-body-wrapper'>
          <div className='jp2-right'>
            <div className='jp-title'>
              <div className='jp-label'>Job Title</div>
              <input
                className='jp-value'
                type='text'
                value={formData.jobTitle}
                id='jobTitle'
                required
                onChange={(e) => handleFieldChange(e)}
              />
            </div>
            <div className='jp2-type'>
              <div className='jp2-label'>Job Type</div>
              <select
                className='jp2-select-value'
                id='type'
                name='type'
                value={formData.type}
                required
                onChange={(e) => handleFieldChange(e)}
              >
                <option value='N/A'>Select One</option>
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='jp2-deadline'>
              <div className='jp2-label'>Application Deadline</div>
              <DatePicker
                placeholderText='Select Deadline'
                showTimeSelect
                dateFormat='MMMM d, yyyy h:mmaa'
                selected={formData.deadline}
                minDate={new Date()}
                onChange={(date) => {
                  if (date) {
                    setFormData({
                      ...formData,
                      deadline: new Date(date.toString()),
                    });
                  } else {
                    toast.error('Please select a deadline');
                  }
                }}
              />
            </div>

            <div className='jp-job-description'>
              <div className='jp2-label'>Job Description & Requirements</div>
              <textarea
                className='jp2-value'
                cols='58'
                rows='15'
                type='text'
                value={formData.description}
                id='description'
                required
                onChange={(e) => handleFieldChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting2;

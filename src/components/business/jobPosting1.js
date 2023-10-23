import React, { useState } from 'react';
import '../../styles/jobPosting1.css';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { usStates } from '../../utils/constants';


const JobPosting1 = ({
  formData,
  setFormData,
  handleFieldChange,
  errorsObject,
  setIsRemote,
  isRemote,
}) => {

  const [selectedState, setSelectedState] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };
  const statesArray = Object.keys(usStates).map((abbreviation) => ({
    abbreviation,
    name: usStates[abbreviation],
  }));

  return (
    <div className='jp-container'>
      <div className='jp-header'>
        <div className='jp-headline'>
          New Job Posting <span className='jp-step'>(1/3)</span>
        </div>
        <div className='jp-guide'>
          Fill the fields below, then click Save and Continue at the bottom.
        </div>
      </div>
      <div className='jp-wrapper'>
        <hr />

        <div className='jp-body-wrapper'>
          <div className='jp2-location'>
            <div className='jp2-label'>Location</div>
            <select
              className='jp2-select-value'
              id='location'
              name='location'
              required
              value={formData.location}
              onChange={(e) => {
                if (e.target.value === 'Remote') {
                  setIsRemote(true);
                } else {
                  setIsRemote(false);
                }
                handleFieldChange(e);
              }}
            >
              <option value=''>Select One</option>
              <option value='Remote'>Remote</option>
              <option value='Hybrid'>Hybrid</option>
              <option value='On-Site'>On-Site</option>
            </select>
          </div>

          {!isRemote && (
            <div>
              <div className='jp-address'>
                <div className='jp-label'>Address Line 1</div>
                <input
                  className='jp-value'
                  required
                  type='text'
                  value={formData.jobStreet}
                  id='jobStreet'
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>

              <div className='jp-address'>
                <div className='jp-label'>Address Line 2</div>
                <input
                  className='jp-value'
                  required
                  type='text'
                  value={formData.jobStreet2}
                  id='jobStreet2'
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
            </div>
          )}

          <div className='jp-state'>
            <div className='jp-state'>
              <div className='jp-label'>State</div>
              <select
                className='jp-state-value'
                value={selectedState}
                id='jobState'
                required
                onChange={(e) => {
                  handleStateChange(e);
                  handleFieldChange(e);
                }}
              >
                <option value=''>Select One</option>
                {statesArray.map((state) => (
                  <option key={state.abbreviation} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='jp-city'>
            <div className='jp-label'>City</div>
            <input
              className='jp-value'
              required
              type='text'
              value={formData.jobCity}
              id='jobCity'
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
          <div className='jp-zip'>
            <div className='jp-label'>Zip Code</div>
            <input
              className='jp-value'
              type='text'
              value={formData.jobZip}
              id='jobZip'
              required
              onChange={(e) => handleFieldChange(e)}
              minLength='5'
              maxLength='10'
              pattern='[0-9-]*'
            />
          </div>
          <div className='jp-duration'>
            <div>
              <div className='jp-label'>Start Date</div>
              <Datepicker
                required
                placeholderText='Select Start Date'
                selected={formData.start}
                selectsStart
                startDate={formData.start}
                endDate={formData.end}
                minDate={tomorrow}
                onChange={(date) => {
                  if (date) {
                    setFormData({
                      ...formData,
                      start: new Date(date.toString()),
                    });
                  } else {
                    toast.error('Please select a start date');
                  }
                }}
              />
            </div>
            <div>
              <div className='jp-label'>End Date</div>
              <Datepicker
                placeholderText='Select End Date'
                selected={formData.end}
                selectsEnd
                startDate={formData.start}
                endDate={formData.end}
                minDate={formData.start}
                onChange={(date) =>
                  setFormData({ ...formData, end: new Date(date.toString()) })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default JobPosting1;

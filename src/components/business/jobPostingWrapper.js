import React, { useEffect, useState } from 'react';
import '../../styles/forms.css';
import JobPosting1 from './jobPosting1';
import JobPosting2 from './jobPosting2';
import JobPosting3 from './jobPosting3';
import '../../styles/jobPosting1.css';
import '../../styles/jobPosting2.css';
import { JOB_FORM_DATA} from '../../utils/constants';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { validZip, validateForm, validEmail, handleUpdateErrorsObject } from '../../utils/fieldValidation';


const JobPostingWrapper = ({ setCurrentComponent }) => {
  const { user } = useAuth();
  const [isRemote, setIsRemote] = useState(false);
  const [selectedState, setSelectedState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState(JOB_FORM_DATA);
  const [errorsObject, setErrorsObject] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleFieldChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === 'email') {
      const errObject = { ...errorsObject };
      if (!validEmail(value)) {
        errObject.email = 'Must use a valid email address';
        e.target.style.borderColor = 'red';
      } else {
        errObject.email = '';
        e.target.style.borderColor = 'green';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: value });
      validateForm(e, errorsObject, setErrorsObject, formData);
    }
  };

  const reseterrorsObject = () => {
    setErrorsObject({});
    setErrorMessage('');
  };

  const handlePageChange = (next) => {
    if (next) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === 3;

  const isError1 = () => {
    const invalidFields = [];
    if (formData.location === '') {
      invalidFields.push('Location');
    } else if (formData.location !== 'Remote' && formData.jobStreet === '') {
      invalidFields.push('Address');
    }
    if (formData.jobCity === '') {
      invalidFields.push('City');
    }
    if (formData.jobState === '') {
      invalidFields.push('State');
    }
    if (formData.jobZip === '' || !validZip(formData.jobZip)) {
      invalidFields.push('Zip Code');
    }
    if (formData.start === '') {
      invalidFields.push('Start Date');
    }
    return invalidFields;
  };

  const isError2 = () => {
    const invalidFields = [];
    if (formData.jobTitle.length < 3) {
      invalidFields.push('Job Title');
    }
    if (formData.type === '') {
      invalidFields.push('Job Type');
    }
    if (!formData.deadline) {
      invalidFields.push('Deadline');
    } else if (formData.deadline > formData.start) {
    }
    if (formData.description.length < 3) {
      invalidFields.push('Description');
    }
    return invalidFields;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getComponent = () => {
    switch (currentPage) {
      case 1:
        return (
          <JobPosting1
            formData={formData}
            setFormData={setFormData}
            handleFieldChange={handleFieldChange}
            setIsRemote={setIsRemote}
            isRemote={isRemote}
          />
        );
      case 2:
        return (
          <JobPosting2
            formData={formData}
            setFormData={setFormData}
            handleFieldChange={handleFieldChange}
          />
        );
      case 3:
        return (
          <JobPosting3
            formData={formData}
            handleFieldChange={handleFieldChange}
            handlePageChange={handlePageChange}
            isError={isError2}
            user={user}
            errorsObject={errorsObject}
            setCurrentComponent={setCurrentComponent}
            reseterrorsObject={reseterrorsObject}
          />
        );
      default:
        return (
          <JobPosting1
            formData={formData}
            setFormData={setFormData}
            handleFieldChange={handleFieldChange}
          />
        );
    }
  };
  return (
    <div>
      {getComponent()}
      {errorMessage && (
        <div
          style={{
            color: 'red',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '10px',
          }}
        >
          {errorMessage}
        </div>
      )}

      {currentPage === 1 && (
        <div>
          <div className='jp-btn-wrapper'>
            <button
              className='jp-next-btn'
              onClick={() => {
                const invalidFields = isError1();
                if (invalidFields.length > 0) {
                  const errorMessage = `Please enter required fields: ${invalidFields.join(
                    ', '
                  )}`;
                  setErrorMessage(errorMessage);
                } else {
                  setErrorMessage('');
                  handlePageChange(true);
                }
              }}
            >
              Save and continue
            </button>
          </div>
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
      )}

      {currentPage === 2 && (
        <div>
          <div className='jp2-btn-wrapper'>
            {isFirstPage ? null : (
              <div
                className='jp2-back-btn'
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
            )}
            <button
              className='jp-next-btn'
              onClick={() => {
                const invalidFields = isError2();
                if (invalidFields.length > 0) {
                  const errorMessage = `Please enter required fields: ${invalidFields.join(
                    ', '
                  )}`;
                  setErrorMessage(errorMessage);
                } else if (
                  formData.start &&
                  formData.deadline > formData.start
                ) {
                  setErrorMessage(
                    'Application Deadline cannot be after the start date'
                  );
                } else {
                  setErrorMessage('');
                  handlePageChange(true);
                }
              }}
            >
              Save and continue
            </button>
          </div>
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
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default JobPostingWrapper;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';

/**
 * applyToJob.js
 * @namespace Incomplete
 * @see Classes/ApplyToJob
 */

/**
 * This class provides the component for a student applying for a job (in development)
 * @class
 * @version 1.0
 * @todo Finalize job creation, storage, retrieval, and display process
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const ApplyToJob = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skillLevel: '',
    yearExp: '',
    degree: '',
    skills: '',
    linkWeb: '',
    linkRepo: '',
    linkSocial: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Job Application</h1>
        <hr />
        <form className='fields' onSubmit={(e) => handleSubmit(e)}>
          <label> Name: </label>
          <input
            value={formData.name}
            id='name'
            type='text'
            required
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label> Email: </label>
          <input
            value={formData.email}
            id='email'
            type='email'
            required
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label> Skill Level: </label>
          <select
            id='skillLevel'
            name='SkillLevel'
            onChange={(e) =>
              setFormData({ ...formData, skillLevel: e.target.value })
            }
            required
          >
            <option value='NOTSPECIFIED'>Not Specified</option>
            <option value='BEGINNER'>Beginner</option>
            <option value='INTERMEDIATE'>Intermediate</option>
            <option value='ADVANCED'>Advanced</option>
          </select>
          <br />
          <label> Years of Work Experience: </label>
          <input
            value={formData.yearExp}
            id='yearExp'
            minLength='4'
            maxLength='4'
            max='2022'
            pattern='[0-9]*'
            type='text'
            required
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label> My Highest Degree: </label>
          <select
            id='degree'
            name='degree'
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
          >
            <option value='DIP'>HS Diploma</option>
            <option value='AA'>AS|AA</option>
            <option value='BS'>BS|BA</option>
            <option value='MS'>MS|MA</option>
            <option value='PHD'>PhD|Dsc|LLD</option>
          </select>
          <br />
          <label> Skills: </label>
          <textarea
            value={formData.skills}
            id='skills'
            rows='5'
            onChange={(e) => handleChange(e)}
          />
          <br />
          <br />
          <label>Upload Resume</label>
          <br />
          <input type='file' name='resume' required />
          <br />
          <label>Upload Cover Letter</label>
          <br />
          <input type='file' name='coverLetter' />
          <br />
          <label>Upload Additional File</label>
          <br />
          <input type='file' name='additionalDocument' />
          <br />
          <br />
          <label>Link to Website: </label>
          <br />
          <input
            type='text'
            value={formData.linkWeb}
            id='linkWeb'
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label>Link to Repository: </label>
          <br />
          <input
            type='text'
            value={formData.linkRepo}
            id='linkRepo'
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label>Link to Social Media: </label>
          <br />
          <input
            type='text'
            value={formData.linkSocial}
            id='linkSocial'
            onChange={(e) => handleChange(e)}
          />
          <br />
          <div className='button-button-solo'>
            <button type='submit'>Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyToJob;

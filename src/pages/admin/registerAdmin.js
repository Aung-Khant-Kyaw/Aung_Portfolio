import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useSearchParams, BrowserRouter, Navigate } from 'react-router-dom';
import '../../styles/forms.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import { ADMIN_FORM_DATA, FILTER_SECURITY_OPTIONS} from '../../utils/constants';
import { validateForm } from '../../utils/fieldValidation';
import Select from 'react-select';
import { encrypt } from '../../utils/encryption';

/**
 * registerAdmin.js
 * @namespace Complete
 * @see Classes/RegisterAdmin
 */

/**
 * This class provides the account verification confirmation code component
 * @class
 * @version 1.0
 * @todo Setup email server for authentication purposes
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 */
const RegisterAdmin = () => {
  // getting the params Code from the link
    const [queryParameters] = useSearchParams();
    const code = queryParameters.get("code");
    const username = queryParameters.get("username");
    const [errorsObject, setErrorsObject] = useState({});
    const [questionVals, setQuestionVals] = useState([null, null, null]);
    const [formData, setFormData] = useState(ADMIN_FORM_DATA);
    const [errors, setErrors] = useState([]);
    const [isRedirect, setIsRedirect] = useState(false);
    const form = new FormData();

    /**
   * This function is called everytime one of the text fields is edited. Calls the field validation utility module
   * @function
   * @see Modules/FieldValidation
   * @param {Event} e - event from the onChange tag of the text field
   */
    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        validateForm(e, errorsObject, setErrorsObject, formData);
    };

    /**
   * This function handles changes in the security question option
   * @function
   * @param {String} option - The string of the question option selected
   * @param {number} index - The index of the option selected
   */
    const handleQuestionChange = (option, index) => {
        const newQuestionVals = questionVals;
        newQuestionVals[index] = option;
        setQuestionVals(newQuestionVals);
        setFormData({
            ...formData,
            [`securityQuestion${index + 1}`]: option.value,
        });
    };

    /**
   * This function gets available security question indices
   * @function
   * @returns {number} - Index of questions option available
   */
    const getOptions = () => {
        return FILTER_SECURITY_OPTIONS.filter((questionOption) => {
        return questionVals.indexOf(questionOption) === -1;
        });
    };

    /**
     * This function delay the next function.
     * @function
     */
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    
    /**
   * This function handles the onSubmit event. When submit, user status change to "Active" and link go to Login page
   * @function
   * @param {Event} event - The event from the onSubmit event
   */
    const handleSubmit = async (e) => {
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
        let body = {
            firstName: formData.firstName,
            lastname: formData.lastName,
            password: encrypt(formData.password, username),
            username: username,
            confirmationCode: code,
            securityQuestion1: formData.securityQuestion1,
            securityQuestion2: formData.securityQuestion2,
            securityQuestion3: formData.securityQuestion3,
            securityAnswer1: formData.securityAnswer1,
            securityAnswer2: formData.securityAnswer2,
            securityAnswer3: formData.securityAnswer3,
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/admins/saveadmin`, body);
            if (res.data.error){
                toastInfo(res.data.error);
            } else {
                toastInfo("Admin account succesfully created.")
                toastInfo("Now redirecting to login page.")
                await delay(2000);
                setIsRedirect(true);
            }

        } catch (e) {
            const err = e.response.data.errors;
            if (err) {
                err.forEach((error) => {
                    console.error(error.msg);
                    setErrors(`${error.msg}`);
                });
            }
        }
    };

    /**
   * This function check if errorsObject is clear or not.
   * Used to turn decide to disable the next and submit buttons
   * @returns boolean
   */
    const isError = () => {
        for (const key in errorsObject) {
        if (errorsObject[key] != '') return true;
        }
        return false;
    };

    /**
   * This function provides the HTML formatting of the confirmationCode component
   * @function
   * @returns {HTMLCollection}
   */
    return (
    <div className='page-container'>
        {isRedirect ? <Navigate to='/login' /> : null}
        <div className='form-container'>
            <h1 className='title'>Register as an Admin </h1>
            <form className='fields' onSubmit={(e) => handleSubmit(e)}>
            <div className='flex-horizontal'>
                <label>
                    First Name:
                    <input
                    value={formData.firstName}
                    id='firstName'
                    type='text'
                    maxLength='30'
                    required
                    onChange={(e) => handleChange(e)}
                    />
                </label>

                <label>
                    Last Name:
                    <input
                    value={formData.lastName}
                    id='lastName'
                    type='text'
                    maxLength='30'
                    required
                    onChange={(e) => handleChange(e)}
                    />
                </label>
            </div>
            
            <div className='flex-horizontal'>
                <label>
                Set Password:
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    id='password'
                    required
                />
                </label>

                <label>
                Confirm Password:
                <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id='confirmPassword'
                    required
                />
                </label>
            </div>

            <label> Security Question #1:</label>
            <Select
                isSearchable={false}
                placeholder='Question #1'
                value={questionVals[0]}
                options={getOptions()}
                onChange={(e) => {
                handleQuestionChange(e, 0);
                }}
            />
            <input
                value={formData.securityAnswer1}
                name='securityAnswer1'
                type='text'
                id='securityAnswer1'
                required
                onChange={handleChange}
            />

            <label> Security Question #2:</label>
            <Select
                isSearchable={false}
                placeholder='Question #2'
                value={questionVals[1]}
                options={getOptions()}
                onChange={(e) => {
                handleQuestionChange(e, 1);
                }}
            />
            <input
                value={formData.securityAnswer2}
                name='securityAnswer2'
                type='text'
                id='securityAnswer2'
                required
                onChange={handleChange}
            />

            <label> Security Question #3:</label>
            <Select
                isSearchable={false}
                placeholder='Question #3'
                value={questionVals[2]}
                options={getOptions()}
                onChange={(e) => {
                handleQuestionChange(e, 2);
                }}
            />
            <input
                value={formData.securityAnswer3}
                name='securityAnswer3'
                type='text'
                id='securityAnswer3'
                required
                onChange={handleChange}
            />

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
                })}
            </ul>
            {errors !== '' ? <div className='error'>{errors}</div> : <div></div>}
            <div className='button-container-bottom'>
                <button
                className='button-back'
                type='submit'
                sx={{ width: '80px', height: '40px' }}
                disabled={isError()}
                >
                Submit
                </button>
            </div>
        </form>
        <ToastContainer position='bottom-right' hideProgressBar={false} />
        </div>
    </div>
    );
};

export default RegisterAdmin;
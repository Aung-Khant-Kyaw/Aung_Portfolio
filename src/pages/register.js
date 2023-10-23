import { Component, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import BusinessInfo from '../components/business/businessInfo';
import SetPassword from '../components/setPassword';
import BusinessRegStart from '../components/business/businessRegStart';
import SecurityQuestions from '../components/securityQuestions';
import StudentRegStart from '../components/student/studentRegStart';
import StudentInfo from '../components/student/studentInfo';
import AdminRegStart from '../components/admin/adminRegStart';
import axios from 'axios';
import school from '../utils/us_institutions.json';
import { useState } from 'react';
import { FILTER_SECURITY_OPTIONS } from '../utils/constants';
import { encrypt } from '../utils/encryption';
import {
  BUSINESS_ORDER,
  STUDENT_ORDER,
  ADMIN_ORDER,
  BUSINESS_FORM_DATA,
  STUDENT_FORM_DATA,
  ADMIN_FORM_DATA,
} from '../utils/constants';
import { validateForm } from '../utils/fieldValidation';
import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@mui/material';

/**
 * Handles processing and displaying of the registration procedure.
 * Provides component rendering information to App.js.
 * @version 0.1
 * @class
 * @see react-router-dom
 * @see axios
 * @see utils/us_institutions.json
 * @see Modules/BusinessRegStart
 * @see Modules/BusinessInfo
 * @see Modules/SetPassword
 * @see Modules/SecurityQuestions
 * @see Modules/StudentRegStart
 * @see Modules/StudentInfo
 * @see Modules/AdminRegStart
 * @see Modules/FieldValidation
 * @see Modules/Encryption
 * @see Modules/Users[api]
 * @see Classes/App
 * return JSX component
 */
const Register = () => {
  const mongoose = require('mongoose');
  const [formDataStudent, setFormDataStudent] = useState(STUDENT_FORM_DATA);
  const [formDataBusiness, setFormDataBusiness] = useState(BUSINESS_FORM_DATA);
  const [formDataAdmin, setFormDataAdmin] = useState(ADMIN_FORM_DATA);
  const [statePassword, setStatePassword] = useState();
  const [stateConPassword, setStateConPassword] = useState();
  const [currentComponent, setCurrentComponent] = useState(0);
  const [isRedirect, setIsRedirect] = useState(false);
  const [redirBackToUserType, setRedirBackToUserType] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const [errors, setErrors] = useState([]);
  const [errorsObject, setErrorsObject] = useState({});
  const [questionVals, setQuestionVals] = useState([null, null, null]);
  const location = useLocation();
  const userType = location.state?.userType;
  const hintData = school.map((item) => {
    return item.institution;
  });
  const formData = new FormData();
  const pdfFormData = new FormData();
  const [isAvatar, setIsAvatar] = useState(false);
  const [avatarFile, setAvatarFile] = useState();
  const [pdfFile, setPdfFile] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const [pdfObj, setPdfObj] = useState([]);

  /**
   * This function is called everytime one of the text fields is edited. Calls the field validation utility module
   * @function
   * @see Modules/FieldValidation
   * @param {Event} e - event from the onChange tag of the text field
   */
  const handleChangeStudent = async (e) => {
    setFormDataStudent({ ...formDataStudent, [e.target.id]: e.target.value });
    validateForm(e, errorsObject, setErrorsObject, formDataStudent);
  };
  const handleChangeBusiness = (e) => {
    setFormDataBusiness({ ...formDataBusiness, [e.target.id]: e.target.value });
    validateForm(e, errorsObject, setErrorsObject, formDataBusiness);
  };
  const handleProfileImageChange = (e) => {
    setIsAvatar(true);
    setAvatarFile(e.target.files[0]);
  };

  const handleChangeAdmin = (e) => {
    setFormDataAdmin({ ...formDataAdmin, [e.target.id]: e.target.value });
  };

  /**
   * This function help user navigate back to choose user type
   * @function
   */
  const backToUserType = () => {
    setRedirBackToUserType(true);
  };

  /**
   * This function is called every time the user clicks out of one of the text fields. Currently does nothing, but if code is uncommented will
   * activate functionality to prevent selection outside of the current text field until it has valid input
   * @function
   * @param {Event} e - Event from the onBlur tag of a text field
   */
  const handleFocusChange = (e) => {
    //this method is called when the user clicks or tabs out of a text field with the related onBlur attribute (used to return user to the field if they entered input incorrectly)
    /*
          let input = e.currentTarget.value//the text currently in the field
          let id = e.currentTarget.id || e.id //the id of the field i.e. username, etc.
          let formErrors = this.state.formErrors //array of errors to keep track of what issues are found

          //the following code checks if the field that was just left has an error in it and if so, returns the user to that field

          let matchingErrorFound = false

          let errorArray = Object.entries(formErrors)//convert the formErrors key value pairs into an array to iterate through

          for(let i = 0; i < errorArray.length; i++){//for every error currently in the array

              let error = errorArray[i]

              error = error[0]
              if(error === id || error === ''+id+'txt' || error === ''+id+'len'){//if the error is related to the field that was just left
                  matchingErrorFound = true //a matching error has been found

              }
              if(matchingErrorFound){//if a matching error was found
                  e.currentTarget.focus()//return the user to the pervious field
              }
          } */
    /* let input = e.currentTarget.value//the text currently in the field
          let id = e.currentTarget.id || e.id //the id of the field i.e. username, etc.
          let formErrors = this.state.formErrors //array of errors to keep track of what issues are found
          switch(id){
              case 'username':
                  let uresult = checkIfUsernameInUse(input, this.state.userType)
                      if(uresult){
                          e.currentTarget.style.borderColor = 'red'
                          formErrors[''+id+'use'] = "This username is already in use"
                          //e.currentTarget.focus()
                      } else {
                          delete formErrors[''+id+'use']
                          if(formErrors[''+id+'txt'].length === 0 && formErrors[''+id+'len'].length === 0){
                              e.currentTarget.style.borderColor = 'green'
                          }
                      }
                  break;
              case 'email':
                  let eresult = checkIfEmailInUse(input, this.state.userType)
                  if(eresult){
                      e.currentTarget.style.borderColor = 'red'
                      formErrors[''+id+'use'] = "This email is already in use"
                      //e.currentTarget.focus()
                  } else {
                      delete formErrors[''+id+'use']
                      if(formErrors[id].length === 0){
                          e.currentTarget.style.borderColor = 'green'
                      }
                  }
                  break;
              default:
                  break;
          } */
    //console.log(formErrors)
    //this.setState({[formErrors]: formErrors})
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
    if (userType === 'business') {
      setFormDataBusiness({
        ...formDataBusiness,
        [`securityQuestion${index + 1}`]: option.value,
      });
    } else if (userType === 'student') {
      setFormDataStudent({
        ...formDataStudent,
        [`securityQuestion${index + 1}`]: option.value,
      });
    } else {
      setFormDataAdmin({
        ...formDataAdmin,
        [`securityQuestion${index + 1}`]: option.value,
      });
    }
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
   * Gets the correct component to display for the current state. Available components include businessRegStart, businessInfo, setPassword, securityQuestions,
   * studentRegStart, studentInfo, and adminRegStart. The component to display is selected based on the user selected userType and the current step of the
   * registration process.The correct process orders are as follows. For business users, businessRegStart->businessInfo->setPassword->securityQuestions.
   * For student users, studentRegStart->studentInfo->setPassword->securityQuestions. For admin users, adminRegStart->setPassword->securityQuestions.
   * @function
   * @see Modules/BusinessRegStart
   * @see Modules/BusinessInfo
   * @see Modules/SetPassword
   * @see Modules/SecurityQuestions
   * @see Modules/StudentRegStart
   * @see Modules/StudentInfo
   * @see Modules/AdminRegStart
   * @returns {Component} - The component of the current page to display.
   */
  const getComponent = () => {
    if (userType === 'business') {
      switch (BUSINESS_ORDER[currentComponent]) {
        case 'businessRegStart':
          return (
            <BusinessRegStart
              state={formDataBusiness}
              handleChange={handleChangeBusiness}
              handleFocusChange={handleFocusChange}
            />
          );
        case 'businessInfo':
          return (
            <BusinessInfo
              state={formDataBusiness}
              setFormDataBusiness={setFormDataBusiness}
              handleChange={handleChangeBusiness}
              handleFocusChange={handleFocusChange}
              handleProfileImageChange={handleProfileImageChange}
              setPdfFile={setPdfFile}
              pdfFile={pdfFile}
              setPdfObj={setPdfObj}
              pdfObj={pdfObj}
              setIsNewPdf={setIsNewPdf}
            />
          );
        case 'setPassword':
          return (
            <SetPassword
              state={formDataBusiness}
              statePassword={statePassword}
              stateConPassword={stateConPassword}
              userType={userType}
              handleChange={handleChangeBusiness}
              handleFocusChange={handleFocusChange}
            />
          );
        case 'securityQuestions':
          return (
            <SecurityQuestions
              state={formDataBusiness}
              handleChange={handleChangeBusiness}
              questionVals={() => questionVals()}
              getAvailableOptions={getOptions}
              handleQuestionValChange={handleQuestionChange}
              handleFocusChange={handleFocusChange}
              handleSubmit={handleSubmit}
            />
          );
      }
    } else if (userType === 'student') {
      switch (STUDENT_ORDER[currentComponent]) {
        case 'studentRegStart':
          return (
            <StudentRegStart
              state={formDataStudent}
              setFormDataStudent={setFormDataStudent}
              handleChange={handleChangeStudent}
              handleFocusChange={handleFocusChange}
              handleProfileImageChange={handleProfileImageChange}
            />
          );
        case 'studentInfo':
          return (
            <StudentInfo
              state={formDataStudent}
              hintData={hintData}
              handleChange={handleChangeStudent}
              handleFocusChange={handleFocusChange}
              setPdfFile={setPdfFile}
              pdfFile={pdfFile}
              setPdfObj={setPdfObj}
              pdfObj={pdfObj}
              setIsNewPdf={setIsNewPdf}
            />
          );
        case 'setPassword':
          return (
            <SetPassword
              state={formDataStudent}
              statePassword={statePassword}
              stateConPassword={stateConPassword}
              userType={userType}
              handleChange={handleChangeStudent}
              handleFocusChange={handleFocusChange}
            />
          );
        case 'securityQuestions':
          return (
            <SecurityQuestions
              state={formDataStudent}
              handleChange={handleChangeStudent}
              questionVals={() => questionVals()}
              handleFocusChange={handleFocusChange}
              getAvailableOptions={getOptions}
              handleQuestionValChange={handleQuestionChange}
              handleSubmit={handleSubmit}
            />
          );
      }
    } else if (userType === 'admin') {
      switch (ADMIN_ORDER[2]) {
        case 'adminRegStart':
          return (
            <AdminRegStart
              state={formDataAdmin}
              setFormDataAdmin={setFormDataAdmin}
              handleChange={handleChangeAdmin}
              handleFocusChange={handleFocusChange}
            />
          );
        case 'setPassword':
          return (
            <SetPassword
              state={formDataAdmin}
              statePassword={statePassword}
              stateConPassword={stateConPassword}
              userType={userType}
              handleChange={handleChangeAdmin}
              handleFocusChange={handleFocusChange}
            />
          );
        case 'securityQuestions':
          return (
            <SecurityQuestions
              state={formDataAdmin}
              userType={userType}
              handleChange={handleChangeAdmin}
              questionVals={() => questionVals()}
              handleFocusChange={handleFocusChange}
              getAvailableOptions={getOptions}
              handleQuestionValChange={handleQuestionChange}
              handleSubmit={handleSubmit}
            />
          );
      }
    }
  };

  /**
   * This function is used for password validation. It is called during the changePage function as a secondary check that valid values are present in the
   * password fields after the 'Next' button was selected before allowing the user to view the next page. A valid password has two upper case letters, two
   * lower case letters, two numbers, and two symbols. The confirm password field must match the password field to be valid.
   * @function
   * @returns {Boolean} - True if the password entrues are valid, false if not.
   */
  const validate = (password, confirmPassword) => {
    let isValid = true;

    if (password) {
      var pattern = new RegExp(
        '^(?=.{8,20}$)(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[-$&@#%!?]){2,}).*'
      );
      if (!pattern.test(password)) {
        isValid = false;
        setErrors((errors) => [
          ...errors,
          'Please enter a valid password. Passwords must 8-20 characters long, uses the following symbols -$&@#%!], and at least two Upper case letters, Lower case letters, numbers, and symbols.',
        ]);
      }
    }

    if (password && confirmPassword) {
      if (password != confirmPassword) {
        isValid = false;
        setErrors((errors) => [...errors, "The passwords don't match."]);
      }
    }
    setStatePassword(password);
    setStateConPassword(confirmPassword);
    setFormDataStudent({
      ...formDataStudent,
      password: formDataStudent.password,
    });
    setFormDataBusiness({
      ...formDataBusiness,
      password: formDataBusiness.password,
    });
    return isValid;
  };

  /**
   * This function makes sure that requested page changes are acceptable based on the current state. This function is called by the
   * onSubmit event as part of the callback event for the user selecting the 'Next' button.
   * @function
   * @async
   * @param {number} val - 1 for page forward or -1 for page back
   * @returns {null}
   */
  const changePage = async (val) => {
    setErrors('');
    let password,
      confirmPassword = '';
    let body = {
      username: '',
      email: '',
      userType: '',
    };
    if (userType === 'business') {
      password = formDataBusiness.password;
      confirmPassword = formDataBusiness.confirmPassword;
      body.username = formDataBusiness.username;
      body.email = formDataBusiness.username;
      body.userType = userType;
    } else if (userType === 'student') {
      password = formDataStudent.password;
      confirmPassword = formDataStudent.confirmPassword;
      body.username = formDataStudent.username;
      body.email = formDataStudent.email;
      body.userType = userType;
    } else {
      password = formDataAdmin.password;
      confirmPassword = formDataAdmin.confirmPassword;
      body.username = formDataAdmin.username;
      body.email = formDataAdmin.email;
      body.userType = userType;
    }

    let newIndex = currentComponent + val;

    if (userOrder[currentComponent] === 'setPassword') {
      if (val > 0) {
        if (validate(password, confirmPassword)) {
          setCurrentComponent(newIndex);
          setErrors('');
        }
      } else {
        setCurrentComponent(newIndex);
      }
    } else if (userOrder[currentComponent] === `${userType}RegStart`) {
      try {
        const userNameRes = await axios.post(
          `${process.env.REACT_APP_API}/api/users/check-username`,
          body
        );

        const emailRes = await axios.post(
          `${process.env.REACT_APP_API}/api/users/check-email`,
          body
        );

        if (userNameRes.data.errors) {
          setErrors(userNameRes.data.errors);
          return;
        }
        if (emailRes.data.errors) {
          setErrors(emailRes.data.errors);
          return;
        }
        setErrors('');
        setCurrentComponent(newIndex);
      } catch (e) {
        // setErrors(e);
        console.log(e);
      }
    } else {
      setCurrentComponent(newIndex);
    }
  };

  /**
   * This function is called when the 'Next' button is pressed and calls the appropriate function based on the pages' current location.
   * @function
   * @param {Event} e - Event from the button press
   */
  const onSubmit = (e) => {
    e.preventDefault();
    if (currentComponent === userOrder.length - 1) {
      handleSubmit();
    } else {
      changePage(1);
    }
  };

  //  This function changes the stepper information based on which user is chosen: Student or Business
  const getStepNames = () => {
    if (userType === 'business') {
      return [
        'Point of Contact',
        'Business Information',
        'Set Password',
        'Security Questions',
      ];
    } else if (userType === 'student') {
      return [
        'Personal information',
        'School Information',
        'Set Password',
        'Security Questions',
      ];
    }
  };

  /**
   * This function called by the onSubmit callback function to check for missing required fields and
   * input issues and then handles page changes if necessary. Additionally, it posts new users to the
   * API when they are fully added. Makes use of the encryption module to encrypt passwords.
   * @function
   * @async
   * @see Modules/Encryption
   * @see Modules/Users[api]/Post/
   * @returns {null}
   */
  const handleSubmit = async () => {
    for (let val of questionVals) {
      if (val === null) {
        const error = `Please select a question for ALL fields`;
        setErrors(error);
        return;
      } else {
        setErrors('');
      }
    }

    const userId = new mongoose.Types.ObjectId();
    formData.append('_id', userId);

    if (userType === 'student') {
      for (let key in formDataStudent) {
        if (key === 'password'){
          formData.append(key, encrypt(formDataStudent.password, formDataStudent.username))
        } else {
          formData.append(key, formDataStudent[key]);
        }
      }
    } else if (userType === 'business') {
      for (let key in formDataBusiness) {
        if (key === 'password'){
          formData.append(key, encrypt(formDataBusiness.password, formDataBusiness.username))
        } else {
          formData.append(key, formDataBusiness[key]);
        }
      }
    }

    if (isAvatar) {
      formData.append('photo', avatarFile);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API}/api/users`, formData);
      setIsRedirect(true);
      if (isNewPdf) {
        uploadPDF(userId);
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

  const uploadPDF = async (id) => {
    let res;
    const userId = id;
    pdfFormData.append('userId', userId);
    pdfFormData.append('userType', userType);

    for (let i = 0; i < pdfFile.length; i++) {
      pdfFormData.append('pdfObject', JSON.stringify(pdfObj[i]));
      pdfFormData.append('pdf', pdfFile[i]);
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API}/api/users/upload-pdf`,
        data: pdfFormData,
      };
      try {
        const response = await axios(config);
        res = response.data;
        pdfFormData.delete('pdfObject');
        pdfFormData.delete('pdf');
      } catch (error) {
        return error;
      }
    }
    return res;
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

  useEffect(() => {
    if (userType === 'business') {
      setUserOrder(BUSINESS_ORDER);
      setFormDataStudent({ ...formDataStudent, userType: 'student' });
    }
    if (userType === 'student') {
      setUserOrder(STUDENT_ORDER);
      setFormDataBusiness({ ...formDataBusiness, userType: 'business' });
    }
  }, [userType]);

  /**
   * Displays the page with the correct componenets based on the getComponent() function to App.js. Form based pages
   * display error messages and text field coloring based on the field validation scripts called in the onChange
   * callback events.
   * @function
   * @see getComponent()
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      {isRedirect ? <Navigate to='/confirmation-page' /> : null}
      {redirBackToUserType ? <Navigate to='/registration' /> : null}
      <div className='stepper'>
        <Stepper activeStep={currentComponent} alternativeLabel>
          {getStepNames().map((stepName, index) => (
            <Step key={index}>
              <StepLabel>{stepName}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className='form-container'>
        <h1 className='title'>Register as a {userType}</h1>
        <hr />
        {/* Field data forms */}
        <form className='fields' onSubmit={(e) => onSubmit(e)}>
          {getComponent()}
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
            {currentComponent === 0 ? (
              <a onClick={() => backToUserType()}>
                <button
                  type='button'
                  className='button-back'
                  sx={{ width: '80px', height: '40px' }}
                >
                  Back
                </button>
              </a>
            ) : (
              <a onClick={() => changePage(-1)}>
                <button
                  type='button'
                  className='button-back'
                  sx={{ width: '80px', height: '40px' }}
                  disabled={isError()}
                >
                  Back
                </button>
              </a>
            )}

            {currentComponent === 3 ? (
              <button
                className='button-back'
                type='submit'
                sx={{ width: '80px', height: '40px' }}
                disabled={isError()}
              >
                Submit
              </button>
            ) : (
              <button
                className='button-back'
                type='submit'
                sx={{ width: '80px', height: '40px' }}
                disabled={isError()}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

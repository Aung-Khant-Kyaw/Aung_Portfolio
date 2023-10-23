/**
 * fieldValidation.js
 * @namespace Reusable
 * @see Modules/fieldValidation
 */

/**
 * Module to provide text field validation to registration pages. Includes methods to directly check text fields
 * as well as helper functions to check compliance with regex formats. Used by register.js.
 * @module fieldValidation
 * @version 0.1
 * @see Modules/UsernameEmailInCheck
 * @see Modules/checkIfEmailInUse
 * @see Function/Register
 */
import {
  checkIfEmailInUse,
  checkIfUsernameInUse,
} from '../utils/usernameEmailInUseCheck';
import { toast } from 'react-toastify';

//utility file to handle field error checking everytime a key is pressed should be called in an onChange() event
/**
 * This function provides input validation for textfields in a registration page.
 * Supported textfields include username, furstName, lastName, email, addressStreet,
 * addressStreet2, addressCity, addressState, addressZip, phoneNumber, poc, school,
 * graduationYear, gpa, businessDivision, businessName, password, confirmPassword,
 * and securityAnswer 1-5. Should be called in the handleChange event handler of
 * the registration page. Errors checked for include length, contents, validity of
 * email, password security, and uniqueness of username/email. Used by register.js
 * @function
 * @param {event} e - The event handle passed from the handleChange event
 * @param {Object} errorsObject - The key value pair object errorsObject from useState hook
 * @param {Function} setErrorsObject - function updates errorsObject state from useState hook
 * @param {Object} formData - either formDataStudent or formDataBusiness
 * @see Function/Register
 */
export const validateForm = async (
  e,
  errorsObject,
  setErrorsObject,
  formData,
  isRemote
) => {
  let input = e.target.value; //text in the textfield
  let id = e.target.id || e.id; //name of the textfield, i.e. username

  let errObject = {}; // errObject saved in memory

  let isUserInUse = false;
  await checkIfUsernameInUse(input).then((res) => {
    isUserInUse = res;
  });

  let isEmailInUse = false;
  await checkIfEmailInUse(input, formData._id).then((res) => {
    isEmailInUse = res;
  });

  /* the following switch statement checks the validity of each field as it is filled in. */
  switch (
    id //handle what to do based on the id of the field
  ) {
    case 'username':
      if (
        !minLength(input, 5) ||
        !alphaNumericPlusUnderscoreDash(input) ||
        isUserInUse
      ) {
        /* Username should have at least 5 characters */
        if (!minLength(input, 5)) {
          //too short
          errObject.userNameLen = 'Username should have at least 5 characters';
          e.target.style.borderColor = 'red';
        } else {
          errObject.userNameLen = '';
        }

        /* Username should only contain letters, numbers, underscores, or dashes */
        if (!alphaNumericPlusUnderscoreDash(input)) {
          errObject.userNameTxt =
            'Username should only contain letters, numbers, underscores, or dashes';
          e.target.style.borderColor = 'red';
        } else {
          errObject.userNameTxt = '';
        }

        /* User already exists */
        if (isUserInUse) {
          e.target.style.borderColor = 'red';
          errObject.userNameUse = 'User already exists with this username';
        } else {
          errObject.userNameUse = '';
        }
      } else {
        /* meets all requirements */
        e.target.style.borderColor = 'green';
        errObject.userNameLen = '';
        errObject.userNameTxt = '';
        errObject.userNameUse = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'firstName':
      if (!maxLength(input, 30) || !validName(input)) {
        /* first name should be no greater than 30 chars */
        if (!maxLength(input, 30)) {
          /* length is greater than 30 */
          errObject.firstNameLen =
            'First name should have at most 30 characters';
          e.target.style.borderColor = 'red';
        } else {
          /* length shorter than 30 chars */
          errObject.firstNameLen = '';
        }

        /* First name should be valid */
        if (!validName(input)) {
          /* Not Solid */
          errObject.firstNameTxt = 'First name is not valid';
          e.target.style.borderColor = 'red';
        } else {
          /* Solid */
          errObject.firstNameTxt = '';
        }
      } else {
        /* meets all requirements */
        e.target.style.borderColor = 'green';
        errObject.firstNameLen = '';
        errObject.firstNameTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'Name': //for student job application
      if (!maxLength(input, 60) || !validName(input)) {
        /* Name should be no greater than 60 chars */
        if (!maxLength(input, 60)) {
          /* length is greater than 60 */
          errObject.firstNameLen = 'Name should have at most 60 characters';
          e.target.style.borderColor = 'red';
        } else {
          /* length shorter than 30 chars */
          errObject.firstNameLen = '';
        }

        /* Name should be valid */
        if (!validName(input)) {
          /* Not Solid */
          errObject.nameTxt = 'Name is not valid';
          e.target.style.borderColor = 'red';
        } else {
          /* Solid */
          errObject.nameTxt = '';
        }
      } else {
        /* meets all requirements */
        e.target.style.borderColor = 'green';
        errObject.nameLen = '';
        errObject.nameTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'lastName':
      if (!maxLength(input, 30) || !validName(input)) {
        /* last name should no greater than 30 chars and alphabetic */
        if (!maxLength(input, 30)) {
          /* length is greater than 30 */
          errObject.lastNameLen = 'Last name should have at most 30 characters';
          e.target.style.borderColor = 'red';
        } else {
          /* length shorter than 30 chars */
          errObject.lastNameLen = '';
        }
        if (!validName(input)) {
          /* not alphabetic */
          errObject.lastNameTxt = 'Last name is not valid';
          e.target.style.borderColor = 'red';
        } else {
          /* alphabetic */
          errObject.lastNameTxt = '';
        }
      } else {
        //meets all requirements
        e.target.style.borderColor = 'green';
        errObject.lastNameLen = '';
        errObject.lastNameTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'email':
      if (!validEmail(input)) {
        //email should follow correct formatting
        errObject.email = 'Must use a valid email address';
        e.target.style.borderColor = 'red';
      } else {
        errObject.email = '';
        e.target.style.borderColor = 'green';
      }

      if (isEmailInUse) {
        e.target.style.borderColor = 'red';
        errObject.emailUse = 'A user already exists with this email';
      } else {
        e.target.style.borderColor = 'green';
        errObject.emailUse = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;

    case 'Email': // email for student job application
      if (!validEmail(input)) {
        //email should follow correct formatting
        errObject.email = 'Must use a valid email address';
        e.target.style.borderColor = 'red';
      } else {
        errObject.email = '';
        e.target.style.borderColor = 'green';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'addressStreet':
      if (!minLength(input, 2) || !alphaNumericPlusUnderscoreDashSpace(input)) {
        if (!minLength(input, 2)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetLen =
            'Address street should have at least two characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.addressStreetLen = '';
        }
        if (!alphaNumericPlusUnderscoreDashSpace(input)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetTxt =
            'Address street should not have special characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.addressStreetTxt = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject.addressStreetLen = '';
        errObject.addressStreetTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'addressStreet2':
      if (!alphaNumericPlusUnderscoreDashSpace(input)) {
        e.target.style.borderColor = 'red';
        errObject.addressStreet2Txt =
          'Address street line 2 should not have special characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject.addressStreet2Txt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'addressCity':
    case 'City': //for student job application
      if (!alphabeticPlusSpace(input)) {
        //city name should be alphabetic
        e.target.style.borderColor = 'red';
        errObject.addressCity = 'City should have an alphabetic name';
      } else {
        errObject.addressCity = '';
        e.target.style.borderColor = 'green';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'addressState':
    case 'State': //for student job application
      if (!minLength(input, 2)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Address state should have at least two characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'addressZip':
      if (!validZip(input)) {
        //phone number should be numeric
        e.target.style.borderColor = 'red';
        errObject[id] =
          'Please enter a valid zip code (either in 5 digit or 5-4 digit format)';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'userPhoneNumber':
    case 'Phone Number': //for student job application
      if (!numeric(input) || !minMaxLength(input, 10, 10)) {
        //phone number should be numeric
        if (!numeric(input)) {
          e.target.style.borderColor = 'red';
          errObject['' + id + 'txt'] = 'Phone number should be numeric';
        } else {
          errObject['' + id + 'txt'] = '';
        }
        if (!minMaxLength(input, 10, 10)) {
          e.target.style.borderColor = 'red';
          errObject['' + id + 'len'] = 'Phone number should have 10 characters';
        } else {
          errObject['' + id + 'len'] = '';
        }

        // Disable the update profile & back buttons when the input is invalid (if it exists on the current page)
        const studUpdateBtn = document.querySelector('.stud-update-btn');
        const studBackBtn = document.querySelector('.stud-back-btn');

        if (studUpdateBtn && studBackBtn) {
          studUpdateBtn.classList.add('disabled');
          studBackBtn.classList.add('disabled');
        }

        const busUpdateBtn = document.querySelector('.bus-update-btn');
        const busBackBtn = document.querySelector('.bus-back-btn');
        if (busUpdateBtn && busBackBtn) {
          busUpdateBtn.classList.add('disabled');
          busBackBtn.classList.add('disabled');
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject['' + id + 'txt'] = '';
        errObject['' + id + 'len'] = '';

        // Enable the update profile & back buttons when the input is valid (if it exists on the current page)
        const studUpdateBtn = document.querySelector('.stud-update-btn');
        const studBackBtn = document.querySelector('.stud-back-btn');
        if (studUpdateBtn && studBackBtn) {
          studUpdateBtn.classList.remove('disabled');
          studBackBtn.classList.remove('disabled');
        }

        const busUpdateBtn = document.querySelector('.bus-update-btn');
        const busBackBtn = document.querySelector('.bus-back-btn');
        if (busUpdateBtn && busBackBtn) {
          busUpdateBtn.classList.remove('disabled');
          busBackBtn.classList.remove('disabled');
        }
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'companySize':
      if (!validateCompanySize(input)) {
        e.target.style.borderColor = 'red';
        errObject['' + id + 'txt'] = 'Company size should be numeric';
      } else {
        e.target.style.borderColor = 'green';
        errObject['' + id + 'txt'] = '';
        errObject['' + id + 'len'] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'institution':
      if (!minLength(input, 3)) {
        //School name should no less than 3 chars
        e.target.style.borderColor = 'red';
        errObject['' + id + 'len'] =
          'School name should have at least 3 characters';
      } else {
        //meets all requirements
        e.target.style.borderColor = 'green';
        errObject['' + id + 'len'] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'gradYear':
      let diff = 3000; //will be used to store the time difference from current date to entered year, given a default value of 3000 so that time is not accepted by default
      if (numeric(input)) {
        diff = checkTimeDifference(input);
      }
      if (
        !minMaxLength(input, 4, 4) ||
        !numeric(input) ||
        diff > 50 ||
        diff < -5
      ) {
        if (!minMaxLength(input, 4, 4)) {
          e.target.style.borderColor = 'red';
          errObject['' + id + 'len'] =
            'Graduation year should have 4 characters';
        } else {
          errObject['' + id + 'len'] = '';
        }
        if (!numeric(input)) {
          e.target.style.borderColor = 'red';
          errObject['' + id + 'txt'] = 'Graduation year should be numeric';
        } else {
          errObject['' + id + 'txt'] = '';
        }
        if (diff > 50 || diff < -5) {
          e.target.style.borderColor = 'red';
          errObject['' + id + 'val'] =
            'Graduation year should be within the last 50 years or within 5 years from now';
        } else {
          errObject['' + id + 'val'] = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject['' + id + 'txt'] = '';
        errObject['' + id + 'len'] = '';
        errObject['' + id + 'val'] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'gpa':
      if (
        !minMaxLength(input, 1, 4) ||
        !decimal(input) ||
        Number(input) > 4 ||
        Number(input) <= 0
      ) {
        if (!minMaxLength(input, 1, 4)) {
          errObject['' + id + 'len'] =
            'GPA should have at least 1 number and at most two decimal places';
          e.target.style.borderColor = 'red';
        } else {
          errObject['' + id + 'len'] = '';
        }
        if (!decimal(input)) {
          errObject['' + id + 'txt'] = 'GPA should be a number';
          e.target.style.borderColor = 'red';
        } else {
          errObject['' + id + 'txt'] = '';
        }
        if (Number(input) > 4 || Number(input) <= 0) {
          errObject['' + id + 'val'] =
            'GPA should be be less than or equal to 4.0 and greater than 0';
          e.target.style.borderColor = 'red';
        } else {
          errObject['' + id + 'val'] = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject['' + id + 'txt'] = '';
        errObject['' + id + 'len'] = '';
        errObject['' + id + 'val'] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'password':
      if (!validPassword(input)) {
        errObject[id] =
          'Password Requirements: (8-20) characters (2) Uppercase letters, (2) Lowercase letters, (2) Numbers, (2) Symbols';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'confirmPassword':
      if (formData.password !== input) {
        errObject[id] = 'Confirm password entry does not match password';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'securityAnswer1':
      if (!minLength(input, 2)) {
        errObject[id] = 'Security answer 1 should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'securityAnswer2':
      if (!minLength(input, 2)) {
        errObject[id] = 'Security answer 2 should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'securityAnswer3':
      if (!minLength(input, 2)) {
        errObject[id] = 'Security answer 3 should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'securityAnswer4':
      if (!minLength(input, 2)) {
        errObject[id] = 'Security answer should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'securityAnswer5':
      if (!minLength(input, 2)) {
        errObject[id] = 'Security answer should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'poc':
      if (!minLength(input, 3)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Point of contact should have at least 3 characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessDivision':
      if (!minLength(input, 2)) {
        errObject[id] = 'Business Division should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessName':
      if (!minLength(input, 2)) {
        errObject[id] = 'Business Name should have at least two characters';
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessStreet':
      if (!minLength(input, 2) || !alphaNumericPlusUnderscoreDashSpace(input)) {
        if (!minLength(input, 2)) {
          e.target.style.borderColor = 'red';
          errObject.businessStreetLen =
            'Address street should have at least two characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.businessStreetLen = '';
        }
        if (!alphaNumericPlusUnderscoreDashSpace(input)) {
          e.target.style.borderColor = 'red';
          errObject.businessStreetTxt =
            'Address street should not have special characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.businessStreetTxt = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject.businessStreetLen = '';
        errObject.businessStreetTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessStreet2':
      if (!alphaNumericPlusUnderscoreDashSpace(input)) {
        e.target.style.borderColor = 'red';
        errObject.businessStreet2Txt =
          'Address street line 2 should not have special characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject.businessStreet2Txt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessCity':
      if (!alphabeticPlusSpace(input)) {
        //city name should be alphabetic
        e.target.style.borderColor = 'red';
        errObject.businessCity = 'City should have an alphabetic name';
      } else {
        errObject.businessCity = '';
        e.target.style.borderColor = 'green';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessState':
      if (!minLength(input, 2)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Address state should have at least two characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'businessZip':
      if (!validZip(input)) {
        //businessZip should be numeric
        e.target.style.borderColor = 'red';
        errObject[id] =
          'Please enter a valid zip code (either in 5 digit or 5-4 digit format)';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'jobTitle':
      if (!minLength(input, 3)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Job Title should have at least 3 characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }

      if (input.trim().length === 0) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Job Title cannot be empty';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;

    case 'Datepicker':
      if (!formData.start) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Start Date is required';
        toast.error('Please select a start date');
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'jobStreet':
      if (!minLength(input, 2) || !alphaNumericPlusUnderscoreDashSpace(input)) {
        if (!minLength(input, 2)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetLen =
            'Address street should have at least two characters';
        } else if (!alphaNumericPlusUnderscoreDashSpace(input)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetTxt =
            'Address street should not have special characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.addressStreetTxt = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject.addressStreetLen = '';
        errObject.addressStreetTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'jobStreet2':
      if (!minLength(input, 2) || !alphaNumericPlusUnderscoreDashSpace(input)) {
        if (!minLength(input, 2)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetLen =
            'Address street should have at least two characters';
        } else if (!alphaNumericPlusUnderscoreDashSpace(input)) {
          e.target.style.borderColor = 'red';
          errObject.addressStreetTxt =
            'Address street should not have special characters';
        } else {
          e.target.style.borderColor = 'green';
          errObject.addressStreetTxt = '';
        }
      } else {
        e.target.style.borderColor = 'green';
        errObject.addressStreetLen = '';
        errObject.addressStreetTxt = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'jobZip':
      if (!validZip(input)) {
        //phone number should be numeric
        e.target.style.borderColor = 'red';
        errObject[id] =
          'Please enter a valid zip code (either in 5 digit or 5-4 digit format)';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'description':
      if (!minLength(input, 3)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Description should have at least 3 characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }

      if (input.trim().length === 0) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Description/Requirements should not be empty';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'skills':
      if (!minLength(input, 3)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Skills should have at least 3 characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }

      if (input.trim().length === 0) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Skills should not be empty';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'title':
      if (!minLength(input, 2)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Title should have at least 2 characters';
      } else {
        e.target.style.borderColor = 'green';
        errObject[id] = '';
      }

      if (input.trim().length === 0) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Title should not be empty';
      }

      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;
    case 'jobCity':
      if (!alphabeticPlusSpace(input)) {
        //city name should be alphabetic
        e.target.style.borderColor = 'red';
        errObject.jobCity = 'City should have an alphabetic name';
      } else {
        errObject.jobCity = '';
        e.target.style.borderColor = 'green';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;

    case 'linkPortfolio':
    case 'linkLinkedIn':
    case 'linkTwitter':
    case 'linkGitHub':
    case 'linkOther':
    case 'linkCompany':
      if (input !== '' && !validateUrl(input)) {
        e.target.style.borderColor = 'red';
        errObject[id] = 'Url is not correctly formatted';
      } else {
        errObject[id] = '';
        e.target.style.borderColor = 'green';
      }
      handleUpdateErrorsObject(errorsObject, errObject, setErrorsObject);
      break;

    default:
      break;
  }
};

/**
 * This function returns the amount of time passed since an input year
 * @param {String} text - The input for time to check how long it has been since
 * @returns {Number} - The number of years passed since the input year
 */
function checkTimeDifference(text) {
  const current = new Date();
  const thisDate = current.getFullYear();
  let diff = thisDate - Number(text);
  return diff;
}

/**
 * Returns true if the string input is only made of alphabetic characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function alphabetic(text) {
  //use regex to check if the string is alphabetic (returns true if it is)
  const regex = RegExp(/^[a-zA-Z]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of alphabetic characters and spaces.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
export function alphabeticPlusSpace(text) {
  //use regex to check if the string is alphabetic (returns true if it is)
  const regex = RegExp(/^[a-zA-Z ]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of alphabetic or numeric characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function alphaNumeric(text) {
  //use regex to check if the string is alphanumeric (returns true if it is)
  const regex = RegExp(/^[a-zA-Z0-9]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of alphabetic, numeric, underscore, or dash characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
export function alphaNumericPlusUnderscoreDash(text) {
  //use regex to check if the string is alphanumeric (returns true if it is)
  const regex = RegExp(/^[a-zA-Z0-9-_]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of alphabetic, numeric, underscore, space, or dash characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
export function alphaNumericPlusUnderscoreDashSpace(text) {
  //use regex to check if the string is alphanumeric (returns true if it is)
  const regex = RegExp(/^[a-zA-Z0-9-_ ]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of numeric characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function numeric(text) {
  //use regex to check if the string is alphanumeric (returns true if it is)
  const regex = RegExp(/^[0-9]*$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is only made of decimal characters.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function decimal(text) {
  const regex = RegExp(/^[0-9]\d*(\.\d+)?$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is a valid email address.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
export function validEmail(text) {
  const regex = RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/);
  return regex.test(text);
}

/**
 * Returns true if the string input is a valid zip code with in 5 or 5-4 digit formats.
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
export function validZip(text) {
  const regex = RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
  return regex.test(text);
}

/**
 * Returns true if the given string is longer than (or equal in length to) the given minimum length
 * @param {String} text - The text to check
 * @param {number} min - The minimum length for the string
 * @returns {Boolean}
 */
export function minLength(text, min) {
  return text.length >= min;
}

/**
 * Returns true if the given string is shorter than (or equal in length to) the given maximum length
 * @param {String} text - The text to check
 * @param {number} min - The maximum length for the string
 * @returns {Boolean}
 */
function maxLength(text, max) {
  return text.length <= max;
}

/**
 * Returns true if the given text is a valid name, including international names
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function validName(text) {
  const regex = RegExp(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
  return regex.test(text);
}

/**
 * Returns true if the given string is longer than (or equal in length to) the given minimum length and shorter than (or equal in length to) the given maximum length
 * @param {String} text - The text to check
 * @param {number} min - The minimum length for the string
 * @param {number} max - The maximum length for the string
 * @returns {Boolean}
 */
function minMaxLength(text, min, max) {
  if (text.length === 0) {
    return true;
  }
  if (text.length >= min && text.length <= max) {
    return true;
  }
  return false;
}

/**
 * Returns true if the given string is a valid password with two lower case letters, two upper case letters, two symbols, and two numbers
 * @param {String} text - The text to check
 * @returns {Boolean}
 */
function validPassword(text) {
  const regex = RegExp(
    /^(?=.{8,20}$)(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[-$&@#%!?]){2,}).*/
  );
  return regex.test(text);
}

/**
 * This function check the validation against URLs
 * @param {url} url
 */
function validateUrl(url) {
  const urlRegEx = RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g
  );
  return urlRegEx.test(String(url).toLowerCase());
}

/**
 * This function check validation against company size field
 * @param {size} size
 */
function validateCompanySize(size) {
  const sizeRegEx = RegExp(/^[0-9]*$/g);
  return sizeRegEx.test(String(size).toLowerCase());
}

/**
 * This is a resuable function to combine errorsObject state and memory errObject into one single object then update errorsObject state using setErrorsObject from useState hook
 * @param {errosObject} errorsObject
 * @param {errObject} errObject
 * @param {setErrorsObject} setErrorsObject
 */
export function handleUpdateErrorsObject(
  errorsObject,
  errObject,
  setErrorsObject
) {
  let combinedErrorObject = { ...errorsObject, ...errObject };
  setErrorsObject({ ...combinedErrorObject });
}

/** This function is to validate inputs for UPDATING a Job in BusinJobModal */
export function validateJobTitle(input) {
  if (!minLength(input, 3)) {
    return 'Job Title should have at least 3 characters';
  }
  if (input.trim().length === 0) {
    return 'Job Title cannot be empty';
  }
  return ''; // Validation succeeded
}
// In fieldValidations.js

// Validation for Location
export function validateLocation(value) {
  if (value === "") {
    return "Please select a location.";
  }
  // Add any additional validation logic you may have here.
  // If additional validation passes, return an empty string.
  return "";
}

// Validation for Job Street
export function validateJobStreet(input) {
  if (!minLength(input, 2)) {
    return 'Address street should have at least two characters';
  }
  if (!alphaNumericPlusUnderscoreDashSpace(input)) {
    return 'Address street should not have special characters';
  }
  return ''; // Validation succeeded
}

// Validation for Job State
export const validateJobState = (value) => {
  if (value === "") {
    return "Please select a state.";
  }
  return '';
};

// Validation for Job City
export function validateJobCity(input) {
  if (!minLength(input, 2)) {
    return 'City should have at least two characters';
  }
  if (!alphaNumericPlusUnderscoreDashSpace(input)) {
    return 'City should not have special characters';
  }
  return ''; // Validation succeeded
}


// Validation for Job Zip
export function validateJobZip(input) {
  if (!validZip(input)) {
    return 'Please enter a valid zip code (either in 5 digit or 5-4 digit format)';
  }
  return ''; // Validation succeeded
}

// Validation for Job Type
export function validateJobType(value) {
  if (value === "") {
    return "Please select a job type.";
  }
  // Other validation logic
  return "";
}

// Validation for Start Date
export function validateStartDate(value) {
  if (value === null) {
    return "Please select a start date.";
  }
  // Other validation logic
  return "";
}

// Validation for Application Deadline
export function validateDeadline(value) {
  if (value === null) {
    return "Please select a deadline.";
  }
  // Other validation logic
  return "";
}

// Validation for Skills
export function validateSkills(input) {
  if (!minLength(input, 3)) {
    return 'Skills should have at least 3 characters';
  }
  if (input.trim().length === 0) {
    return 'Skills cannot be empty';
  }
  return ''; // Validation succeeded
}

// Validation for Description
export function validateDescription(input) {
  if (!minLength(input, 3)) {
    return 'Description should have at least 3 characters';
  }
  if (input.trim().length === 0) {
    return 'Description/Requirements should not be empty';
  }
  return ''; // Validation succeeded
}

// Validation for First Name
export function validateFirstName(input) {
  if (!minLength(input, 2) || !validName(input)) {
    return 'First Name should have at least 2 characters and no special characters';
  }
  if (input.trim().length === 0) {
    return 'First Name should not be empty';
  }
  return ''; // Validation succeeded
}
// Validation for Last Name
export function validateLastName(input) {
  if (!minLength(input, 2) || !validName(input)) {
    return 'Last Name should have at least 2 characters and no special characters';
  }
  if (input.trim().length === 0) {
    return 'Last Name should not be empty';
  }
  return ''; // Validation succeeded
}

// Validation for Title
export function validateTitle(input) {
  if (!minLength(input, 2)) {
    return 'Title should have at least 2 characters';
  }
  if (input.trim().length === 0) {
    return 'Title should not be empty';
  }
  return ''; // Validation succeeded
}

// Validation for Email
export function validateEmail(input) {
  if (!validEmail(input)) {
    return 'Must use a valid email address';
  }
  return ''; // Validation succeeded
}

/**
 * usernameEmailInCheck.js
 * @namespace Reusable
 * @see Modules/usernameEmailInCheck
 */

/**
 * Module to perform an API call to check if username or email are already present in the database. Used by fieldValidation.js and forgotPassword.js.
 * @module usernameEmailInUseCheck
 * @version 0.1
 * @see Modules/Users[api]
 * @see axios
 * @see Modules/FieldValidation
 * @see Classes/ForgotPassword
 */
import axios from 'axios';
//utility file to check if an existing username or email or both are in use in the mongo database already. This check is asyncrounous, so handle accordingly

/**
 * This function checks if the given email is already being used in a profile in the database. It is asyncronous, so use accordingly. Used by fieldValidation.js and forgotPassword.js.
 * @async
 * @function
 * @param {String} email - Email to check for
 * @param {String} userType - The current user type, used to decide which database to check
 * @returns {Boolean} - True if email is already in use
 * @see Modules/Users[api]/post/checkemail
 * @see Modules/FieldValidation
 * @see Classes/ForgotPassword
 */
export const checkIfEmailInUse = async (email, userID) => {
  let body = {
    email: email,
    _id: userID,
  };

  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/users/check-email-profile`,
    body
  );
  if (res.data.errors) {
    return true;
  } else {
    return false;
  }
};

/**
 * This function checks if the given username is already being used in a profile in the database. It is asyncronous, so use accordingly. Used by fieldValidation.js.
 * @async
 * @function
 * @param {String} username - Username to check for
 * @param {String} userType - The current user type, used to decide which database to check
 * @returns {Boolean} - True if the username is already in use
 * @see Modules/Users[api]/post/checkun
 * @see Modules/FieldValidation
 */
export const checkIfUsernameInUse = async (username, userType) => {
  let body = {
    username: username,
  };
  const res = await axios.post(
    `${process.env.REACT_APP_API}/api/users/check-username`,
    body
  );
  if (res.data.errors) {
    return true;
  } else {
    return false;
  }
};

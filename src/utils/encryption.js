/**
 * encryption.js
 * @namespace Reusable
 * @see Modules/encryption
 */

/**
 * This module provides an encryption function to protect passwords. Used in register.js, App.js, and resetPassword.js.
 * @module encryption
 * @version 0.1
 * @see crypto-js
 * @see Classes/Register
 * @see Classes/App
 * @see Classes/ResetPassword
 */
const CryptoJS = require('crypto-js');
/**
 * This function takes a password and email string and then encrypts the password so it can be safely passed to the server. Used in register.js, App.js, and resetPassword.js.
 * @function
 * @param {String} password - Password to encrypt
 * @param {String} email - Email the password will be hashed with
 * @returns {String} - The encrypted password
 * @see Classes/Register
 * @see Classes/App
 * @see Classes/ResetPassword
 */
export const encrypt = (password, email) => {
  var hash = CryptoJS.HmacSHA512(password, 'jobs4interns' + email);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
};

/**
 * auth.js
 * @namespace Reusable
 * @see Modules/auth
 */

/**
 * This module provides a method to authorize user access based on a token. Used in App.js.
 * @module auth
 * @version 0.1
 * @see axios
 * @see Classes/App
 */
import axios from 'axios';

/**
 * This function checks for a access token already present on the user's machine. Used in App.js.
 * @function
 * @returns {Object} - If sucessful, returns request data, otherwise returns null
 * @see Classes/App
 */
export const auth = async () => {
  let token = JSON.parse(localStorage.getItem('J4I-token'));
  if (token === null) {
    return false;
  } else {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/users/${token.ID}`
      );
      return data;
    } catch (err) {
      console.error(err.response.data);
    }
  }
};

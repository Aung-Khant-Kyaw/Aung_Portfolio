/**
 * setPassword.js
 * @namespace Reusable
 * @see Modules/SetPassword
 */

/**
 * This module provides the formatting of the password setting component of the registration process to register.js.
 * @module SetPassword
 * @version 0.1
 * @see Classes/Register
 */

/**
 * This function provides the HTML formatting of the password creation component of the registration process to register.js.
 * @function
 * @param { state, handleChange, handleFocusChange } props - The current state of the program, from register.js
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function SetPassword({ state, userType, handleChange, handleFocusChange }) {
  return (
    <>
      <div>
        <label>
          Set Password:
          <input
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
            onBlur={(e) => handleFocusChange(e)}
            id='password'
            required
          />
        </label>
      </div>

      <div>
        <label>
          Confirm Password:
          <input
            type='password'
            name='confirmPassword'
            value={state.confirmPassword}
            onChange={handleChange}
            onBlur={(e) => handleFocusChange(e)}
            id='confirmPassword'
            required
          />
        </label>
      </div>
      <br />
    </>
  );
}

export default SetPassword;

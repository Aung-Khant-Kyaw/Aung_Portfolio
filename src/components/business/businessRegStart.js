/**
 * This module provides the formatting of the business registration start component to register.js
 * @module BusinessRegStart
 * @version 0.1
 */

/**
 * This function provides the HTML formatting of the first page of the business registration process to register.js.
 * @function
 * @param {state, handleChange, handleFocusChange} props - The current props passed from register.js
 * @returns {HTMLCollection}
 * @see Functions/Register
 */
const BusinessRegStart = ({ state, handleChange, handleFocusChange }) => {
  return (
    <>
      <label>
        Point Of Contact:
        <input
          value={state.poc}
          id='poc'
          type='text'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Contact Email:
        <input
          value={state.email}
          id='email'
          type='email'
          pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Username:
        <input
          value={state.username}
          id='username'
          type='text'
          minLength='5'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>
    </>
  );
};

export default BusinessRegStart;

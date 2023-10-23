/**
 * adminRegStart.js
 * @namespace Incomplete
 * @see Modules/AdminRegStart
 */

/**
 * This module provides the formatting for the admin registration start component to Register.js (in development)
 * @module AdminRegStart
 * @version 1.0
 * @todo Finalize admin creation/functional process
 * @see react-select-us-states
 * @see react-phone-number-input/input
 * @see Classes/Register
 */
import SelectUSState from 'react-select-us-states';
import Input from 'react-phone-number-input/input';

/**
 * This function provides the HTML formatting for the AdminRegStart component to Register.js
 * @function
 * @param {state, setFormDataAdmin, handleChange, handleFocusChange} props - The current state from register.js
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function AdminRegStart({
  state,
  setFormDataAdmin,
  handleChange,
  handleFocusChange,
}) {
  console.log(state);
  return (
    <>
      <label>
        User Name:
        <input
          value={state.username}
          id='username'
          type='text'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        First Name:
        <input
          value={state.firstName}
          id='firstName'
          type='text'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label>
        Last Name:
        <input
          value={state.lastName}
          id='lastName'
          type='text'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label>
        Email:
        <input
          value={state.email}
          id='email'
          type='email'
          pattern='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label>
        Address:
        <input
          value={state.addressStreet}
          id='addressStreet'
          type='text'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label>
        Address Line 2:
        <input
          value={state.addressStreet2}
          id='addressStreet2'
          type='text'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        City:
        <input
          value={state.addressCity}
          id='addressCity'
          type='text'
          required
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label>
        State:
        <SelectUSState
          value={state.addressState}
          type='text'
          required
          onChange={(e) => setFormDataAdmin({ ...state, addressState: e })}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Zip Code:
        <input
          value={state.addressZip}
          id='addressZip'
          type='text'
          minLength='5'
          maxLength='10'
          pattern='[0-9-]*'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Phone Number:
        <input
          value={state.phoneNumber}
          id='phoneNumber'
          type='text'
          minLength='10'
          maxLength='10'
          pattern='[0-9]*'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>
    </>
  );
}

export default AdminRegStart;

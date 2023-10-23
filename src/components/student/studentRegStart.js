/**
 * This module provides the formatting for the student registration start component to register.js.
 * @module studentRegStart
 * @version 0.1
 * @see react-select-us-states
 * @see react-phone-number-input/input
 * @see Classes/Register
 */
import SelectUSState from 'react-select-us-states';
import '../../styles/Dropdown.css';
import React, { useState } from 'react';

/**
 * This function provides the HTML formatting for the first page of the student registration process to Register.js.
 * @function
 * @param {state, setFormDataStudent, handleChange, handleFocusChange,} props - State information from register.js that calls this function
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function StudentRegStart({
  state,
  setFormDataStudent,
  handleChange,
  handleFocusChange,
  handleProfileImageChange,
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      <label>
        Profile Picture:
        <input
          type='file'
          accept='.jpg, .jpeg, .png'
          id='avatar'
          onChange={handleProfileImageChange}
        />
      </label>
      <br />

      <label>
        User Name:
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

      <label>
        First Name:
        <input
          value={state.firstName}
          id='firstName'
          type='text'
          maxLength='30'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Last Name:
        <input
          value={state.lastName}
          id='lastName'
          type='text'
          maxLength='30'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        My Journey:
        <textarea
          value={state.bio}
          id='bio'
          rows='4'
          type='text'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
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
          onBlur={(e) => handleFocusChange(e)}
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
          onBlur={(e) => handleFocusChange(e)}
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
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        State:
        <SelectUSState
          value={state.addressState}
          type='text'
          required
          onLoad='AL'
          onChange={(e) => setFormDataStudent({ ...state, addressState: e })}
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
          value={state.userPhoneNumber}
          id='userPhoneNumber'
          type="text"
          minLength='10'
          maxLength='10'
          pattern='[0-9]*'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Social Media: <button
            id="socialMediaToggle"
            onClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!isDropdownOpen);
            }}
          >
             ▼
          </button>
        <div className="dropdown-container">
          <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
            <label>
              Website:
              <input
                value={state.linkPortfolio}
                id="linkPortfolio"
                placeholder="https://my-portfolio.com/..."
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleFocusChange(e)}
              />
            </label>

            <label>
              LinkedIn:
              <input
                value={state.linkLinkedIn}
                id="linkLinkedIn"
                placeholder="https://linkedin.com/..."
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleFocusChange(e)}
              />
            </label>

            <label>
              Twitter:
              <input
                value={state.linkTwitter}
                id="linkTwitter"
                placeholder="https://twitter.com/..."
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleFocusChange(e)}
              />
            </label>

            <label>
              Other Social Media:
              <input
                value={state.linkOther}
                id="linkOther"
                placeholder="https://other-social-media.com/..."
                type="text"
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleFocusChange(e)}
              />
            </label>
          </div>
        </div>
      </label>

    </>
  );
}

export default StudentRegStart;

/**
 * SecurityQuestions.js
 * @namespace Reusable
 * @see Modules/SecurityQuestions
 */

/**
 * This module provides the formatting of the security question selection component of the user registration process to register.js.
 * @module SecurityQuestions
 * @version 0.1
 * @see react-select
 * @see Classes/Register
 */
import Select from 'react-select';

/**
 * This function provides the HTML formatting of the security question and answer creation component of the registration process to register.js.
 * @function
 * @param {state, userType, handleChange, handleFocusChange, questionVals, getAvailableOptions, handleQuestionValChange,} props - The current props passed  from register.js
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function SecurityQuestions({
  state,
  handleChange,
  handleFocusChange,
  questionVals,
  getAvailableOptions,
  handleQuestionValChange,
}) {
  return (
    <>
      <label> Security Question #1:</label>
      <Select
        isSearchable={false}
        placeholder='Question #1'
        value={questionVals[0]}
        options={getAvailableOptions()}
        onChange={(e) => {
          handleQuestionValChange(e, 0);
        }}
      />
      <input
        value={state.securityAnswer1}
        name='securityAnswer1'
        type='text'
        id='securityAnswer1'
        required
        onChange={handleChange}
        onBlur={(e) => handleFocusChange(e)}
      />
      <br />
      <br />

      <label> Security Question #2:</label>
      <Select
        isSearchable={false}
        placeholder='Question #2'
        value={questionVals[1]}
        options={getAvailableOptions()}
        onChange={(e) => {
          handleQuestionValChange(e, 1);
        }}
      />
      <input
        value={state.securityAnswer2}
        name='securityAnswer2'
        type='text'
        id='securityAnswer2'
        required
        onChange={handleChange}
        onBlur={(e) => handleFocusChange(e)}
      />
      <br />
      <br />

      <label> Security Question #3:</label>
      <Select
        isSearchable={false}
        placeholder='Question #3'
        value={questionVals[2]}
        options={getAvailableOptions()}
        onChange={(e) => {
          handleQuestionValChange(e, 2);
        }}
      />
      <input
        value={state.securityAnswer3}
        name='securityAnswer3'
        type='text'
        id='securityAnswer3'
        required
        onChange={handleChange}
        onBlur={(e) => handleFocusChange(e)}
      />
      <br />
      <br />
    </>
  );
}

export default SecurityQuestions;

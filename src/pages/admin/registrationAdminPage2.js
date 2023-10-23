import React, { useState } from 'react';
import '../../styles/forms.css';
import SelectUSState from 'react-select-us-states';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import { Link } from 'react-router-dom';

/**
 * registrationAdminPage2.js
 * @namespace Incomplete
 * @see Classes/registrationAdminPage2
 */

/**
 * This class provides the component for the admin registration page 2 (in development)
 * @class
 * @version 1.0
 * @todo Finalize signup process, permissions, and workflow for admin users
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select-us-states
 * @see react-select
 */
class RegistrationAdminPage2 extends React.Component {
  constructor(props) {
    super(props);
    this.pageData = this.props.location.state || {};
    this.pageData1 = this.pageData.pageData1 || {
      poc: '',
      email: '',
      username: '',
    };
    this.pageData2 = this.pageData.pageData2 || {
      businessName: '',
      businessDivision: '',
      addressStreet: '',
      addressCity: '',
      addressState: 'AL',
      addressZip: '',
    };
    this.pageData3 = this.pageData.pageData3 || {
      input: {},
      errors: {},
    };
    this.pageData4 = this.pageData.pageData4 || {
      input: {},
      errors: {},
      questionVals: [null, null, null, null, null],
      filterOptions: [
        {
          value: 'What is the name of your first pet?',
          label: 'What is the name of your first pet?',
        },
        {
          value: 'What is the street of your first home?',
          label: 'What is the street of your first home?',
        },
        {
          value: 'What is the make or model of your first car?',
          label: 'What is the make or model of your first car?',
        },
        {
          value: 'What was your childhood nickname?',
          label: 'What was your childhood nickname?',
        },
        {
          value: 'In what city did you meet your spouse / significant other?',
          label: 'In what city did you meet your spouse / significant other?',
        },
        {
          value: 'What is the name of your favorite childhood friend?',
          label: 'What is the name of your favorite childhood friend?',
        },
        {
          value: 'What street did you live on in third grade?',
          label: 'What street did you live on in third grade?',
        },
        {
          value: 'What is the middle name of your youngest child?',
          label: 'What is the middle name of your youngest child?',
        },
        {
          value: 'What is the middle name of your oldest sibling?',
          label: 'What is the middle name of your oldest sibling?',
        },
        {
          value: 'What school did you attend for sixth grade?',
          label: 'What school did you attend for sixth grade?',
        },
        {
          value: 'What was the name of your first stuffed animal?',
          label: 'What was the name of your first stuffed animal?',
        },
        {
          value: 'In what city did your parents meet?',
          label: 'In what city did your parents meet?',
        },
      ],
    };

    this.state = this.pageData3;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * This function handles changes in the security questions of the page
   * @function
   * @param {String} option - The string of the currently selected security question
   * @param {number} index - The index of the currenrly selected secuerity question
   */
  handleQuestionValChange = (option, index) => {
    const newQuestionVals = this.state.questionVals;
    newQuestionVals[index] = option;
    this.setState((state) => {
      return {
        questionVals: newQuestionVals,
      };
    });
  };

  /**
   * This function provides the indexes of the available remaining security questions
   * @function
   * @returns {number[]}
   */
  getAvailableOptions = () => {
    const availableOptionsLeft = this.state.filterOptions;
    return availableOptionsLeft.filter((questionOption) => {
      return this.state.questionVals.indexOf(questionOption) === -1;
    });
  };

  /**
   * This function handles the onChange event of the text fields
   * @function
   * @param {Event} event - The event from the onChange event attribute of the text fields
   */
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  /**
   * This function handles the onSubmit event of the form
   * @function
   * @param {Event} event - The event from the onSubmit event attribute of the form
   */
  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      let input = {};
      input['password'] = '';
      input['confirmPassword'] = '';
      this.setState({ input: input });
    }

    this.props.history.push('./registration-admin-3');
    this.state = {
      pageData1: this.state,
      pageData2: this.pageData2,
      pageData3: this.pageData3,
      pageData4: this.pageData4,
    };
  }

  /**
   * This function checks to make sure a valid password was chosen
   * @function
   * @returns {Boolean}
   */
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (typeof input['password'] !== 'undefined') {
      var pattern = new RegExp(
        '^(?=.{8,20}$)(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[-$&@#%!]){2,}).*'
      );
      if (!pattern.test(input['password'])) {
        isValid = false;
        errors['password'] =
          'Please enter a valid password. Passwords must 8-20 characters long, uses the following symbols -$&@#%!], and at least two of each character class.';
      }
    }

    if (
      typeof input['password'] !== 'undefined' &&
      typeof input['confirmPassword'] !== 'undefined'
    ) {
      if (input['password'] != input['confirmPassword']) {
        isValid = false;
        errors['password'] = "The passwords don't match.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  /**
   * This function provides the HTML formattin
   * @function
   * @returns {HTMLCollection}
   */
  render() {
    return (
      <div className='page-container'>
        <div className='form-container'>
          <h1 className='form-title'>Register as an Admin</h1>
          <hr />
          <div className='form-steps'>
            <img src='stepCheck.png' />
            <img src='stepCheck.png' />
            <img src='step3.png' />
            <img className='image-bw' src='step4.png' />
          </div>
          <form className='fields' onSubmit={this.handleSubmit}>
            <div>
              <label>
                Set Password:
                <input
                  type='password'
                  name='password'
                  value={this.state.input.password}
                  onChange={this.handleChange}
                  id='password'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
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
                  value={this.state.input.confirmPassword}
                  onChange={this.handleChange}
                  id='confirmPassword'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                  required
                />
              </label>
              <div className='error'>{this.state.errors.password}</div>
            </div>
            <br />

            <div className='button-container-bottom'>
              <Link
                to={{
                  pathname: './registration-admin-1',
                  state: {
                    pageData1: this.pageData1,
                    pageData2: this.pageData2,
                    pageData3: this.state,
                    pageData4: this.pageData4,
                  },
                }}
              >
                {' '}
                <button className='button-back' type='submit'>
                  Back
                </button>
              </Link>

              <button className='button-back' type='submit'>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationAdminPage2;

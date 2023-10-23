import React, { useState } from 'react';
import '../../styles/forms.css';
import SelectUSState from 'react-select-us-states';
import Input from 'react-phone-number-input/input';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import { Link } from 'react-router-dom';

/**
 * registrationAdminPage1.js
 * @namespace Incomplete
 * @see Classes/registrationAdminPage1
 */

/**
 * This class provides the component for the admin registration page 1 (in development)
 * @class
 * @version 1.0
 * @todo Finalize signup process, permissions, and workflow for admin users
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-select-us-states
 * @see react-phone-number-input/input
 */
class registrationAdminPage1 extends React.Component {
  constructor(props) {
    super(props);
    this.pageData = this.props.location.state || {};
    this.pageData1 = this.pageData.pageData1 || {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      addressStreet: '',
      addressCity: '',
      addressState: 'AL',
      addressZip: '',
      phoneNumber: '',
    };
    this.pageData2 = this.pageData.pageData2 || {
      school: '',
      graduationYear: '',
      gpa: '',
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
    this.state = this.pageData1;
  }

  /**
   * This function handles changes in the text fields of the form
   * @function
   * @param {Event} event - The event from the onChange attribute of the text fields
   */
  handleChange = (event) => {
    let el = event.target || event;
    this.setState({ [el.id]: el.value });
  };

  /**
   * This function resets the page and is called by the onReset attribute of the fields
   * @function
   */
  handleReset = () => {
    this.setState({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      addressStreet: '',
      addressCity: '',
      addressState: 'AL',
      addressZip: '',
      phoneNumber: '',
    });
  };

  /**
   * This function is used to update the state of the page
   * @function
   * @param {State} value -The state to change to
   */
  handleState = (value) => {
    this.setState({ state: value });
  };

  /**
   * This function handles the onSubmit event from the form
   * @function
   * @async
   * @param {Event} event - The event from the onSubmit attribute of the form
   */
  async handleSubmit(event) {
    this.props.history.push('./registration-admin-2');
    this.state = {
      pageData1: this.state,
      pageData2: this.pageData2,
      pageData3: this.pageData3,
      pageData4: this.pageData4,
    };
  }

  /**
   * This function provides the HTMl formatting of the registrationAdminPage1 component
   * @function
   * @returns {HTMLCollection}
   */
  render() {
    return (
      <div className='page-container'>
        <div className='form-container'>
          <h1 className='title'>Register as an Admin</h1>
          <hr />
          <div className='form-steps'>
            <img src='stepCheck.png' />
            <img src='step2.png' />
            <img className='image-bw' src='step3.png' />
            <img className='image-bw' src='step4.png' />
          </div>

          <form
            className='fields'
            onSubmit={(e) => this.handleSubmit(e)}
            onReset={() => this.handleReset()}
          >
            <label>
              User Name:
              <input
                value={this.state.username}
                id='username'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <label>
              First Name:
              <input
                value={this.state.firstName}
                id='firstName'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              Last Name:
              <input
                value={this.state.lastName}
                id='lastName'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              Email:
              <input
                value={this.state.email}
                id='email'
                type='email'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              Address:
              <input
                value={this.state.addressStreet}
                id='addressStreet'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              City:
              <input
                value={this.state.addressCity}
                id='addressCity'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              State:
              <SelectUSState
                value={this.state.addressState}
                id='addressState'
                type='text'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleState(e)}
              />
            </label>

            <label>
              Zip Code:
              <input
                value={this.state.addressZip}
                id='addressZip'
                type='text'
                minlength='5'
                maxlength='5'
                pattern='[0-9]*'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>

            <label>
              Phone Number:
              <input
                value={this.state.phoneNumber}
                id='phoneNumber'
                type='text'
                minlength='10'
                maxlength='10'
                pattern='[0-9]*'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </label>
            <div className='button-container-bottom'>
              <Link to='./registration'>
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

export default registrationAdminPage1;

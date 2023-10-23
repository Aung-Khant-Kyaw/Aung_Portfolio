import React, { useState } from 'react';
import '../../styles/forms.css';
import SelectUSState from 'react-select-us-states';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import { Link, Redirect } from 'react-router-dom';

/**
 * registrationAdminPage3.js
 * @namespace Incomplete
 * @see Classes/registrationAdminPage3
 */

/**
 * This class provides the component for the admin registration page 3 (in development)
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
class RegistrationAdminPage3 extends React.Component {
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
      redirect: false,
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

    this.state = this.pageData4;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * This function handles changes in the security questions of this page
   * @function
   * @param {String} option - The currently selected security question option's string
   * @param {*} index - The currently selected security question index
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
   * This function returns the indices of the available remaining security questions
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
   * This function handles the onChange event of the form's text fields
   * @function
   * @param {Event} event - The event from the onChange attribute of the text fields
   */
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  /**
   * This function handles the onSubmit event attribute of the form
   * @function
   * @param {Event} event - The event from the onSubmit attribute of the form
   */
  handleSubmit(event) {
    event.preventDefault();

    fetch(
      `http://localhost:8080/j4ids-1.0/svcs/create?userid=${this.pageData1.username}&password=${this.pageData3.input.password}&role=Business&q1=${this.pageData4.questionVals[0].value}&q2=${this.pageData4.questionVals[1].value}&q3=${this.pageData4.questionVals[2].value}&q4=${this.pageData4.questionVals[3].value}&q5=${this.pageData4.questionVals[4].value}&a1=${this.pageData4.input.securityAnswer1}&a2=${this.pageData4.input.securityAnswer2}&a3=${this.pageData4.input.securityAnswer3}&a4=${this.pageData4.input.securityAnswer4}&a5=${this.pageData4.input.securityAnswer5}&poc=${this.pageData1.poc}&industries=${this.pageData2.businessDivision}&company_name=${this.pageData2.businessName}&address=${this.pageData2.addressStreet}&city=${this.pageData2.addressCity}&state=${this.pageData2.addressState}&country=US&zip=${this.pageData2.addressZip}&contact_email=${this.pageData1.email}`,
      {
        method: 'post',
        mode: 'cors',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.role == 'Error') {
          // @TODO have to display an error message on the front end
          return false;
        } else {
          // @TODO Direct them to a page about needing to confirm their account
          this.setState({ redirect: true });
          return true;
        }
      });

    // if user successfully created
    this.props.history.push('./successful');
  }

  /**
   * This function provides the HTML formatting of the registrationAdminPage3 component
   * @function
   * @returns {HTMLCollection}
   */
  render() {
    if (this.state.redirect) return <Redirect to='' />;
    else
      return (
        <div className='page-container'>
          <div className='form-container'>
            <h1 className='form-title'>Account Confirmation</h1>
            <hr />
            <div className='form-steps'>
              <img src='stepCheck.png' />
              <img src='stepCheck.png' />
              <img src='stepCheck.png' />
              <img src='step4.png' />
            </div>
            <form className='fields' onSubmit={this.handleSubmit}>
              <label> Security Question #1:</label>
              <Select
                placeholder='Question #1'
                value={this.state.questionVals[0]}
                options={this.getAvailableOptions()}
                onChange={(e) => {
                  this.handleQuestionValChange(e, 0);
                }}
              />
              <input
                value={this.state.input.securityAnswer1}
                name='securityAnswer1'
                type='text'
                id='securityAnswer1'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label> Security Question #2:</label>
              <Select
                placeholder='Question #2'
                value={this.state.questionVals[1]}
                options={this.getAvailableOptions()}
                onChange={(e) => {
                  this.handleQuestionValChange(e, 1);
                }}
              />
              <input
                value={this.state.input.securityAnswer2}
                name='securityAnswer2'
                type='text'
                id='securityAnswer2'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label> Security Question #3:</label>
              <Select
                placeholder='Question #3'
                value={this.state.questionVals[2]}
                options={this.getAvailableOptions()}
                onChange={(e) => {
                  this.handleQuestionValChange(e, 2);
                }}
              />
              <input
                value={this.state.input.securityAnswer3}
                name='securityAnswer3'
                type='text'
                id='securityAnswer3'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label> Security Question #4:</label>
              <Select
                placeholder='Question #4'
                value={this.state.questionVals[3]}
                options={this.getAvailableOptions()}
                onChange={(e) => {
                  this.handleQuestionValChange(e, 3);
                }}
              />
              <input
                value={this.state.input.securityAnswer4}
                name='securityAnswer4'
                type='text'
                id='securityAnswer4'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <label> Security Question #5:</label>
              <Select
                placeholder='Question #5'
                value={this.state.questionVals[4]}
                options={this.getAvailableOptions()}
                onChange={(e) => {
                  this.handleQuestionValChange(e, 4);
                }}
              />
              <input
                value={this.state.input.securityAnswer5}
                name='securityAnswer5'
                type='text'
                id='securityAnswer5'
                required
                onKeyPress={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <div className='button-container-bottom'>
                <Link
                  to={{
                    pathname: './registration-admin-2',
                    state: {
                      pageData1: this.pageData1,
                      pageData2: this.pageData2,
                      pageData3: this.pageData3,
                      pageData4: this.state,
                    },
                  }}
                >
                  {' '}
                  <button className='button-back' type='submit'>
                    Back
                  </button>
                </Link>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      );
  }
}

export default RegistrationAdminPage3;

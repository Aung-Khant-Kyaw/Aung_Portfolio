import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/forms.css';

/**
 * This class provides the Donate page component to App.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see Classes/App
 */
const Donate = () => {
  /**
   * This function provides the HTML formatting for the Donate component to App.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/App
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Donate to J4I</h1>
        <hr />
        <div className='text-content'>
          We welcome and encourage donations to the Jobs4Interns program. These
          funds help support this program, including all associated initiatives
          and events. If your organization would like to make a tax-deductible
          charitable gift to support the operation of the program you may click
          the "Donate Now!" button below.
          <br />
          <img className='image-content' src='donate.png' />
        </div>
        <div className='button-button-solo'>
          <a
            href='https://www.gofundme.com/charity/jobs4interns?utm_campaign=p_cmty_pd+share-sheet&utm_medium=copy_link_all&utm_source=customer'
            target='_blank'
          >
            <button> Donate Now!</button>
          </a>
        </div>
      </div>
      <div className='back-button-container-bottom'>
          <div className='back-button'>
            <Link to='/'>
              {' '}
              <button className='button-back' type='submit'>
                Back
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default Donate;

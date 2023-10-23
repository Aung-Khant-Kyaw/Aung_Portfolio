import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

/**
 * reviewBusiness.js
 * @namespace Incomplete
 * @see Classes/Review

/**
 * This class provides the component formatting for a business review (in development)
 * @class
 * @version 1.0
 * @todo Finalize review creation, processing, and storage
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-Rater
 * @see react-rater/lib/react-rater.css
 */
const Review = () => {
  /**
   * This function returns the HTML formatting of the businessReview component
   * @function
   * @returns {HTMLCollection}
   */
  return (
    <div className='page-container'>
      <div className='form-container'>
        <h1 className='title'>Submit a Review</h1>
        <hr />
        <form className='fields' onSubmit={() => {}}>
          Rate: <br />
          <Rater total={5} rating={0} />
          <br />
          <br />
          Comments/Feedback: <br />
          <textarea id='comment' rows='5' />
          <br />
          <br />
        </form>
        <div className='button-button-solo'>
          <Link to='./'>
            <button type='submit'>Submit Review</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Review;

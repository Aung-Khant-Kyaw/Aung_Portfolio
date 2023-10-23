/**
 * This module is currently not used, but could be used to act as a generalized FAQ question format
 * @module FAQ
 * @version 0.1
 * @see react
 * @see styles/faq.css
 */
import React from 'react';
import '../styles/faq.css';

/**
 * This function provides the HTML formatting of the FAQ component (currently not used)
 * @function
 * @param {Object[]} param0 - List of {faq, index, toggleFAQ}
 * @returns {HTMLCollection}
 */
function FAQ({ faq, index, toggleFAQ }) {
  return (
    <div
      className={'faq ' + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className='faq-question'>{faq.question}</div>
      <div className='faq-answer'>{faq.answer}</div>
    </div>
  );
}

export default FAQ;

/**
 * This module provides the formatting for the footer component to App.js.
 * @module Footer
 * @version 0.1
 * @see react
 * @see styles/Footer.css
 * @see react-router-dom
 * @see Classes/App
 */
import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

/**
 * Provides the HTML formatting for the Footer component to App.js.
 * @function
 * @returns {HTMLCollection}
 * @see Classes/App
 */
const Footer = () => {
  return (
    <div className='footer'>
      <div className='placeholder'></div>
      <div className='footer-content-left'>
        <div className='footerHeader'>
          <Link to='./about'>ABOUT US</Link>
        </div>
        <div className='footerHeader'>
          <Link to='./donate'>DONATE</Link>
        </div>
        <div className='footerHeader'>
          <Link to='./faq'>FAQs</Link>
        </div>
        <div className='footerHeader'>
          <Link to='./contact-us'>CONTACT</Link>
        </div>
      </div>

      <div className='footer-content-right'>© 2023, Domenix</div>
    </div>
  );
};
export default Footer;

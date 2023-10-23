/**
 * scrollToTop.js
 * @namespace Reusable
 * @see Modules/ScrollToTop
 */

/**
 * This module provides a function to quickly scroll a page back to its top to App.js.
 * @module ScrollToTop
 * @version 0.1
 * @see react
 * @see react-router-dom
 * @see Classes/App.js
 */
import { useEffect } from 'react';
// import { withRouter } from 'react-router-dom';

/**
 * This function can be called by any page to scroll back to the top to App.js.
 * @function
 * @param {State} history - The state of the program
 * @see Classes/App.js
 */
const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  });

  return null;
};

// export default withRouter(ScrollToTop);
export default ScrollToTop;

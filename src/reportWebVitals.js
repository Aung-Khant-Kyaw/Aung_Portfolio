/**
 * This module gets several bits of information about the site's performance
 * @module reportWebVitals
 * @version 0.1
 */

/**
 * This function provides site health information upon request
 * @function
 * @param {Function} onPerfEntry - Function calling the request
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

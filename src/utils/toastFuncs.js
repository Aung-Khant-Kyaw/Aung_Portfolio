/**
 * toastFuncs.js
 * @namespace Reusable
 * @see Modules/toastFuncs
 */

/**
 * Module to create toast notifications for different types of messages. Used in App.js, allJobPostings.js, jobSearch.js,
 * jobSearch.js, jobSearchResults.js, jobsAppliedTo.js, jobsSaved.js, newJobPosting.js, review.js, reviewsGiven.js,
 * reviewsreceived.js, adminJobPostings.js, adminReviews.js, adminSecurity.js, adminUserControls.js, registrationAdminPage1.js,
 * reregistrationAdminPage2.js, registrationAdminPage3.js, applyToJob.js, profileBusiness.js, reviewBusiness.js, confirmationCode.js,
 * contact.js, forgotPassword.js, registration.js, resetPassword.js, applyToJob.js, profileStudent.js, successfulUser.js, and
 * viewJobPosting.js.
 * @module toastFuncs
 * @version 0.1
 * @see react-toastify
 * @see react-toastify/dist/ReactToastify.css
 * @see Classes/App
 * @see Classes/AllJobPostings
 * @see Classes/JobSearch
 * @see Classes/JobSearchResults
 * @see Classes/JobsAppliedTo
 * @see Classes/JobsSaved
 * @see Classes/NewJobPosting
 * @see Classes/Review
 * @see Classes/ReviewsGiven
 * @see Classes/ReviewsReceived
 * @see Classes/AdminJobPostings
 * @see Classes/AdminReviews
 * @see Classes/AdminSecurity
 * @see Classes/AdminUserControls
 * @see Classes/RegistrationAdminPage1
 * @see Classes/RegistrationAdminPage2
 * @see Classes/RegistrationAdminPage3
 * @see Classes/ApplyToJob
 * @see Classes/ProfileBusiness
 * @see Classes/ReviewBusiness
 * @see Classes/ConfirmationCode
 * @see Classes/Contact
 * @see Classes/ForgotPassword
 * @see Classes/Registration
 * @see Classes/ResetPassword
 * @see Classes/ApplytoJob
 * @see Classes/ProfileStudent
 * @see Classes/SuccessfulUser
 * @see Classes/ViewJobPosting
 */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * This function provides a success format toast notification with the given text. Used in App.js, allJobPostings.js, jobSearch.js,
 * jobSearch.js, jobSearchResults.js, jobsAppliedTo.js, jobsSaved.js, newJobPosting.js, review.js, reviewsGiven.js,
 * reviewsreceived.js, adminJobPostings.js, adminReviews.js, adminSecurity.js, adminUserControls.js, registrationAdminPage1.js,
 * reregistrationAdminPage2.js, registrationAdminPage3.js, applyToJob.js, profileBusiness.js, reviewBusiness.js, confirmationCode.js,
 * contact.js, forgotPassword.js, registration.js, resetPassword.js, applyToJob.js, profileStudent.js, successfulUser.js, and
 * viewJobPosting.js.
 * @function
 * @param {String} text - The text to display
 * @returns {toast} - Toast notification for display
 * @see Classes/App
 * @see Classes/AllJobPostings
 * @see Classes/JobSearch
 * @see Classes/JobSearchResults
 * @see Classes/JobsAppliedTo
 * @see Classes/JobsSaved
 * @see Classes/NewJobPosting
 * @see Classes/Review
 * @see Classes/ReviewsGiven
 * @see Classes/ReviewsReceived
 * @see Classes/AdminJobPostings
 * @see Classes/AdminReviews
 * @see Classes/AdminSecurity
 * @see Classes/AdminUserControls
 * @see Classes/RegistrationAdminPage1
 * @see Classes/RegistrationAdminPage2
 * @see Classes/RegistrationAdminPage3
 * @see Classes/ApplyToJob
 * @see Classes/ProfileBusiness
 * @see Classes/ReviewBusiness
 * @see Classes/ConfirmationCode
 * @see Classes/Contact
 * @see Classes/ForgotPassword
 * @see Classes/Registration
 * @see Classes/ResetPassword
 * @see Classes/ApplytoJob
 * @see Classes/ProfileStudent
 * @see Classes/SuccessfulUser
 * @see Classes/ViewJobPosting
 */
export const toastSuccess = (text) =>
  toast(text, { hideProgressBar: true, className: 'success' });

/**
 * This function provides a fail format toast notification with the given text. Used in App.js, allJobPostings.js, jobSearch.js,
 * jobSearch.js, jobSearchResults.js, jobsAppliedTo.js, jobsSaved.js, newJobPosting.js, review.js, reviewsGiven.js,
 * reviewsreceived.js, adminJobPostings.js, adminReviews.js, adminSecurity.js, adminUserControls.js, registrationAdminPage1.js,
 * reregistrationAdminPage2.js, registrationAdminPage3.js, applyToJob.js, profileBusiness.js, reviewBusiness.js, confirmationCode.js,
 * contact.js, forgotPassword.js, registration.js, resetPassword.js, applyToJob.js, profileStudent.js, successfulUser.js, and
 * viewJobPosting.js.
 * @function
 * @param {String} text - The text to display
 * @returns {toast} - Toast notification for display
 * @see Classes/App
 * @see Classes/AllJobPostings
 * @see Classes/JobSearch
 * @see Classes/JobSearchResults
 * @see Classes/JobsAppliedTo
 * @see Classes/JobsSaved
 * @see Classes/NewJobPosting
 * @see Classes/Review
 * @see Classes/ReviewsGiven
 * @see Classes/ReviewsReceived
 * @see Classes/AdminJobPostings
 * @see Classes/AdminReviews
 * @see Classes/AdminSecurity
 * @see Classes/AdminUserControls
 * @see Classes/RegistrationAdminPage1
 * @see Classes/RegistrationAdminPage2
 * @see Classes/RegistrationAdminPage3
 * @see Classes/ApplyToJob
 * @see Classes/ProfileBusiness
 * @see Classes/ReviewBusiness
 * @see Classes/ConfirmationCode
 * @see Classes/Contact
 * @see Classes/ForgotPassword
 * @see Classes/Registration
 * @see Classes/ResetPassword
 * @see Classes/ApplytoJob
 * @see Classes/ProfileStudent
 * @see Classes/SuccessfulUser
 * @see Classes/ViewJobPosting
 */
export const toastFail = (text) =>
  toast(text, { hideProgressBar: true, className: 'fail' });

/**
 * This function provides a info format toast notification with the given text. Used in App.js, allJobPostings.js, jobSearch.js,
 * jobSearch.js, jobSearchResults.js, jobsAppliedTo.js, jobsSaved.js, newJobPosting.js, review.js, reviewsGiven.js,
 * reviewsreceived.js, adminJobPostings.js, adminReviews.js, adminSecurity.js, adminUserControls.js, registrationAdminPage1.js,
 * reregistrationAdminPage2.js, registrationAdminPage3.js, applyToJob.js, profileBusiness.js, reviewBusiness.js, confirmationCode.js,
 * contact.js, forgotPassword.js, registration.js, resetPassword.js, applyToJob.js, profileStudent.js, successfulUser.js, and
 * viewJobPosting.js.
 * @function
 * @param {String} text - The text to display
 * @returns {toast} - Toast notification for display
 * @see Classes/App
 * @see Classes/AllJobPostings
 * @see Classes/JobSearch
 * @see Classes/JobSearchResults
 * @see Classes/JobsAppliedTo
 * @see Classes/JobsSaved
 * @see Classes/NewJobPosting
 * @see Classes/Review
 * @see Classes/ReviewsGiven
 * @see Classes/ReviewsReceived
 * @see Classes/AdminJobPostings
 * @see Classes/AdminReviews
 * @see Classes/AdminSecurity
 * @see Classes/AdminUserControls
 * @see Classes/RegistrationAdminPage1
 * @see Classes/RegistrationAdminPage2
 * @see Classes/RegistrationAdminPage3
 * @see Classes/ApplyToJob
 * @see Classes/ProfileBusiness
 * @see Classes/ReviewBusiness
 * @see Classes/ConfirmationCode
 * @see Classes/Contact
 * @see Classes/ForgotPassword
 * @see Classes/Registration
 * @see Classes/ResetPassword
 * @see Classes/ApplytoJob
 * @see Classes/ProfileStudent
 * @see Classes/SuccessfulUser
 * @see Classes/ViewJobPosting
 */
export const toastInfo = (text) =>
  toast(text, { hideProgressBar: true, className: 'info' });

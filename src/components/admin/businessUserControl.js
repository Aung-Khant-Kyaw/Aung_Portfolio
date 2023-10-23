import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from '../modals/UserModal';
import UserCard from '../modals/UserCard';
import Fuse from "fuse.js";

/**
 * @namespace Complete
 * @see Classes/userConrol
 */

/**
 * This class provides the formatting for the component to control and make changes to user account by admins / super admin (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const BusinessUserControl = () => {
  // for business users
  const [businesses, setBusinesses] = useState([]);
  const [businessIndex, setBusinessIndex] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

  useEffect(() => {
    getBusinesses();
  }, []);

  // options for fuse search
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["username", "businessName", "poc", "email", "companyIndustry", "status"],
  };

  const fuse = new Fuse(businesses, options);

  const handleSearch = (event) => {
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      getBusinesses();
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setBusinesses(items);
  };

  /**
   * get all the business users from the database using API
   */
  const getBusinesses = async () => {
    try {
      // @ToDo : Make changes here
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/admins/all/businesses`
      );
      setBusinesses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function render all the job postings for user to see
   * Once Search function is done, need to call API and render the posts here
   * @returns job card components to Job Search Tab
   */
  const renderBusinessCards = () => {
    return businesses.map((user, index) => (
      <div
        key={user._id}
        onClick={() => {
          setBusinessIndex(index);
          setSelectedBusiness(user);
          setIsBusinessModalOpen(true);
        }}
      >
        <UserCard
          username={user.username}
          avatar={user.avatar}
          email={user.email}
        />
      </div>
    ));
  };

  /**
   * Handle when the click the delete user button
   * @param {*} user the current selected user
   */
  const handleDeleteClick = async (user) => {
    // ------ API Calls for delete user ------///
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/api/admins/deleteuser/${user._id}`
    );
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('User Deleted');
    }
    getBusinesses();
    setIsBusinessModalOpen(false);
  };

  /**
   * Handle when the click the lock user button
   * @param {*} user the current selected user
   */
  const handleLockClick = async (user) => {
    // ------ API Calls for lock user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/lockuser/${user._id}`
    );
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Locked User');
    }
    getBusinesses();
  };

  /**
   * Handle when the click the unlock user button
   * @param {*} user the current selected user
   */
  const handleUnlockClick = async (user) => {
    // ------ API Calls for unlock user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/unlockuser/${user._id}`
    );
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Unlocked User');
    }
    getBusinesses();
  };

  /**
   * Handle when the click the archive user button
   * @param {*} user the current selected user
   */
  const handleArchiveClick = async (user) => {
    // ------ API Calls for archive user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/archiveuser/${user._id}`
    );
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Archived User');
    }
    getBusinesses();
  };

    /**
   * Handle when the click the reset password user button
   * @param {*} user the current selected user
   */
    const handleResetClick = async (user) => {
        // ------ API Calls for archive user ------///
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/admins/resetuserpass/${user._id}`
        );
        if (res.data.error) {
            toastInfo(res.data.error);
            throw res.data.error;        
          } else {
            toastInfo('Reset Password Link Sent');
        }
        getBusinesses();
      };
    

  /**
   * This function returns the HTML formatting of the User Control component to superAdmin.js and admin.js
   * @function
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */
  return (
    <div className="dash-container">
      <div className="job-search-btn-container"></div>
      {/* <p className="dash-header">Business User Control</p>
      <p className="dash-text">
        Here, you can 'reset user password', 'delete user', 'archieve user',
        'lock/unlock user'.
      </p> */}
      <input
        className='searchBar'
        type="text"
        placeholder="Search by username, businessName, poc, email, companyIndustry, status"
        onChange={handleSearch}
      />
      <hr />
      <div className="job-post-container">{renderBusinessCards()}</div>
      {isBusinessModalOpen && selectedBusiness && (
        <UserModal
          onCloseModal={() => setIsBusinessModalOpen(false)}
          selectedUser={selectedBusiness}
          deleteUser={() => handleDeleteClick(selectedBusiness)}
          lockUser={() => handleLockClick(selectedBusiness)}
          unlockUser={() => handleUnlockClick(selectedBusiness)}
          archiveUser={() => handleArchiveClick(selectedBusiness)}
          resetPass={() => handleResetClick(selectedBusiness)}
        />
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default BusinessUserControl;

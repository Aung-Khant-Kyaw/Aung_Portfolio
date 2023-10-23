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
const StudentUserControl = () => {
  // for student users
  const [students, setStudents] = useState([]);
  const [studentIndex, setStudentIndex] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  // options for fuse search
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
    keys: ["username", "firstName", "lastName", "email", "status", "institution", "gpa", "gradYear"],
  };

  const fuse = new Fuse(students, options);

  const handleSearch = (event) => {
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      getStudents();
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setStudents(items);
  };


  /**
   * get all the student users from the database using API
   */
  const getStudents = async () => {
    try {
      // @ToDo : Make changes here
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/admins/all/students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * This function render all the job postings for user to see
   * Once Search function is done, need to call API and render the posts here
   * @returns job card components to Job Search Tab
   */
  const renderStudentCards = () => {
    return students.map((user, index) => (
      <div
        key={user._id}
        onClick={() => {
          setStudentIndex(index);
          setSelectedStudent(user);
          setIsStudentModalOpen(true);
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
    getStudents();
    setIsStudentModalOpen(false);
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
    getStudents();
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
    getStudents();
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
    getStudents();
  };

    /**
   * Handle when the click the reset password button
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
      getStudents();
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
      {/* <p className="dash-header">Student User Control</p>
      <p className="dash-text">
        Here, you can 'reset user password', 'delete user', 'archieve user',
        'lock/unlock user'.
      </p> */}
      <input
        className='searchBar'
        type="text"
        placeholder="Search by username, firstName, lastName, email, status, institution, gpa, gradYear"
        onChange={handleSearch}
      />
      <hr />
      <div className="job-post-container">{renderStudentCards()}</div>
      {isStudentModalOpen && selectedStudent && (
        <UserModal
          onCloseModal={() => setIsStudentModalOpen(false)}
          selectedUser={selectedStudent}
          deleteUser={() => handleDeleteClick(selectedStudent)}
          lockUser={() => handleLockClick(selectedStudent)}
          unlockUser={() => handleUnlockClick(selectedStudent)}
          archiveUser={() => handleArchiveClick(selectedStudent)}
          resetPass={() => handleResetClick(selectedStudent)}
        />
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default StudentUserControl;

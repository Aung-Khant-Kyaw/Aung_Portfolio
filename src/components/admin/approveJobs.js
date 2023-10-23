import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from "fuse.js";

import JobModal from '../modals/AdminJobModal';
import JobCard from '../modals/AdminJobCard';

/**
 * @namespace Complete
 * @see Classes/approveJobs
 */

/**
 * This class provides the formatting for the component to approve job postings by admins / super admin (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const ApproveJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [pageChange, setPageChange] = useState('In-Review');

    useEffect(() => {
      getAllJobs();
    }, []);

  // options for fuse search
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.6,
    keys: ["status", "archived", "jobTitle", "email"],
  };

  const fuse = new Fuse(jobs, options);

  const handleSearch = (event) => {
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      getAllJobs();
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setJobs(items);
  };

  const handlePageChange = (page) => {
    if (page === 'In-Review'){
      setPageChange ('In-Review');
    } else if (page === 'Approved'){
      setPageChange('Approved');
    } else if (page === 'Denied'){
      setPageChange('Denied');
    }
  };

    /**
   * get all the business users from the database using API
   */
    const getAllJobs = async () => {
      try {
        // @ToDo : Make changes here
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/jobs/all`
        );
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  /**
   * This function render all the job postings for user to see
   * Once Search function is done, need to call API and render the posts here
   * @returns job card components to admin/approve job postings Tab
   */
  // Inside the renderJobPosts function in JobSearch component
  const renderJobPosts = () => {
    return jobs
      .filter((job) => job.status=== pageChange)
      .map((job, index) => {
        return (
          <div
            key={job._id}
            onClick={() => {
              setSelectedJob(job);
              setIsJobModalOpen(true);
            }}
          >
            <JobCard
              jobTitle={job.jobTitle}
              businessID={job.businessID}
              location={job.location}
              jobCity={job.jobCity}
              jobState={job.jobState}
              jobStatus={job.status}
            />
          </div>
        );
      });
  };

  const handleApproveJob = async(job) => {
    // ------ API Calls for lock user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/approvejob/${job._id}`
    );
    toastInfo(res.data);
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Approve Job!');
    }
    getAllJobs();
  };

  const handleDenyJob = async(job, comment) => {
    let body = {
      jobID: job._id,
      comment: comment,
      userID: job.businessID,
    }
    try{
      const res = await axios.put(`${process.env.REACT_APP_API}/api/admins/denyjob`, body);
      if (res.data.error){
          toastInfo(res.data.error);
      } else {
          toastInfo("Job denied. Email Sent.")
      }
    } catch (e) {
      const err = e.response.data.errors;
      console.log(err);
    }
    getAllJobs();
  }

  /**
   * This function returns the HTML formatting of the Approve Jobs component to superAdmin.js and admin.js
   * @functiosn
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */
  return (
    <div className='dash-container'>
      <div className='job-search-btn-container'>
        <input
          className='shortBar searchBar'
          type="text"
          placeholder="Search by status, archived, jobTitle, email"
          onChange={handleSearch}
        />
        <button className='create-posting-button' onClick={() => handlePageChange('Denied')}>
          Denied
        </button>
        <button className='create-posting-button' onClick={() => handlePageChange('Approved')}>
          Approved
        </button>
        <button className='create-posting-button' onClick={() => handlePageChange('In-Review')}>
          In-Review
        </button>
      </div>
      <hr />
      <div className='job-post-container'>{renderJobPosts()}</div>
      {isJobModalOpen && selectedJob && (
        <JobModal
          selectedJob={selectedJob}
          onCloseModal={() => setIsJobModalOpen(false)}
          approveJob={() => handleApproveJob(selectedJob)}
          denyJob={(denyComment) => handleDenyJob(selectedJob, denyComment)}
        />
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default ApproveJobs;
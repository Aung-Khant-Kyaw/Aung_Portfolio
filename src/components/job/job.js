import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/forms.css';
import JobModal from '../../components/modals/BusiJobModal';
import JobCard from '../../components/modals/BusiJobCard';
import Fuse from 'fuse.js';

function Job({ user }) {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('All Jobs');

  const getJobsByBusinessID = async (businessID) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/jobs/all/${businessID}`
      );
      setJobs(response.data);
      setAllJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobsByBusinessID(user._id);
  }, []);

  // options for fuse search
  const options = {
    findAllMatches: true,
    threshold: 0.5,
    keys: ['jobTitle'],
  };

  const fuse = new Fuse(allJobs, options);

  const handleSearch = (event) => {
    const { value } = event.target;
    console.log(value.length);

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      getJobsByBusinessID(user._id);
      return;
    }

    const results = fuse.search(value);
    console.log(results);
    const items = results.map((result) => result.item);
    setJobs(items);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
  };

  const handleArchiveClick = async (jobID) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/jobs/archive-job/${jobID}`,
        { jobID: jobID }
      );
      setJobs((prevJobs) =>
        prevJobs.map((prevJob) =>
          prevJob._id === jobID ? { ...prevJob, archived: true } : prevJob
        )
      );
      if (response.data.error) {
        console.log('Error archiving the job');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnarchiveClick = async (jobID) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/jobs/unarchive-job/${jobID}`,
        {
          jobID: jobID,
        }
      );
      setJobs((prevJobs) =>
        prevJobs.map((prevJob) =>
          prevJob._id === jobID ? { ...prevJob, archived: false } : prevJob
        )
      );
      if (response.data.error) {
        console.log('Error unarchiving the job');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateJobInListings = (updatedJob) => {
    const updatedJobs = jobs.map((job) =>
      job._id === updatedJob._id ? updatedJob : job
    );
    setJobs(updatedJobs);
  };

  const renderJobPosts = () => {
    if (
      currentPage === 'Approved' ||
      currentPage === 'Denied' ||
      currentPage === 'In-Review'
    ) {
      return jobs
        .filter((job) => job.status === currentPage)
        .map((job, index) => {
          return (
            <div
              key={job._id}
              onClick={() => {
                setSelectedJob(job);
                setIsModalOpen(true);
              }}
            >
              <JobCard
                jobID={job._id}
                jobTitle={job.jobTitle}
                location={job.location}
                jobStatus={job.status}
                jobArchived={job.archived}
                handleArchivedClick={(jobID) => handleArchiveClick(jobID)}
                handleUnarchivedClick={(jobID) => handleUnarchiveClick(jobID)}
                onUpdateJob={handleUpdateJobInListings}
              />
            </div>
          );
        });
    } else if (currentPage === 'Archived') {
      return jobs
        .filter((job) => job.archived === true)
        .map((job, index) => {
          return (
            <div
              key={job._id}
              onClick={() => {
                setSelectedJob(job);
                setIsModalOpen(true);
              }}
            >
              <JobCard
                jobID={job._id}
                jobTitle={job.jobTitle}
                location={job.location}
                jobStatus={job.status}
                jobArchived={job.archived}
                handleArchivedClick={(jobID) => handleArchiveClick(jobID)}
                handleUnarchivedClick={(jobID) => handleUnarchiveClick(jobID)}
                onUpdateJob={handleUpdateJobInListings}
              />
            </div>
          );
        });
    } else if (currentPage === 'Unarchived') {
      return jobs
        .filter((job) => job.archived === false)
        .map((job, index) => {
          return (
            <div
              key={job._id}
              onClick={() => {
                setSelectedJob(job);
                setIsModalOpen(true);
              }}
            >
              <JobCard
                jobID={job._id}
                jobTitle={job.jobTitle}
                location={job.location}
                jobStatus={job.status}
                jobArchived={job.archived}
                handleArchivedClick={(jobID) => handleArchiveClick(jobID)}
                handleUnarchivedClick={(jobID) => handleUnarchiveClick(jobID)}
                onUpdateJob={handleUpdateJobInListings}
              />
            </div>
          );
        });
    } else if (currentPage === 'All Jobs') {
      return jobs.map((job, index) => {
        return (
          <div
            key={job._id}
            onClick={() => {
              console.log(job);
              setSelectedJob(job);
              setIsModalOpen(true);
            }}
          >
            <JobCard
              jobID={job._id}
              jobTitle={job.jobTitle}
              location={job.location}
              jobStatus={job.status}
              jobArchived={job.archived}
              handleArchivedClick={(jobID) => handleArchiveClick(jobID)}
              handleUnarchivedClick={(jobID) => handleUnarchiveClick(jobID)}
              onUpdateJob={handleUpdateJobInListings}
            />
          </div>
        );
      });
    }
  };
  return (
    <div className='dash-container'>
      <div className='job-top-wrapper'>
        <div>
          <label>Filter by:</label>
          <select
            className='filter-dropdown'
            value={currentPage}
            onChange={handlePageChange}
          >
            <option value='Approved'>Approved</option>
            <option value='In-Review'>In-Review</option>
            <option value='Denied'>Denied</option>
            <option value='Archived'>Archived</option>
            <option value='Unarchived'>Unarchived</option>
            <option value='All Jobs'>All Jobs</option>
          </select>
        </div>
        <input
          className='searchBar'
          type='text'
          placeholder='Search by jobTitle'
          onChange={handleSearch}
        />
      </div>
      <hr />
      <div className='job-post-container'>{renderJobPosts()}</div>
      {isModalOpen && selectedJob && (
        <JobModal
          onCloseModal={() => setIsModalOpen(false)}
          selectedJob={selectedJob}
          userID={user._id}
          onUpdateJob={handleUpdateJobInListings}
        />
      )}
    </div>
  );
}

export default Job;

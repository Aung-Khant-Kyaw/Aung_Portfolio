import '../../styles/jobsearch.css';
import '../../styles/forms.css';

import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import JobModal from '../../components/modals/JobModal';
import JobCard from '../modals/JobSearchCard';
import AppModal from '../modals/AppModal';
import {
  LOCATION,
  type,
  COMPANY_INDUSTRIES,
  COMPANY_SIZES,
  JOB_DURATION,
  DATE_POSTED,
} from '../../utils/constants';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastSuccess } from '../../utils/toastFuncs';

/**
 * jobSearch.js
 * @namespace Complete
 * @see Classes/JobSearch

/**
 * This module provides the formatting for the job search component to student dashboard.js (in development)
 * @class
 * @version 2.0
 * @todo Create job creation and viewing support
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
function JobSearch({ user, savedJobs, setSavedJobs }) {
  const [jobs, setJobs] = useState([]);
  const [jobIndex, setJobIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    whatSearch: '',
    whereSearch: '',
    location: [],
    type: [],
    duration: [],
    datePosted: [],
    companyIndustry: [],
    companySize: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResults, setIsSearchResults] = useState(true);
  const [currentPage, setCurrentPage] = useState('active');
  const [archived, setArchived] = useState(false);
  const [savedJobIDs, setSavedJobIDs] = useState([]);

  const optionsDatePosted = DATE_POSTED.map((date) => date);
  const optionsDuration = JOB_DURATION.map((date) => date);
  const optionsJobLocation = LOCATION.map((location) => ({
    value: location,
    label: location,
  }));
  const optionsJobType = type.map((type) => ({
    value: type,
    label: type,
  }));
  const optionsCompanyIndustry = COMPANY_INDUSTRIES.map((industry) => ({
    value: industry,
    label: industry,
  }));
  const optionsCompanySize = COMPANY_SIZES.map((size) => ({
    value: size,
    label: size,
  }));

  const handleSaveClick = async (jobID) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/jobs/save/${user._id}/${jobID}`
      );
      setSavedJobs([...savedJobs, jobID]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnsaveClick = async (jobID) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/jobs/unsave/${user._id}/${jobID}`
      );
      setSavedJobs(savedJobs.filter((savedJobID) => savedJobID !== jobID));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getJobs(user._id);
    }
  }, [user]);

  // when the filters data is saved, the handleSearch function is called.
  useEffect(() => {
    handleSearch();
  }, [
    searchData.location,
    searchData.type,
    searchData.datePosted,
    searchData.duration,
    searchData.companyIndustry,
    searchData.companySize,
  ]);

  /**
   * get all the jobs from the database using API
   */
  const getJobs = async (_id) => {
    try {
      const [jobsResponse, savedJobsResponse, appliedToJobsRes] =
        await Promise.all([
          axios.get(`${process.env.REACT_APP_API}/api/jobs/unarchivedall`),
          axios.get(`${process.env.REACT_APP_API}/api/jobs/savearr/${_id}`),
          axios.get(`${process.env.REACT_APP_API}/api/applications/applied/${_id}`),
        ]);

      const jobsData = jobsResponse.data;
      const savedJobsData = savedJobsResponse.data.savedJobs;
      const appliedToJobs = appliedToJobsRes.data.map((job) => job.jobId);

      const updatedJobs = jobsData.map((job) => ({
        ...job,
        saved: savedJobsData.includes(job._id),
        applied: appliedToJobs.includes(job._id),
      }));

      setJobs(updatedJobs);
      setSearchResults(updatedJobs);
    } catch (error) {
      console.error(error);
    }
  };

  /**This function saves the filter selection in searchData.
   * @function
   * @param {Event} e - the event from the onChange attribute of the select elements for the filters
   * @param {String}key - the name of the filter
   */
  const handleFilterChange = (e, key) => {
    let values = [];
    if (Array.isArray(e)) {
      values = e.map((obj) => obj.value);
      return setSearchData({ ...searchData, [key]: values });
    }

    if (e !== null) {
      values = e.value;
    }

    setSearchData({ ...searchData, [key]: values });
  };

  /**This function calculates the difference between two dates in days. It converts both dates to UTC to accound for timezone differences and does not consider the time.
   * @function
   * @param {Date}a - the first date
   * @param {Date}b - the second date
   * @returns {Number} - the difference between the two dates in days
   */
  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  /**
   * This function handles input as it is entered into the search text fields
   * @function
   * @param {Event} e - The event from the onChange attribute of the text fields
   */
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setSearchData({ ...searchData, [key]: value });
  };

  /**This function is called when the Search button is clicked, then calls the handleSearch function.
   * @function
   * @param {Event}e-the event from the onSubmit attribute of the Search button.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  //Options for the fuse search
  const fuseOptions = {
    includeScore: true,
    includeMatches: true,
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.3,
    keys: ['jobTitle', 'businessName', 'jobCity', 'jobState', 'location'],
  };

  /**This function executes the job search and filters, based on the data saved in searchData. It calls the filterJobs and dateDiffinDays functions.
   * @function
   */
  const handleSearch = () => {
    //if there are no search or filter parameters in searchData, set the search results to all the job postings.
    if (Object.values(searchData).every((x) => x.length === 0 || x === '')) {
      setSearchResults(jobs);
      setIsSearchResults(true);
    } else {
      let results = [];
      let items = jobs;

      if (searchData.whatSearch) {
        const fuse = new Fuse(jobs, fuseOptions);
        results = fuse.search({
          $or: [
            { jobTitle: searchData.whatSearch },
            { businessName: searchData.whatSearch },
            { location: searchData.whatSearch },
          ],
        });
        items = results.map((result) => result.item);
      }

      if (searchData.whereSearch) {
        const fuse2 = new Fuse(items, fuseOptions);
        results = fuse2.search({
          $or: [
            { jobCity: searchData.whereSearch },
            { jobState: searchData.whereSearch },
            { location: searchData.whereSearch },
          ],
        });
        items = results.map((result) => result.item);
      }

      if (searchData.location.length !== 0) {
        items = filterJobs('location', items);
      }
      if (searchData.type.length !== 0) {
        items = filterJobs('type', items);
      }
      if (searchData.companyIndustry.length !== 0) {
        items = filterJobs('companyIndustry', items);
      }
      if (searchData.companySize.length !== 0) {
        items = filterJobs('companySize', items);
      }

      if (searchData.datePosted.length !== 0) {
        results = [];
        const currentDate = new Date();

        for (let i = 0; i < items.length; i++) {
          const jobDate = new Date(items[i].createdAt);
          const difference = dateDiffInDays(jobDate, currentDate);

          if (difference < searchData.datePosted) {
            results = results.concat(items[i]);
          }
        }

        items = results;
      }

      if (searchData.duration.length !== 0) {
        results = [];
        for (let i = 0; i < searchData.duration.length; i++) {
          for (let j = 0; j < items.length; j++) {
            const startDate = new Date(items[j].start);
            const endDate = new Date(items[j].end);
            const duration = Math.ceil(dateDiffInDays(startDate, endDate) / 30);

            if (
              (duration <= searchData.duration[i] &&
                duration > searchData.duration[i] - 3) ||
              (duration >= searchData.duration[i] &&
                searchData.duration[i] === 13)
            ) {
              results = results.concat(items[j]);
            }
          }
        }

        items = results;
      }

      setSearchResults(items);

      if (items.length === 0) {
        setIsSearchResults(false);
      } else {
        setIsSearchResults(true);
      }
    }
  };

  /**This function filters the jobs based on parameters saved in searchData.
   * @function
   * @param {String}key - the name of the filter
   * @param {Object}jobs - the job postings
   * @returns {Object} - the results of the filter
   */
  const filterJobs = (key, jobs) => {
    let results = [];

    for (let i = 0; i < searchData[key].length; i++) {
      results = results.concat(
        jobs.filter((jobs) => jobs[key] === searchData[key][i])
      );
    }

    return results;
  };

  /**
   * This function render all the job postings for user to see
   * Once Search function is done, need to call API and render the posts here
   * @returns job card components to Job Search Tab
   */
  // Inside the renderJobPosts function in JobSearch component
  const renderJobPosts = () => {
    return searchResults.map((job, index) => {
      return (
        <div
          key={job._id}
          onClick={() => {
            setJobIndex(index);
            setSelectedJob(job);
            setIsModalOpen(true);
          }}
        >
          <JobCard
            jobTitle={job.jobTitle}
            businessID={job.businessID}
            location={job.location}
            jobCity={job.jobCity}
            jobState={job.jobState}
            jobID={job._id}
            saved={job.saved}
            user={user}
            getJobs={(id) => getJobs(id)}
          />
        </div>
      );
    });
  };

  /**
   * Handle when the user click the next job button
   * Return the next job modal
   * @param {*} job the current selected job
   */
  const handleNextJobClick = (job) => {
    if (jobIndex === user.length - 1) {
      setJobIndex(user.length - 1);
      setSelectedJob(jobs[jobIndex]);
    } else {
      setJobIndex(jobIndex + 1);
      setSelectedJob(jobs[jobIndex]);
    }
  };

  /**
   * Handle when the user click the previous job button
   * Return the previous job modal
   * @param {*} job the current selected job
   */
  const handlePreviousClick = (job) => {
    if (jobIndex === 0) {
      setJobIndex(0);
      setSelectedJob(jobs[jobIndex]);
    } else {
      setJobIndex(jobIndex - 1);
      setSelectedJob(jobs[jobIndex]);
    }
  };

  const submitMessage = () => {
    toastSuccess('Application Submitted!');
  };

  return (
    <div className='dash-container'>
      <form className='jobsearch-container' onSubmit={(e) => handleSubmit(e)}>
        <div className='jobsearch-input-container'>
          <label htmlFor='whatSearch' className='jobsearch-label'>
            What:
          </label>
          <input
            id='whatSearch'
            name='whatSearch'
            className='jobsearch-input'
            type='text'
            placeholder='Job title, company, or keywords'
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className='jobsearch-input-container'>
          <label htmlFor='whereSearch' className='jobsearch-label'>
            Where:
          </label>
          <input
            id='whereSearch'
            name='whereSearch'
            className='jobsearch-input'
            type='text'
            placeholder='City, state, or "remote"'
            onChange={(e) => handleChange(e)}
          ></input>
        </div>

        <button type='submit'>Search</button>
      </form>

      <div className='jobsearch-filters-container'>
        <Select
          name='datePosted'
          className='filter-select'
          isClearable
          placeholder={'Date Posted'}
          options={optionsDatePosted}
          onChange={(e) => handleFilterChange(e, 'datePosted')}
        />
        <Select
          name='location'
          className='filter-select'
          isClearable
          isMulti
          placeholder={'Job Format'}
          options={optionsJobLocation}
          onChange={(e) => handleFilterChange(e, 'location')}
        />
        <Select
          name='type'
          className='filter-select'
          isClearable
          isMulti
          placeholder={'Job Type'}
          options={optionsJobType}
          onChange={(e) => handleFilterChange(e, 'type')}
        />

        <Select
          name='duration'
          className='filter-select'
          isClearable
          isMulti
          placeholder={'Duration'}
          options={optionsDuration}
          onChange={(e) => handleFilterChange(e, 'duration')}
        />
        <Select
          name='companyIndustry'
          className='filter-select'
          isClearable
          isMulti
          placeholder={'Company Industry'}
          options={optionsCompanyIndustry}
          onChange={(e) => handleFilterChange(e, 'companyIndustry')}
        />
        <Select
          name='companySize'
          className='filter-select'
          isClearable
          isMulti
          placeholder={'Company Size'}
          options={optionsCompanySize}
          onChange={(e) => handleFilterChange(e, 'companySize')}
        />
      </div>
      <hr />

      {/* If there are search results, render the jobs */}
      {isSearchResults && (
        <div className='job-post-container'>{renderJobPosts()}</div>
      )}

      {/* If there are no search results that match the search and filters, display the message. */}
      {!isSearchResults && (
        <div className='no-search-results-container'>
          <h1>Sorry! We couldn't find any results</h1>
          <p>Please try again with different keywords or filter settings</p>
        </div>
      )}

      {isModalOpen && selectedJob && (
        <JobModal
          onCloseModal={() => setIsModalOpen(false)}
          jobTitle={selectedJob.jobTitle}
          businessID={selectedJob.businessID}
          location={selectedJob.location}
          jobStreet={selectedJob.jobStreet}
          jobCity={selectedJob.jobCity}
          jobState={selectedJob.jobState}
          jobZip={selectedJob.jobZip}
          type={selectedJob.type}
          start={selectedJob.start}
          end={selectedJob.end}
          description={selectedJob.description}
          deadline={selectedJob.deadline}
          skills={selectedJob.skills}
          firstName={selectedJob.firstName}
          lastName={selectedJob.lastName}
          title={selectedJob.title}
          email={selectedJob.email}
          nextJob={() => handleNextJobClick(selectedJob)}
          previousJob={() => handlePreviousClick(selectedJob)}
          saveJob={() => handleSaveClick(selectedJob)}
          unsaveJob={() => handleUnsaveClick(selectedJob)}
          savedJob={selectedJob.saved}
          appliedJob={selectedJob.applied}
          setIsAppModalOpen={setIsAppModalOpen}
        />
      )}

      {isAppModalOpen && selectedJob && (
        <AppModal
          isAppModalOpen={isAppModalOpen}
          closeAppModal={() => setIsAppModalOpen(false)}
          submitMessage={() => submitMessage()}
          user={user}
          jobTitle={selectedJob.jobTitle}
          jobID={selectedJob._id}
          businessID={selectedJob.businessID}
          applied={() => (selectedJob.applied = true)}
        />
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
}

export default JobSearch;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/myJobStudent.css';
import '../../styles/forms.css';
import JobCard from '../modals/JobSavedCard';
import JobModal from '../modals/JobModal';
import AppModal from '../modals/AppModal';
import { ToastContainer } from 'react-toastify';
import { toastSuccess } from '../../utils/toastFuncs';

const MyJobsStudent = ({ _id, user, savedJobs, setSavedJobs, getJobs }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedSavedJob, setSelectedSavedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [applications, setApplications] = useState([]);

  //the function fetches information about the jobs, saved jobs, and applications
  const fetchSavedJobs = async (_id) => {
    try {
      const [jobsResponse, savedJobsResponse, applicationsRes] =
        await Promise.all([
          axios.get(`${process.env.REACT_APP_API}/api/jobs/unarchivedall`),
          axios.get(`${process.env.REACT_APP_API}/api/jobs/savearr/${_id}`),
          axios.get(
            `${process.env.REACT_APP_API}/api/applications/applied/${_id}`
          ),
        ]);
      //putting the application jobIDs in an array
      const appliedToJobs = applicationsRes.data.map((job) => job.jobId);
      setApplications(applicationsRes.data);

      //fetch the job information for the 'saved Jobs'
      const jobIDs = savedJobsResponse.data.savedJobs;
      let fetchedJobs = [];
      for await (const jobID of jobIDs) {
        const jobResponse = await axios.get(
          `${process.env.REACT_APP_API}/api/jobs/${jobID}`
        );
        if (!jobResponse.data.error) {
          fetchedJobs.push({ ...jobResponse.data, saved: true });
        }
      }
      //add whether or not a job has been applied to, to the object
      fetchedJobs = fetchedJobs.map((job) => ({
        ...job,
        applied: appliedToJobs.includes(job._id),
      }));
      setSavedJobs(fetchedJobs);
      //setting jobs to have saved and applied keys
      setJobs(
        jobsResponse.data.map((job) => ({
          ...job,
          saved: fetchedJobs.some((savedJob) => savedJob._id === job._id),
          applied: appliedToJobs.includes(job._id),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedJobs(_id);
  }, [_id]);

  //this function renders the job cards on the page depending on their status
  const renderJobPosts = (status) => {
    //job cards are rendered in the saved column if they have not been applied to
    if (status === 'saved') {
      return savedJobs
        .filter((job) => job.applied === false)
        .map((job, index) => {
          return (
            <div
              key={job._id}
              onClick={() => {
                setJobIndex(index);
                setSelectedSavedJob(job);
                setIsModalOpen(true);
              }}
              className='job-card-container'
            >
              <JobCard
                jobTitle={job.jobTitle}
                businessID={job.businessID}
                location={job.location}
                jobCity={job.jobCity}
                jobState={job.jobState}
                saved={true}
                plainCard={false}
                fetchSavedJobs={fetchSavedJobs}
                getJobs={(id) => getJobs(id)}
                jobID={job._id}
                user={user}
              />
            </div>
          );
        });
    } else {
      //unsaved jobs are rendered here depending on the application status
      return jobs
        .filter((job) => job.applied === true) //filter for applied jobs
        .map((job, index) => {
          //for each job, check if there's an application for it and if the application status matches the status that's been passed in for rendering
          return applications.map((app) => {
            if (app.jobId === job._id && app.applicationStatus === status) {
              return (
                <div
                  key={job._id}
                  onClick={() => {
                    setJobIndex(index);
                    setSelectedSavedJob(job);
                    setIsModalOpen(true);
                  }}
                  className='job-card-container'
                >
                  <JobCard
                    jobTitle={job.jobTitle}
                    businessID={job.businessID}
                    location={job.location}
                    jobCity={job.jobCity}
                    jobState={job.jobState}
                    saved={true}
                    plainCard={true}
                    fetchSavedJobs={fetchSavedJobs}
                    getJobs={(id) => getJobs(id)}
                    jobID={job._id}
                    user={user}
                  />
                </div>
              );
            }
          });
        });
    }
  };

  //after a job has been applied to, set applied to true so that the button shows as 'applied' and fetch the jobs again to update the page
  const jobApplied = () => {
    selectedSavedJob.applied = true;
    fetchSavedJobs(_id);
  };

  const submitMessage = () => {
    toastSuccess('Application Submitted!');
  };

  return (
    <div className='dash-container'>
      <p className='dash-header'>My Jobs</p>
      <hr />
      <div className='job-board-container'>
        <div className='job-post-column'>
          <h3>Saved Jobs</h3>
          {renderJobPosts('saved')}
        </div>

        <div className='job-post-column'>
          <h3>Pending</h3>
          {renderJobPosts('pending')}
        </div>

        <div className='job-post-column'>
          <h3>Accepted</h3>
          {renderJobPosts('accepted')}
        </div>

        <div className='job-post-column'>
          <h3>Rejected</h3>
          {renderJobPosts('rejected')}
        </div>
      </div>
      {isModalOpen && selectedSavedJob && (
        <JobModal
          onCloseModal={() => setIsModalOpen(false)}
          jobTitle={selectedSavedJob.jobTitle}
          businessID={selectedSavedJob.businessID}
          location={selectedSavedJob.location}
          jobStreet={selectedSavedJob.jobStreet}
          jobCity={selectedSavedJob.jobCity}
          jobState={selectedSavedJob.jobState}
          jobZip={selectedSavedJob.jobZip}
          type={selectedSavedJob.type}
          start={selectedSavedJob.start}
          end={selectedSavedJob.end}
          description={selectedSavedJob.description}
          deadline={selectedSavedJob.deadline}
          skills={selectedSavedJob.skills}
          firstName={selectedSavedJob.firstName}
          lastName={selectedSavedJob.lastName}
          title={selectedSavedJob.title}
          email={selectedSavedJob.email}
          jobID={selectedSavedJob._id}
          savedJob={selectedSavedJob.saved}
          appliedJob={selectedSavedJob.applied}
          setIsAppModalOpen={setIsAppModalOpen}
          isJobBoard={true}
        />
      )}

      {isAppModalOpen && selectedSavedJob && (
        <AppModal
          isAppModalOpen={isAppModalOpen}
          closeAppModal={() => setIsAppModalOpen(false)}
          submitMessage={() => submitMessage()}
          user={user}
          jobTitle={selectedSavedJob.jobTitle}
          jobID={selectedSavedJob._id}
          businessID={selectedSavedJob.businessID}
          applied={() => jobApplied()}
        />
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default MyJobsStudent;

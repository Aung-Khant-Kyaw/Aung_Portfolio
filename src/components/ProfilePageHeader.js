import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/modals/JobSavedCard';
import PublicProfile from './PublicProfile';

function ProfilePageHeader({ user, userData, avatar}) {
	const [jobs, setJobs] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
  const [canEval, setCanEval] = useState(false);

  useEffect(() => {
    (async () => {
      if (userData.userType === 'student'){
        const jobIDs = userData.jobsHistory;
        const fetchedJobs = [];
        for await (const jobID of jobIDs){
          const jobResponse = await axios.get(`${process.env.REACT_APP_API}/api/jobs/${jobID}`);
            if (!jobResponse.data.error){
                fetchedJobs.push(jobResponse.data);
            }
        }
        fetchedJobs.sort((a,b) => {
          const temp = new Date(a.start).getTime();
          const temp2 = new Date(b.start).getTime();
  
          if (temp > temp2 ) {
            return -1;
          } else if (temp < temp2) {
            return 1;
          } else {
            return 0; 
          }
        });
        setJobs(fetchedJobs);
      }
    })();
  }, []);

	const renderJobPosts = () => {
		return jobs.map((job, index) => {
			return (
				<div key={job._id}
					onClick={() => {
					setSelectedJob(job);
					setIsModalOpen(true);
          // if the job is in progress, set eval to true
          const today = new Date().getTime();
          var jobStart;
          var jobEnd;
          if (job.end===undefined){
            jobStart = new Date(job.start);
            jobStart = jobStart.setMonth(jobStart.getMonth() + 3);
            jobEnd = new Date(jobStart);
            jobEnd = jobEnd.setDate(jobEnd.getDate() + 7);
          } else {
            jobStart = new Date(job.end);
            jobStart = jobStart.setDate(jobStart.getDate() - 7);
            jobEnd = new Date(job.end);
            jobEnd = jobEnd.setDate(jobEnd.getDate() + 7);
          }
          if (jobStart<= today && today <= jobEnd){
            setCanEval(true);
          } else {setCanEval(false)};
					}}
					className='job-history-card-wrapper'
				>
				<JobCard
					jobTitle={job.jobTitle}
					businessID={job.businessID}
					location={job.location}
					jobCity={job.jobCity}
					jobState={job.jobState}
					saved={true}
					jobID={job._id}
					user={user}
					start={job.start}
					end={job.end}
				/>
				</div>
			);
		});
	};

	return (
    /// -------------------  For User Profile ------------------- ///
    <div className="profile-header">
    <div className="profile-userpic">
      {user.userType === "student" && (
        <div className="profile-stud-school-info">
          {userData.institution}
        </div>
      )}
      <>
        <Avatar
          sx={{
            bgcolor: blue500,
            height: 100,
            width: 100,
          }}
          src={avatar}
        />
      </>

      <div className="profile-basic-info">
        {user.userType === "student" ? (
          <div className="profile-name">
            {userData.firstName} {userData.lastName}
          </div>
        ) : (
          <div className="profile-name">{userData.businessName}</div>
        )}

        {user.userType === "business" && (
          <div className="industry-type">
            <div className="industry-content">
              <div>
                {userData.companyIndustry
                  ? userData.companyIndustry
                  : `unset industry`}
              </div>
              <div className="num-employees">
                <FontAwesomeIcon icon={faUsers} />
                {userData.companySize
                  ? userData.companySize
                  : "1 to 9"}{" "}
                employees
              </div>
            </div>
          </div>
        )}

        {user.userType === "student" && (
          <div className="profile-gpa">
            <div className="gradyear">
              <FontAwesomeIcon icon={faGraduationCap} />{" "}
              {userData.gradYear}
            </div>
            <div className="gpa">
              <FontAwesomeIcon icon={faBook} /> {userData.gpa}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="profile-intro">
      <div className="profile-intro-wrapper">
        <div className="profile-intro-title">About</div>
        <div className="profile-intro-content">
          {user.userType === "student" ? (
            <>
              {userData.bio === "" ? (
                <div className="profile-intro-content-placeholder">
                  Edit your journey to introduce yourself...
                </div>
              ) : (
                userData.bio
              )}
            </>
          ) : (
            <>
              {userData.companyOverview === "" ? (
                <div className="profile-intro-content-placeholder">
                  Tell us about your company...
                </div>
              ) : (
                userData.companyOverview
              )}
            </>
          )}
        </div>
      </div>

      {user.userType === "student" && (
        <div className="profile-intro-wrapper">
          <div className="profile-intro-title">Jobs History</div>
          <div className="job-history-post-container">
            {renderJobPosts()}
          </div>
        </div>
      )}
    </div>
    {isModalOpen && selectedJob && (
            <PublicProfile
                  userID = {selectedJob.businessID}
                  currentUserID = {user._id}
                  onCloseModal={() => {setIsModalOpen(false); setCanEval(false)}}
                  jobPostID = {selectedJob._id}
                  uploadEvalPdf = {canEval}
                />
          )}
  </div>
  );
}
export default ProfilePageHeader;

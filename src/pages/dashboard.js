import { Component, useEffect, useState } from 'react';
import '../styles/dashboard.css';
import 'react-rater/lib/react-rater.css';
import UserProfile from '../components/UserProfile';
import Job from '../components/job/job';
import JobPostingWrapper from '../components/business/jobPostingWrapper';
import MyJobsStudent from '../components/job/myJobsStudent';
import JobSearch from '../components/job/jobSearch';
import useAuth from '../hooks/useAuth';

/**
 * This class provides the dashboard component to App.js
 * @class
 * @version 0.1
 * @see react
 * @see styles/dashboard.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see react-rater/lib/react-rater.css
 * @see Modules/PublicProfile
 * @see Modules/Job
 * @see Classes/MyJobsStudent
 * @see Classes/JobSearch
 * @see Classes/App
 */
const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('PUBLIC-PROFILE');
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);

  /**
   * This function gets the correct component for the current state of the dashboard.
   * Components include PublicProfile, Job, MyJobsStudent,
   * JobSearch.
   * @function
   * @returns {Component}
   * @see Modules/PublicProfile
   * @see Modules/Job
   * @see Classes/MyJobs
   * @see Classes/JobSearch
   */
  const getComponent = () => {
    switch (currentComponent) {
      case 'PUBLIC-PROFILE':
        return <UserProfile />;
      case 'MY-JOBS':
        return (
          <MyJobsStudent
            user={user}
            _id={user._id}
            savedJobs={savedJobs}
            setSavedJobs={setSavedJobs}
          />
        );
      case 'JOB-SEARCH':
        return (
          <JobSearch
            user={user}
            savedJobs={savedJobs}
            setSavedJobs={setSavedJobs}
            _id={user._id}
          />
        );
      case 'NEW-JOB':
        return (
          <JobPostingWrapper
            user={user}
            currentComponent={currentComponent}
            setCurrentComponent={setCurrentComponent}
          />
        );
      case 'JOBS-POSTED':
        return <Job user={user} />;
      case 'JOBS-APPLICATION':
        return <></>;
    }
  };

  return (
    <div>
      {user ? (
        <>
          {user.userType === 'student' || user.userType === 'Student' ? (
            <div className='dash-wrapper'>
              <div className='dash-content'>
                <form className='dash-options'>
                  <div className='dash-std-option-content'>
                    <div
                      className={`dash-std-component ${
                        currentComponent === 'PUBLIC-PROFILE'
                          ? 'dash-component-selected'
                          : ''
                      }`}
                      value='PUBLIC-PROFILE'
                      onClick={() => setCurrentComponent('PUBLIC-PROFILE')}
                    >
                      <p>Profile</p>
                    </div>
                    <div
                      className={`dash-std-component ${
                        currentComponent === 'MY-JOBS'
                          ? 'dash-component-selected'
                          : ''
                      }`}
                      value='MY-JOBS'
                      onClick={() => setCurrentComponent('MY-JOBS')}
                    >
                      <p>MY JOBS</p>
                    </div>
                    <div
                      className={`dash-std-component ${
                        currentComponent === 'JOB-SEARCH'
                          ? 'dash-component-selected'
                          : ''
                      }`}
                      value='JOB-SEARCH'
                      onClick={() => setCurrentComponent('JOB-SEARCH')}
                    >
                      <p>Job Search</p>
                    </div>
                  </div>
                </form>
                {currentComponent === 'PUBLIC-PROFILE' ? (
                  <div className='public-profile-wrapper'>{getComponent()}</div>
                ) : (
                  <div className='dash-main-component'>{getComponent()}</div>
                )}
              </div>
            </div>
          ) : (
            <>
              {user.userType === 'business' || user.userType === 'Business' ? (
                <div className='dash-wrapper'>
                  <div className='dash-content'>
                    <form className='dash-options'>
                      <div className='dash-option-content'>
                        <div
                          className={`dash-component ${
                            currentComponent === `PUBLIC-PROFILE`
                              ? `dash-component-selected`
                              : ``
                          }`}
                          value='PUBLIC-PROFILE'
                          onClick={() => setCurrentComponent('PUBLIC-PROFILE')}
                        >
                          <div>Profile</div>
                        </div>
                        <div
                          className={`dash-component ${
                            currentComponent === 'NEW-JOB'
                              ? 'dash-component-selected'
                              : ''
                          }`}
                          value='NEW-JOB'
                          onClick={() => setCurrentComponent('NEW-JOB')}
                        >
                          <div className='dash-business-title'>Post A Job</div>
                        </div>
                        <div
                          className={`dash-component ${
                            currentComponent === 'JOBS-POSTED'
                              ? 'dash-component-selected'
                              : ''
                          }`}
                          value='JOBS-POSTED'
                          onClick={() => setCurrentComponent('JOBS-POSTED')}
                        >
                          <div>My Jobs</div>
                        </div>
                        <div
                          className={`dash-component ${
                            currentComponent === 'JOBS-APPLICATIONS'
                              ? 'dash-component-selected'
                              : ''
                          }`}
                          value='JOBS-APPLICATIONS'
                          onClick={() =>
                            setCurrentComponent('JOBS-APPLICATIONS')
                          }
                        >
                          <div>Applications</div>
                        </div>
                      </div>
                    </form>

                    {currentComponent === 'PUBLIC-PROFILE' ? (
                      <div className='public-profile-wrapper'>
                        {getComponent()}
                      </div>
                    ) : (
                      <div className='dash-main-component'>
                        {getComponent()}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {user.userType === 'admin' ? (
                    <div>
                      <h1>ADMIN PAGE</h1>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div>No User Found</div>
      )}
    </div>
  );
};

export default Dashboard;

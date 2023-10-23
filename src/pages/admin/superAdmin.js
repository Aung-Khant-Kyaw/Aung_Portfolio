import '../../styles/admin.css';
import '../../styles/dashboard.css';
import 'react-rater/lib/react-rater.css';
import AdminReg from '../../components/admin/adminReg';
import StudentUserControl from '../../components/admin/studentUserControl';
import BusinessUserControl from '../../components/admin/businessUserControl';
import ApproveJobs from '../../components/admin/approveJobs';
import ApproveReviews from '../../components/admin/approveReviews';
import useAuth from '../../hooks/useAuth';
import { Component, useEffect, useState } from 'react';

/**
 * This class provides the super admin component to App.js
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
 * @see Classes/NewJobPosting
 * @see Classes/JobsAppliedTo
 * @see Classes/JobsSaved
 * @see Classes/JobSearch
 * @see Classes/ReviewsGiven
 * @see Classes/App
 */
const SuperAdmin = () => {
    const [currentComponent, setCurrentComponent] = useState('ADMIN-REG');
    const { user } = useAuth();

/**
   * This function gets the correct component for the current state of the dashboard.
   * Components include PublicProfile, Job, NewJobPosting, JobsAppliedTo, JobsSaved,
   * JobSearch, and ReviewsGiven.
   * @function
   * @returns {Component}
   * @see Modules/PublicProfile
   * @see Modules/Job
   * @see Classes/NewJobPosting
   * @see Classes/JobsAppliedTo
   * @see Classes/JobsSaved
   * @see Classes/JobSearch
   * @see Classes/ReviewsGiven
   */
const getComponent = () => {
        console.log(currentComponent)
        switch (currentComponent) {
        case 'ADMIN-REG':
            return <AdminReg />;
        case 'STUDENT-USER-CONTROL':
            return <StudentUserControl />;
        case 'BUSINESS-USER-CONTROL':
            return <BusinessUserControl />;
        case 'APPROVE-JOBS':
            return <ApproveJobs/>;
        case 'APPROVE-REVIEWS':
            return <ApproveReviews />
        };
};

    return (
        <div>
            {user ? (
                <>
                    {user.userType === 'superAdmin' ? (
                        <div className = 'dash-wrapper'>
                            <div className = 'dash-content'>
                                <form className = 'dash-options'>
                                    <div className = 'dash-std-option-content'>
                                        <div 
                                            className={`dash-std-component ${currentComponent === 'ADMIN-REG'
                                                ? 'dash-component-selected'
                                                : ''
                                                }`}
                                            value='ADMIN-REG'
                                            onClick={() => setCurrentComponent('ADMIN-REG')}
                                            >
                                            <p>Register Admins</p>
                                        </div>
                                        <div 
                                            className={`dash-std-component ${currentComponent === 'STUDENT-USER-CONTROL'
                                                ? 'dash-component-selected'
                                                : ''
                                                }`}
                                            value='STUDENT-USER-CONTROL'
                                            onClick={() => setCurrentComponent('STUDENT-USER-CONTROL')}
                                            >
                                            <p>Student Account Controls</p>
                                        </div>
                                        <div 
                                            className={`dash-std-component ${currentComponent === 'BUSINESS-USER-CONTROL'
                                                ? 'dash-component-selected'
                                                : ''
                                                }`}
                                            value='BUSINESS-USER-CONTROL'
                                            onClick={() => setCurrentComponent('BUSINESS-USER-CONTROL')}
                                            >
                                            <p>Business Account Controls</p>
                                        </div>
                                        <div 
                                            className={`dash-std-component ${currentComponent === 'APPROVE-JOBS'
                                                ? 'dash-component-selected'
                                                : ''
                                                }`}
                                            value='APPROVE-JOBS'
                                            onClick={() => setCurrentComponent('APPROVE-JOBS')}
                                            >
                                            <p>Review Job Postings</p>
                                        </div>
                                        <div 
                                            className={`dash-std-component ${currentComponent === 'APPROVE-REVIEWS'
                                                ? 'dash-component-selected'
                                                : ''
                                                }`}
                                            value='APPROVE-REVIEWS'
                                            onClick={() => setCurrentComponent('APPROVE-REVIEWS')}
                                            >
                                            <p>Approve Reviews</p>
                                        </div>
                                    </div>
                                </form>
                                {currentComponent === 'ADMIN-REG' ? (
                                    <div className='dash-main-component'>{getComponent()}</div>
                                ) : (
                                    <div className='dash-main-component'>{getComponent()}</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div> No User Found</div>
                    )}
                </>
            ) : (
                <div> No User Found</div>
            )}
        </div>
    );

};

export default SuperAdmin;

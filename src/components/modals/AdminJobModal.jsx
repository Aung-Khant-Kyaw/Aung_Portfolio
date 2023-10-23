import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import '../../styles/UserModal.css';
import '../../styles/addDocsModal.css';
import '../../styles/forms.css';
import {ReactComponent as JobCloseButton} from '../../styles/img/jobModalClose.svg'
import {ReactComponent as NextButton} from '../../styles/img/forwardButton.svg'
import {ReactComponent as PreviousButton} from '../../styles/img/previousButton.svg'

const JobModal = ({
	// info about the user
	selectedJob,
	onCloseModal,
    approveJob,
    denyJob,
}) => {
  // toggle for buttons 
  const [approveToggle, setApproveToggle] = useState();
  const [denyToggle, setDenyToggle] = useState();
  const [denyComment, setDenyComment] = useState('');
  const [nullComment, setNullComment] = useState();
  // openModal or not
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);

  const closeModal = () => {
	onCloseModal();
  };


  useEffect(() => {
    if (selectedJob.status === 'In-Review'){
        setApproveToggle(false);
        setDenyToggle(false);
    } else if (selectedJob.status === 'Approved'){
        setApproveToggle(true);
        setDenyToggle(false);
    } else if (selectedJob.status === 'Denied'){
        setApproveToggle(false);
        setDenyToggle(true);
    }
}, []);



  const denyClick = (e) => {
	e.stopPropagation();
	setIsDenyOpen(true);
  };

  const denyConfirm = (e) => {
	e.stopPropagation();
	if (denyComment === ''){
		setNullComment(true);
	} else {
		setNullComment(false);
		setIsDenyOpen(false);
		setDenyToggle(true);
		denyJob(denyComment);
		onCloseModal();
	}
  }

  const cancelDeny = (e) => {
	e.stopPropagation();
	setIsDenyOpen(false);
  }

  const handleDenyComment = (e) => {
	const {value} = e.target;
	setDenyComment(value);
}

  const approveClick = (e) => {
	e.stopPropagation();
    setIsApproveOpen(true);
}

const approveConfirm = (e) => {
	e.stopPropagation();
	setIsApproveOpen(false);
    setApproveToggle(true);
    approveJob();
	onCloseModal();
}

const cancelApprove = (e) => {
	e.stopPropagation();
	setIsApproveOpen(false);
}



  return (
	<div className='user-modal-container'>
	  <div className='user-modal-overlay' onClick={closeModal}>
		<div className="user-job-close">
		  <JobCloseButton className=""/>
		</div> 
	  </div>
	  <div className='user-modal-wrapper'>
		<div className= 'user-main-info'>
		  <div className='user-left'>
			<div className='business'> 
			  <div className='user-business-info'>
				<div className='user-business-title'> {selectedJob.jobTitle} </div>
				<div> Status: {selectedJob.status}</div>
			  </div>
			</div>
		  </div>
		  <div className='user-right'>
				<div>
				{approveToggle ? (
					<button className='apply-button button-back' type='button'>
					Approved
					</button>
				) : (
					<button onClick={(e) => approveClick(e)} className='apply-button button-back' type='button'>
					Approve Job
					</button>
				)}
				</div>

				{ isApproveOpen ? (
					<div className='user-modal-container'>
						<div className = 'approve-confirmation'>
							<div className='delete-title'> Are you sure you want to approve this job posting?</div>
							<div className='user-right'>
								<button onClick={(e) => approveConfirm(e)} className='apply-button button-back' type='button'>
									Approve Job 
								</button>
								<button onClick={(e) => cancelApprove(e)} className='apply-button button-back' type='button'>
									Cancel 
								</button>
							</div>
						</div>
					</div>
				):(<></>)}

				<div>
				{denyToggle ? (
					<button className='button-back' type='button'>
					Denied
					</button>
				) : (
					<button onClick={(e) => denyClick(e)} className='button-back' type='button'>
					Deny Job
					</button>
				)}
				</div>
                { isDenyOpen ? (
					<div className='user-modal-container'>
						<div className = 'deny-confirmation'>
							<div className='delete-title'> Are you sure you want to deny this job posting?</div>
							<textarea
                                    className='denyComment'
                                    type="text"
									rows='5'
									required
                                    placeholder="If denied, explain why to Business User."
                                    onChange={handleDenyComment}
                                />
								{
									(nullComment) ? (
										<p className='error-message'
												style={{ color: 'red' }}>
													Please comment before denying!
												</p>
									):(<></>)}
							<div className='user-right'>
								<button onClick={(e) => denyConfirm(e)} className='apply-button button-back' type='button'>
									Deny Job 
								</button>
								<button onClick={(e) => cancelDeny(e)} className='apply-button button-back' type='button'>
									Cancel 
								</button>
							</div>
						</div>
					</div>
				):(<></>)}
		</div>
		</div>
        <div className='info-wrapper'>
			<p className='otherInfo'>Archived by Business: {selectedJob.archived.toString()}</p>
			<p className='otherInfo'>Address: {selectedJob.jobStreet} {selectedJob.jobCity}, {selectedJob.jobState} , {selectedJob.jobZip}</p>
			<p className='otherInfo'>Type: {selectedJob.type}</p>
			<p className='otherInfo'>Duration: {selectedJob.start} - {selectedJob.end}</p>
			<p className='otherInfo'>Application Deadline: {selectedJob.deadline} </p>
			<p className='otherInfo'>Skills: {selectedJob.skills} </p>
			<br></br>
			<p className='otherInfo'>Description: <br /> {selectedJob.description} </p>
			<br></br>
			<p className='otherInfo'>Point of Contact: <br/></p>
			<p className='otherInfo'>Name: {selectedJob.firstName} {selectedJob.lastName}</p>
			<p className='otherInfo'>Title: {selectedJob.title}</p>
			<p className='otherInfo'>Email: {selectedJob.email}</p>
        </div>
	  </div>
	  <ToastContainer position='bottom-right' hideProgressBar={false} />
	</div>
  );
};

export default JobModal;

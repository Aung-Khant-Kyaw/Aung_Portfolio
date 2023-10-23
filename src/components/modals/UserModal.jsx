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

const UserModal = ({
	// info about the user
	selectedUser,
	onCloseModal,
	deleteUser,
	lockUser,
	unlockUser,
	archiveUser,
	resetPass,
}) => {
  const [avatar, setAvatar] = useState('');
  // toggle for buttons 
  const [deleteToggle, setDeleteToggle] = useState();
  const [lockToggle, setLockToggle] = useState();
  const [archiveToggle, setArchiveToggle] = useState();
  const [resetToggle, setResetToggle] = useState();
  // openModal or not
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
	onCloseModal();
  };


  useEffect(() => {
	setAvatar(`profile_images/${selectedUser.avatar}`);
	setLockToggle(selectedUser.locked);
	setArchiveToggle(selectedUser.archived);
	setResetToggle(true);
	setDeleteToggle(true);
}, []);



  const deleteClick = (e) => {
	e.stopPropagation();
	setIsOpen(true);
  };

  const deleteConfirm = (e) => {
	e.stopPropagation();
	setDeleteToggle(false);
	deleteUser();
  }

  const cancelDelete = (e) => {
	e.stopPropagation();
	setIsOpen(false);
  }

  const lockClick = (e) => {
	e.stopPropagation();
	if (lockToggle){
		// lockToggle = true means admin just lock the user
		unlockUser();
		setLockToggle(false);
	} else {
		// lockToggle = false means admin just unlock the yser
		lockUser();
		setLockToggle(true);
	};
}

  const archiveClick = (e) => {
	e.stopPropagation();
	archiveUser();
	setArchiveToggle(true);
  };

  const resetClick = (e) => {
	e.stopPropagation();
	resetPass();
	setResetToggle(false);
  };

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
			  <Avatar 
				sx={{
				  bgcolor: blue500,
				  height: 50,
				  width: 50,
				}}
				src={avatar}
			  />  
			  <div className='user-business-info'>
				<div className='user-business-title'> {selectedUser.username} </div>
				<div> {selectedUser.email}</div>
			  </div>
			</div>
		  </div>
		  <div className='user-right'>
			<div> 
				<div>
				{lockToggle ? (
					<button onClick={(e) => lockClick(e)} className='apply-button button-back' type='button'>
					Unlock user
					</button>
				) : (
					<button onClick={(e) => lockClick(e)} className='apply-button button-back' type='button'>
					Lock User
					</button>
				)}
				</div>

				<div>
				{!archiveToggle ? (
					<button onClick={(e) => archiveClick(e)} className='button-back' type='button'>
					Archive User
					</button>
				) : (
					<button className='button-back' type='button'>
					Archived
					</button>
				)}
				</div>
			</div>
			<div>
				<div>
				{deleteToggle ? (
					<button onClick={(e) => deleteClick(e)} className='apply-button button-back' type='button'>
					Delete User
					</button>
				) : (
					<button className='apply-button button-back' type='button'>
					Deleted
					</button>
				)}
				</div>
				{ isOpen ? (
					<div className='user-modal-container'>
						<div className = 'delete-confirmation'>
							<div className='delete-title'> Are you sure to delete this user?</div>
							<div className='user-right'>
								<button onClick={(e) => deleteConfirm(e)} className='apply-button button-back' type='button'>
									Delete 
								</button>
								<button onClick={(e) => cancelDelete(e)} className='apply-button button-back' type='button'>
									Cancel 
								</button>
							</div>
						</div>
					</div>
				):(<></>)}

				<div>
				{resetToggle ? (
					<button onClick={(e) => resetClick(e)} className='button-back' type='button'>
					Reset Password
					</button>
				) : (
					<button className='button-back' type='button'>
					Resetting Done
					</button>
				)}
				</div>
			</div>

		  </div>
		</div>
		<div className='user-info-wrapper'>
		{selectedUser.userType === 'student' || selectedUser.userType === 'Student' ? (
			<>
				<p className='otherInfo'>Current Status: {selectedUser.status}</p>
				<p className='otherInfo'>Name: {selectedUser.lastName} {selectedUser.firstName}</p>
				<p className='otherInfo'>Address: {selectedUser.addressStreet} {selectedUser.addressStreet2}, {selectedUser.addressCity}, {selectedUser.addressState}, {selectedUser.addressZip}</p>
				<p className='otherInfo'>Phone: {selectedUser.userPhoneNumber}</p>
				<p className='otherInfo'>Institution: {selectedUser.institution} </p>
				<p className='otherInfo'>Graduation Year: {selectedUser.gradYear} </p>
				<p className='otherInfo'>GPA: {selectedUser.gpa} </p>
				<p className='otherInfo'>Biography: {selectedUser.bio} </p>
				<p className='otherInfo'>Link to Portfolio: {selectedUser.linkPortfolio}</p>
				<p className='otherInfo'>Link to LinkedIn: {selectedUser.linkLinkedIn}</p>
				<p className='otherInfo'>Link to Twitter: {selectedUser.linkTwitter}</p>
				<p className='otherInfo'>Other Link: {selectedUser.linkOther}</p>
			</>
		) : (
			<>
				<p className='otherInfo'>Current Status: {selectedUser.status}</p>
				<p className='otherInfo'>Business Name: {selectedUser.businessName}</p>
				<p className='otherInfo'>Business Division: {selectedUser.businessDivision}</p>
				<p className='otherInfo'>Point Of Contact: {selectedUser.poc}</p>
				<p className='otherInfo'>Address: {selectedUser.businessStreet} {selectedUser.businessStreet2}, {selectedUser.businessCity}, {selectedUser.businessState}, {selectedUser.businessZip}</p>
				<p className='otherInfo'>Phone: {selectedUser.userPhoneNumber}</p>
				<p className='otherInfo'>Company Industry: {selectedUser.companyIndustry} </p>
				<p className='otherInfo'>Company Size: {selectedUser.companySize} </p>
				<p className='otherInfo'>Company Overview: {selectedUser.overview} </p>
				<p className='otherInfo'>Rating: {selectedUser.rating} </p>
				<p className='otherInfo'>Link to Company: {selectedUser.linkCompany}</p>
				<p className='otherInfo'>Link to LinkedIn: {selectedUser.linkLinkedIn}</p>
				<p className='otherInfo'>Link to Twitter: {selectedUser.linkTwitter}</p>
				<p className='otherInfo'>Other Link: {selectedUser.linkOther}</p>
			</>
		)}
		</div>
	  </div>
	  <ToastContainer position='bottom-right' hideProgressBar={false} />
	</div>
  );
};

export default UserModal;

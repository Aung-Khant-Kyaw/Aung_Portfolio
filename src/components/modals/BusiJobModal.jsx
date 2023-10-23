import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsPencilSquare } from 'react-icons/bs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/UserModal.css';
import { ReactComponent as JobCloseButton } from '../../styles/img/jobModalClose.svg';
import { usStates } from '../../utils/constants';
import Datepicker from 'react-datepicker';
import SubmitJob from './SubmitJob';
import {
	validateJobTitle,
	validateLocation,
	validateJobStreet,
	validateJobState,
	validateJobCity,
	validateJobZip,
	validateJobType,
	validateStartDate,
	validateDeadline,
	validateSkills,
	validateDescription,
	validateFirstName,
	validateLastName,
	validateTitle,
	validateEmail,
} from '../../utils/fieldValidation'
import PublicProfile from '../PublicProfile';

const JobModal = ({
	selectedJob,
	onCloseModal,
	userID,
	onUpdateJob,
	setCurrentComponent
}) => {
	const [internArr, setInternArr] = useState([]);
	const [selectedIntern, setSelectedIntern] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [canEval, setCanEval] = useState(false);

	const [updatedJobData, setUpdatedJobData] = useState(selectedJob || {
		jobID: "",
		jobTitle: "",
		location: "",
		jobStreet: "",
		jobState: "",
		jobCity: "",
		jobZip: "",
		type: "",
		start: "",
		end: "",
		deadline: "",
		skills: "",
		description: "",
		firstName: "",
		lastName: "",
		title: "",
		email: "",
	});
	const [updateStatus, setUpdateStatus] = useState(null);
	const [showUpdatedData, setShowUpdatedData] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [errorsObject, setErrorsObject] = useState({});
	const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel('Request canceled due to component unmount');
    };
  }, [source]);

	const handleFieldChange = (e) => {
		const { name, value } = e.target;
		const errObjectCopy = { ...errorsObject };
		let errorMessage = '';
		switch (name) {
			case 'jobTitle':
				errorMessage = validateJobTitle(value);
				break;
			case 'location':
				errorMessage = validateLocation(value);
				break;
			case 'jobStreet':
				errorMessage = validateJobStreet(value);
				break;
			case 'jobState':
				errorMessage = validateJobState(value);
				break;
			case 'jobCity':
				errorMessage = validateJobCity(value);
				break;
			case 'jobZip':
				errorMessage = validateJobZip(value);
				break;
			case 'type':
				errorMessage = validateJobType(value);
				break;
			case 'start':
				errorMessage = validateStartDate(value);
				break;
			case 'deadline':
				errorMessage = validateDeadline(value);
				break;
			case 'skills':
				errorMessage = validateSkills(value);
				break;
			case 'description':
				errorMessage = validateDescription(value);
				break;
			case 'firstName':
				errorMessage = validateFirstName(value);
				break;
			case 'lastName':
				errorMessage = validateLastName(value);
				break;
			case 'title':
				errorMessage = validateTitle(value);
				break;
			case 'email':
				errorMessage = validateEmail(value);
				break;
			default:
				break;
		}
		if (errorMessage !== "") {
			console.log(`Validation error for ${name}: ${errorMessage}`);
			errObjectCopy[name] = errorMessage;
		} else if (errObjectCopy.hasOwnProperty(name)) {

			delete errObjectCopy[name]

		}
		setErrorsObject(errObjectCopy);
		setUpdatedJobData({
			...updatedJobData,
			[name]: value,
		});
	};

	const renderError = (fieldName) => {
		if (errorsObject[fieldName]) {
			return <div className="error-message">{errorsObject[fieldName]}</div>;
		}
		return null;
	};


	const handleSave = async () => {
		if (Object.keys(errorsObject).length === 0) {
			try {
				const updatedData = {
					jobID: updatedJobData._id, jobTitle: updatedJobData.jobTitle,
					location: updatedJobData.location, jobStreet: updatedJobData.jobStreet,
					jobCity: updatedJobData.jobCity, jobState: updatedJobData.jobState, jobZip: updatedJobData.jobZip,
					type: updatedJobData.type, start: updatedJobData.start,
					end: updatedJobData.end, deadline: updatedJobData.deadline,
					skills: updatedJobData.skills, description: updatedJobData.description,
					firstName: updatedJobData.firstName, lastName: updatedJobData.lastName,
					title: updatedJobData.title, email: updatedJobData.email
				};
				const response = await axios.put(`${process.env.REACT_APP_API}/api/jobs/update/${updatedJobData._id}`, updatedData,
				{ cancelToken: source.token });
				setShowUpdatedData(false);
				onUpdateJob(updatedJobData);
				closeModal();
				setIsOpen(true);
			} catch (error) {
				if (axios.isCancel(error)) {
				  }
				setUpdateStatus('Error updating job');
				console.error('Error updating job:', error);
			}
		} else {
			toast.error('Please correct invalid fields. ');
		}
	};
	const handleCancel = () => {
		setUpdatedJobData(selectedJob);
		setShowUpdatedData(false);
	};
	const closeModal = () => {
		onCloseModal();
	};
  useEffect(() => {
    (async () => {
		const studentIDs = selectedJob.interns;
        const fetchedUsers = [];
        for await (const studentID of studentIDs){
			const res = await axios.get(`${process.env.REACT_APP_API}/api/users/${studentID}`);
            if (!res.data.error){
                fetchedUsers.push(res.data);
            }
        }
        setInternArr(fetchedUsers);
    })();
  }, []);

  const renderInterns = () => {
	return internArr.map((intern, index) => {
		return (
			<div key={intern._id}
				onClick={() => {
					setSelectedIntern(intern);
					setIsModalOpen(true);
					// if the job is in progress, set eval to true
					const today = new Date().getTime();
					var jobStart;
					var jobEnd;
					if (selectedJob.end===undefined){
						jobStart = new Date(selectedJob.start);
						jobStart = jobStart.setMonth(jobStart.getMonth() + 3);
						jobEnd = new Date(jobStart);
						jobEnd = jobEnd.setDate(jobEnd.getDate() + 7);
					} else {
						jobStart = new Date(selectedJob.end);
						jobStart = jobStart.setDate(jobStart.getDate() - 7);
						jobEnd = new Date(selectedJob.end);
						jobEnd = jobEnd.setDate(jobEnd.getDate() + 7);
					}
					if (jobStart<= today && today <= jobEnd){
						setCanEval(true);
					} else {setCanEval(false)};
					}}
					className='user-card-wrapper'
			>
				<div className='full'>
					<div className='job-title-full'> {intern.firstName} {intern.lastName} (Email: {intern.email}) </div>
				</div>
			</div>
		)
	})
  }


	return (
		<div className='user-modal-container'>
			<div className='user-modal-overlay' onClick={closeModal}>
				<div className="user-job-close">
					<JobCloseButton className="small" />
				</div>
			</div>
			<div className={`user-modal-wrapper ${showUpdatedData ? 'edit-mode' : ''}`}>
				<div className='user-main-info'>
					<div className={`user-left ${showUpdatedData ? 'editing-mode' : ''}`}>

						<div className='business'>
							<div className='user-business-info'>
								<div className='user-business-title'>
									{showUpdatedData ? (
										<div className='jobtitle'>
											<input
												type="text"
												name="jobTitle"
												value={updatedJobData.jobTitle || ""}
												onChange={handleFieldChange}
											/>
											{renderError("jobTitle")}
										</div>
									) : (
										selectedJob.jobTitle
									)}
								</div>
								<div className='busAdmin'> Status: {selectedJob.status}</div>
								<div className='busAdmin'> Archived: {selectedJob.archived.toString()}</div>
							</div>
						</div>
						{!showUpdatedData && (
							<div className='edit-job' onClick={() => setShowUpdatedData(true)}>
								<IconContext.Provider
									value={{
										size: '3vh',
										style: {
											color: '#26506c',
											transition: 'ease-in-out 0.3s',
											display: 'block',
											textAlign: 'center',
										},
									}}
								>
									<BsPencilSquare />
									Edit
								</IconContext.Provider>
							</div>
						)}
					</div>
				</div>
				<div className={`info-wrapper ${showUpdatedData ? 'edit-mode' : ''}`}>
					<div className='otherInfo'>
						<div className='editBusInfo'>Location:</div>
						{showUpdatedData ? (
							<div className='form-group'>
								<select
									id="location"
									name="location"
									value={updatedJobData.location || ""}
									onChange={handleFieldChange}
								>

									<option value="">Select One</option>
									<option value="Remote">Remote</option>
									<option value="Hybrid">Hybrid</option>
									<option value="On-Site">On-Site</option>
								</select>
								{renderError("location")}
							</div>

						) : (
							selectedJob.location
						)}
					</div>
					<div className='otherInfo'>
						<div className='otherInfoHeader'>Address:</div>
						{showUpdatedData ? (
							<div className='form-group'>
								<div className='editBusInfo'>Street:</div>
								<input
									type="text"
									id="jobStreet"
									name="jobStreet"
									value={updatedJobData.jobStreet || ""}
									onChange={handleFieldChange}
								/>
								{renderError("jobStreet")}
								<div className='editBusInfo'>City:</div>
								<input
									type="text"
									id="jobCity"
									name="jobCity"
									value={updatedJobData.jobCity || ""}
									onChange={handleFieldChange}
								/>
								{renderError("jobCity")}
								<div className='editBusInfo'>State:</div>
								<select
									id="jobState"
									name="jobState"
									value={updatedJobData.jobState || ""}
									onChange={handleFieldChange}
								>
									<option value="">Select One</option>
									{Object.entries(usStates).map(([abbreviation, stateName]) => (
										<option key={abbreviation} value={stateName}>
											{stateName}
										</option>
									))}
								</select>
								{renderError("jobState")}
								<div className='editBusInfo'>Zip:</div>
								<input
									type="text"
									id="jobZip"
									name="jobZip"
									value={updatedJobData.jobZip || ""}
									onChange={handleFieldChange}
								/>
								{renderError("jobZip")}
							</div>
						) : (
							`${selectedJob.jobStreet} ${selectedJob.jobCity}, ${selectedJob.jobState}, ${selectedJob.jobZip}`
						)}
					</div>

					<div className='otherInfo'>
						<div className='editBusInfo'>Job Type:</div>
						{showUpdatedData ? (
							<div className='form-group'>
								<select
									name="type"
									value={updatedJobData.type || ""}
									onChange={handleFieldChange}
								>
									<option value="">Select One</option>
									<option value="Full-Time">Full-Time</option>
									<option value="Part-Time">Part-Time</option>
									<option value="Other">Other</option>
								</select>
								{renderError("type")}
							</div>
						) : (
							selectedJob.type
						)}
					</div>

					<div className='otherInfo'>
						<div className='editBusInfo'>Start Date:</div>
						{showUpdatedData ? (
							<div>
								<Datepicker
									selected={updatedJobData.start ? new Date(updatedJobData.start) : null}
									selectsStart
									startDate={updatedJobData.start ? new Date(updatedJobData.start) : null}
									endDate={updatedJobData.end ? new Date(updatedJobData.end) : null}
									minDate={new Date()}
									onChange={(date) => {
										handleFieldChange({
											target: {
												name: "start",
												value: date ? date.toISOString() : null,
											}
										})
									}}
								/>
								{renderError("start")}
							</div>
						) : (
							selectedJob.start
						)}
					</div>


					<div className='otherInfo'>
						<div className='editBusInfo'>End Date:</div>
						{showUpdatedData ? (
							<div>
								<Datepicker
									selected={updatedJobData.end ? new Date(updatedJobData.end) : null}
									selectsEnd
									startDate={updatedJobData.start ? new Date(updatedJobData.start) : null}
									endDate={updatedJobData.end ? new Date(updatedJobData.end) : null}
									minDate={updatedJobData.start ? new Date(updatedJobData.start) : null}
									onChange={(date) => {
										setUpdatedJobData({
											...updatedJobData,
											end: date ? date.toISOString() : null,
										});
									}}
								/>
							</div>
						) : (
							selectedJob.end
						)}
					</div>


					<div className='otherInfo'>
						<div className='editBusInfo'>Application Deadline:</div>
						{showUpdatedData ? (
							<div>
								<Datepicker
									showTimeSelect
									selected={updatedJobData.deadline ? new Date(updatedJobData.deadline) : null}
									minDate={new Date()}
									onChange={(date) => {
										handleFieldChange({
											target: {
												name: "deadline",
												value: date ? date.toISOString() : null,
											}
										})
									}}
								/>
								{renderError("deadline")}
							</div>
						) : (
							selectedJob.deadline
						)}
					</div>

					<div className='otherInfo'>
						<div className='editBusInfo'>Skills:</div>
						{showUpdatedData ? (
							<div>
								<textarea
									type="text"
									name="skills"
									value={updatedJobData.skills || ""}
									onChange={handleFieldChange}
									rows={6}
									cols={40}
								/>
								{renderError("skills")}
							</div>
						) : (
							selectedJob.skills
						)}
					</div>
					<div className='otherInfo'>
						<div className='editBusInfo'>Description:</div>
						{showUpdatedData ? (
							<div>
								<textarea
									name="description"
									value={updatedJobData.description || ""}
									onChange={handleFieldChange}
									rows={6}
									cols={40}
								/>
								{renderError("description")}
							</div>
						) : (
							selectedJob.description
						)}
					</div>
					<div className='otherInfo'>
						<div className='otherInfoHeader'>Point of Contact</div>
						<div className='otherInfo'>
							<div className='editBusInfo'>Name:</div>
							{showUpdatedData ? (
								<div>
									<input
										type="text"
										name="firstName"
										value={updatedJobData.firstName || ""}
										onChange={handleFieldChange}
									/>
									{renderError("firstName")}
								</div>
							) : (
								selectedJob.firstName
							)}{" "}
							{showUpdatedData ? (
								<div>
									<input
										type="text"
										name="lastName"
										value={updatedJobData.lastName || ""}
										onChange={handleFieldChange}
									/>
									{renderError("lastName")}
								</div>
							) : (
								selectedJob.lastName
							)}
						</div>
						<div className='otherInfo'>
							<div className='editBusInfo'>Title:</div>
							{showUpdatedData ? (
								<div>
									<input
										type="text"
										name="title"
										value={updatedJobData.title || ""}
										onChange={handleFieldChange}
									/>
									{renderError("title")}
								</div>
							) : (
								selectedJob.title
							)}
						</div>
						<div className='otherInfo'>
							<div className='editBusInfo'>Email:</div>
							{showUpdatedData ? (
								<div>
									<input
										type="text"
										name="email"
										value={updatedJobData.email || ""}
										onChange={handleFieldChange}
									/>
									{errorsObject.email && (
										<div className="error-message">{errorsObject.email}</div>
									)}
								</div>
							) : (
								selectedJob.email
							)}
						</div>
					</div>
					<br/>
					<div className='user-business-title'> Interns for this position. </div>
					{renderInterns()}
				</div>
				{showUpdatedData && (
					<div className="save-button-container">
						<button type="button" onClick={handleSave}>
							Save
						</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				)}
			</div>
			<SubmitJob
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setCurrentComponent={setCurrentComponent}
			/>
			{isModalOpen && selectedIntern && (
            <PublicProfile
                  userID = {selectedIntern._id}
                  currentUserID = {userID}
                  onCloseModal={() => {setIsModalOpen(false); setCanEval(false)}}
                  jobPostID = {selectedJob._id}
                  uploadEvalPdf = {canEval}
                />
          )}
			<ToastContainer position='bottom-right' hideProgressBar={false} />
		</div>
	);
};

export default JobModal;

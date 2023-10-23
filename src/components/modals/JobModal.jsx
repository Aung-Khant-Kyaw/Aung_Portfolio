import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import '../../styles/JobModal.css';
import '../../styles/jobCard.css';
import '../../styles/addDocsModal.css';
import '../../styles/forms.css';
import { ReactComponent as SaveButton } from '../../styles/img/bookmark.svg';
import { ReactComponent as SolidSaveButton } from '../../styles/img/solidBookmark.svg';
import { ReactComponent as JobCloseButton } from '../../styles/img/jobModalClose.svg';
import { ReactComponent as NextButton } from '../../styles/img/forwardButton.svg';
import { ReactComponent as PreviousButton } from '../../styles/img/previousButton.svg';

const JobModal = ({
  onCloseModal,
  jobTitle,
  businessID,
  location,
  jobStreet,
  jobState,
  jobCity,
  jobZip,
  type,
  start,
  end,
  description,
  deadline,
  skills,
  firstName,
  lastName,
  title,
  email,
  nextJob,
  previousJob,
  appliedJob,
  setIsAppModalOpen,
  isJobBoard,
}) => {
  const [avatar, setAvatar] = useState('');
  const [businessName, setBusinessName] = useState('');
  // set saved should depends whether job is saved or not initially
  const [saved, setSaved] = useState(true);
  const [isApplied, setIsApplied] = useState(appliedJob);

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    onCloseModal();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/users/busicard/${businessID}`
        );
        setAvatar(`profile_images/${res.data.avatar}`);
        setBusinessName(res.data.businessName);
      } catch {
        console.log('Error getting BusinessName and its avatar from API');
      }
    })();
  }, []);

  // const saveClick = (e) => {
  // e.stopPropagation();
  // if (saved){
  //     // saved = true means user just saved the job post
  //     saveJob();
  //     setSaved(false);
  // } else {
  //     // saved = false means user just unsaved the job post
  //     unsaveJob();
  //     setSaved(true);
  // }
  // };

  const applyClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    onCloseModal();
    setIsAppModalOpen(true);
  };

  return (
    <div className='modal-container'>
      <div className='modal-overlay' onClick={closeModal}>
        <div className='job-close'>
          <JobCloseButton className='' />
        </div>
      </div>
      {!isJobBoard && (
        <div onClick={previousJob}>
          <PreviousButton className='previous-button' />
        </div>
      )}
      <div className='modal-wrapper'>
        <div className='main-info'>
          <div className='left'>
            <div className='business-title'> {jobTitle} </div>
            <div className='business'>
              <Avatar
                sx={{
                  bgcolor: blue500,
                  height: 50,
                  width: 50,
                }}
                src={avatar}
              />
              <div className='business-info'>
                <div> {businessName}</div>
                <div>{location}</div>
              </div>
            </div>
          </div>
          <div className='right'>
            <br />
            <br />
            {/* <div onClick={(e) => saveClick(e)}>
              {saved ? (
                <SaveButton className='button'/>
              ) : (
                <SolidSaveButton className='button'/>
              )}
            </div> */}
            <div>
              {!appliedJob ? (
                <button
                  onClick={(e) => applyClick(e)}
                  className='apply-button'
                  type='button'
                >
                  Apply Now
                </button>
              ) : (
                <button className='applied-button' type='button'>
                  Applied
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='info-wrapper'>
          <p className='otherInfo'>
            Address: {jobStreet} {jobCity}, {jobState} , {jobZip}
          </p>
          <p className='otherInfo'>Type: {type}</p>
          <p className='otherInfo'>
            Duration: {start} - {end}
          </p>
          <p className='otherInfo'>Application Deadline: {deadline} </p>
          <p className='otherInfo'>Skills: {skills} </p>
          <br></br>
          <p className='otherInfo'>
            Description: <br /> {description}{' '}
          </p>
          <br></br>
          <p className='otherInfo'>
            Point of Contact: <br />
          </p>
          <p className='otherInfo'>
            Name: {firstName} {lastName}
          </p>
          <p className='otherInfo'>Title: {title}</p>
          <p className='otherInfo'>Email: {email}</p>
          {/* <div className='showmore-wrapper'>
            <button className='showmore-button'>
                <span> Show More</span>
            </button>
          </div> */}
        </div>
      </div>
      {!isJobBoard && (
        <div onClick={nextJob}>
          <NextButton className='next-button' />
        </div>
      )}
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

// return (
//   <div className='modal-container'>
//     <div className='modal-overlay' onClick={closeModal}></div>
//     <div className='modal-wrapper'>
//       <div className='modal-header'>Job Details</div>
//       <div className='job-info'>
//         <div className='job-title'>Job Title: {jobTitle}</div>
//         <div className='job-location'>Location: {location}</div>
//         <div className='Address'>Address: {jobStreet} {jobCity} {jobState}, {jobZip}</div>
//         <div className='job-type'>Type: {type}</div>
//       </div>
//       <div className='job-description'> Description:{description}</div>
//       <div className='job-details'>
//         <div className='job-deadline'>Deadline: {deadline}</div>
//         <div className='job-skills'>Skills: {skills}</div>
//       </div>
//       <div className='contact-details'>
//         <div className='contact-name'>
//           Contact Name: {firstName} {lastName}
//         </div>
//         <div className='contact-title'>Contact Title: {title}</div>
//         <div className='contact-email'>Contact Email: {email}</div>
//       </div>
//       <div className='btn-wrapper'>
//         <div className='close-btn' onClick={closeModal}>
//           Close
//         </div>
//       </div>
//     </div>
//     <ToastContainer position='bottom-right' hideProgressBar={false} />
//   </div>
// );

export default JobModal;

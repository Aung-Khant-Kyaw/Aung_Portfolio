import { useEffect, useState, createContext, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import axios from 'axios';
import '../../styles/jobCard.css';
import { ReactComponent as SaveButton } from '../../styles/img/bookmark.svg';
import { ReactComponent as SolidSaveButton } from '../../styles/img/solidBookmark.svg';

const JobCard = ({
  jobTitle,
  businessID,
  location,
  jobCity,
  jobState,
  jobID,
  saved: initialSaved,
  user,
  getJobs,
}) => {
  const [avatar, setAvatar] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(initialSaved);

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

  const saveJob = async (user, jobID) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/jobs/save/${user._id}/${jobID}`
      );
      const jobResponse = await axios.get(
        `${process.env.REACT_APP_API}/api/jobs/${jobID}`
      );
      setSavedJobs([...savedJobs, jobResponse.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const unsaveJob = async (user, jobID) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/jobs/unsave/${user._id}/${jobID}`
      );
      setSavedJobs(savedJobs.filter((savedJobID) => savedJobID !== jobID));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSave = async (e, jobID) => {
    e.stopPropagation();
    if (isSaved) {
      try {
        await unsaveJob(user, jobID);
        setIsSaved(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await saveJob(user, jobID);
        setIsSaved(true);
        getJobs(user._id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='card-container'>
      <div className='left'>
        <div className='job_title'> {jobTitle} </div>
        <div className='business'>
          <Avatar
            sx={{
              bgcolor: blue500,
              height: 50,
              width: 50,
            }}
            src={avatar}
          />
          <div className='cardInfo'>
            <div> {businessName}</div>
            <div>
              {' '}
              {jobCity}, {jobState} ({location})
            </div>
          </div>
        </div>
      </div>
      <div onClick={(e) => toggleSave(e, jobID)}>
        {isSaved ? (
          <SolidSaveButton className='button' />
        ) : (
          <SaveButton className='button' />
        )}
      </div>
    </div>
  );
};

export default JobCard;

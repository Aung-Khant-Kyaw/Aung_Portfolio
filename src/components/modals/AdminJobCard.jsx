import { useEffect, useState, createContext, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import axios from 'axios';
import '../../styles/jobCard.css';
import { ReactComponent as SaveButton } from '../../styles/img/bookmark.svg'
import { ReactComponent as SolidSaveButton } from '../../styles/img/solidBookmark.svg'

const JobCard = ({
  jobTitle,
  businessID,
  location,
  jobCity,
  jobState,
  jobStatus
}) => {

  const [avatar, setAvatar] = useState('');
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/users/busicard/${businessID}`);
        setAvatar(`profile_images/${res.data.avatar}`);
        setBusinessName(res.data.businessName);
      } catch {
        console.log("Error getting BusinessName and its avatar from API")
      }
    })();
  }, []);

  return (
    <div className='card-container'>
      <div className='left'>
        <div className='job_title'> {jobTitle}</div>
        <div className='job_title'>(Status: {jobStatus})</div>
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
            <div> {jobCity}, {jobState} ({location})</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

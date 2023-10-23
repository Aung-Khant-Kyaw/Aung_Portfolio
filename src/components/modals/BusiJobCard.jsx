import { useEffect, useState, createContext, useContext} from 'react';
import '../../styles/jobCard.css';

const JobCard = ({
    jobID,
    jobTitle,
    location,
    jobStatus,
    jobArchived,
    handleArchivedClick,
    handleUnarchivedClick,
}) => {
    const [archived, setArchived] = useState(jobArchived);

    const handleButton = async (e) => {
        e.stopPropagation();
        if (archived){
            handleUnarchivedClick(jobID);
            setArchived(false);
        } else {
            handleArchivedClick(jobID);
            setArchived(true);
        }
    }

  return (
    <div className='card-container'>
      <div className='left'>
        <div className='job_title'> {jobTitle}</div>
        <div className='job_title'>Status: {jobStatus}</div>
        <div className='job_title'>Location: {location} </div>
      </div>
      <div onClick={(e)=>handleButton(e)}>
        {archived ? (
            <div className='card-button'>Unarchive</div>
        ) : (
            <div className='card-button'>Archive</div>
        )}
      </div>
    </div>
  );
};

export default JobCard;

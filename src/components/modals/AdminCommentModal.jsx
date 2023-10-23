import { useEffect, useState, createContext, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import axios from 'axios';
import { ReactComponent as SaveButton } from '../../styles/img/bookmark.svg'
import { ReactComponent as SolidSaveButton } from '../../styles/img/solidBookmark.svg'

const CommentCard = ({
    comment, 
    index,
    handleApproveComment,
    handleDenyCommentSubmit,
}) => {

    // toggle for buttons 
    const [approveToggle, setApproveToggle] = useState();
    const [denyToggle, setDenyToggle] = useState();
    // openModal or not
    const [isDenyOpen, setIsDenyOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);

  useEffect(() => {
    if (comment.commentStatus === 'In-Review'){
        setApproveToggle(false);
        setDenyToggle(false);
    } else if (comment.commentStatus === 'Approved'){
        setApproveToggle(true);
        setDenyToggle(false);
    } else if (comment.commentStatus === 'Denied'){
        setApproveToggle(false);
        setDenyToggle(true);
    }
  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  };
  const denyConfirm = (e) => {
    e.stopPropagation();
    setIsDenyOpen(false);
    setDenyToggle(true);
    handleDenyCommentSubmit(comment);
  }
  const approveConfirm = (e) => {
    e.stopPropagation();
    setIsApproveOpen(false);
    setApproveToggle(true);
    handleApproveComment(comment);
  }
  let date = new Date(comment.reviewDate);
  const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');

  return (
    <div key={index} className='comment-card-wrapper'>
      <div className='comment-top-wrapper'>
        <div className='comment-item comment-title'>{comment.name} (Rating: {comment.rating})</div>
        <div className='comment-item comment-title'>Business: {comment.businessName}</div>
        <div className='comment-item comment-title'> {dateOnly}</div>
        <div className='comment-item button-div'>
          {approveToggle ? (
            <button className='comment-button' type='button'>
            Approved
            </button>
          ) : (
            <button onClick={() => setIsApproveOpen(true)} className='comment-button' type='button'>
            Approve Comment
            </button>
          )}
          {denyToggle ? (
            <button className='comment-button' type='button'>
            Denied
            </button>
          ) : (
            <button onClick={() => setIsDenyOpen(true)} className='comment-button' type='button'>
            Deny Comment
            </button>
          )}
        </div>
        { isApproveOpen && (
          <div className='user-modal-container'>
            <div className = 'approve-confirmation'>
              <div className='delete-title'> Are you sure you want to approve this comment?</div>
              <div className='user-right'>
                <button onClick={(e) => approveConfirm(e)} className='apply-button button-back' type='button'>
                  Approve Comment
                </button>
                <button onClick={() => setIsApproveOpen(false)} className='apply-button button-back' type='button'>
                  Cancel 
                </button>
              </div>
            </div>
          </div>
        )}
        { isDenyOpen && (
          <div className='user-modal-container'>
            <div className = 'approve-confirmation'>
              <div className='delete-title'> Are you sure you want to deny this comment?</div>
              <div className='user-right'>
                <button onClick={(e) => denyConfirm(e)} className='apply-button button-back' type='button'>
                  Deny Comment
                </button>
                <button onClick={() => setIsDenyOpen(false)} className='apply-button button-back' type='button'>
                  Cancel 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='comment-review'>{comment.review}</div>
    </div>
  );
};

export default CommentCard;

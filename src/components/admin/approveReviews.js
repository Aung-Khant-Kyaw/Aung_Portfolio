import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../../utils/toastFuncs';
import '../../styles/forms.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Fuse from "fuse.js";
import CommentModal from '../modals/AdminCommentModal';

/**
 * @namespace Complete
 * @see Classes/approveReviews
 */

/**
 * This class provides the formatting for the component to approve reviews by admins / super admin (in development)
 * @class
 * @version 1.0
 * @see react
 * @see styles/forms.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const ApproveReviews = () => {
  const [publicComments, setPublicComments] = useState([]);
  const [pageChange, setPageChange] = useState('In-Review');
  const [sortBy, setSortBy] = useState('Date Asc');

  useEffect(() => {
    getAllComments();
  }, []);

  // options for fuse search
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.6,
    keys: ["businessName", "name", "review" ],
  };
  const fuse = new Fuse(publicComments, options);
  const handleSearch = (event) => {
    const { value } = event.target;

    // If the user searched for an empty string,
    // display all data.
    if (value.length === 0) {
      getAllComments();
      return;
    }

    const results = fuse.search(value);
    const items = results.map((result) => result.item);
    setPublicComments(items);
  };

  // filter buttons 
  const handlePageChange = (page) => {
    if (page === 'In-Review'){
      setPageChange ('In-Review');
    } else if (page === 'Approved'){
      setPageChange('Approved');
    } else if (page === 'Denied'){
      setPageChange('Denied');
    }
  };

   // get all the business users from the database using API
  const getAllComments = async () => {
    try {
      // @ToDo : Make changes here
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/admins/all/comments`
      );
      setPublicComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // render all comments
  const renderComments = () => {
    if (sortBy==='Date Asc'){
      return publicComments
      .filter((comment) => comment.commentStatus=== pageChange)
      .sort((a,b) => {
        let date1 = new Date(a.reviewDate).getTime();
        let date2 = new Date(b.reviewDate).getTime();
        if (date1 < date2){
          return 1;
        } else {
          return -1;
        }
      })
      .map((comment, index) => {
        return (
          <div key={comment._id}>
            <CommentModal
            comment={comment}
            index={index}
            handleApproveComment={(comment) => handleApproveComment(comment)}
            handleDenyCommentSubmit={(comment) => handleDenyCommentSubmit(comment)}
            />
          </div>
        )
      });
    } else if (sortBy==='Date Des'){
      return publicComments
      .filter((comment) => comment.commentStatus=== pageChange)
      .sort((a,b) => {
        let date1 = new Date(a.reviewDate).getTime();
        let date2 = new Date(b.reviewDate).getTime();
        if (date1 < date2){
          return -1;
        } else {
          return 1;
        }
      })
      .map((comment, index) => {
        return (
          <div key={comment._id}>
            <CommentModal
            comment={comment}
            index={index}
            handleApproveComment={(comment) => handleApproveComment(comment)}
            handleDenyCommentSubmit={(comment) => handleDenyCommentSubmit(comment)}
            />
          </div>
        )
      });
    } else if (sortBy==='Rating Asc'){
      return publicComments
      .filter((comment) => comment.commentStatus=== pageChange)
      .sort((a,b) => a.rating > b.rating ? -1 : 1)
      .map((comment, index) => {
        return (
          <div key={comment._id}>
            <CommentModal
            comment={comment}
            index={index}
            handleApproveComment={(comment) => handleApproveComment(comment)}
            handleDenyCommentSubmit={(comment) => handleDenyCommentSubmit(comment)}
            />
          </div>
        )
      });
    } else if (sortBy==='Rating Des'){
      return publicComments
      .filter((comment) => comment.commentStatus=== pageChange)
      .sort((a,b) => a.rating > b.rating ? 1 : -1)
      .map((comment, index) => {
        return (
          <div key={comment._id}>
            <CommentModal
            comment={comment}
            index={index}
            handleApproveComment={(comment) => handleApproveComment(comment)}
            handleDenyCommentSubmit={(comment) => handleDenyCommentSubmit(comment)}
            />
          </div>
        )
      });
    } else {
      return publicComments
      .filter((comment) => comment.commentStatus=== pageChange)
      .map((comment, index) => {
        return (
          <div key={comment._id}>
            <CommentModal
            comment={comment}
            index={index}
            handleApproveComment={(comment) => handleApproveComment(comment)}
            handleDenyCommentSubmit={(comment) => handleDenyCommentSubmit(comment)}
            />
          </div>
        )
      });
    }
  };

  const handleApproveComment = async(comment) => {
    // ------ API Calls for lock user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/approvecomment/${comment.busiID}/${comment._id}`
    );
    toastInfo(res.data);
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Approve Comment!');
    }
    getAllComments();
  };

  const handleDenyCommentSubmit = async(comment) => {
    // ------ API Calls for lock user ------///
    const res = await axios.put(
      `${process.env.REACT_APP_API}/api/admins/denycomment/${comment.busiID}/${comment._id}`
    );
    toastInfo(res.data);
    if (res.data.error) {
        toastInfo(res.data.error);
        throw res.data.error;        
      } else {
        toastInfo('Deny Comment!');
    }
    getAllComments();
  };


  return (
    <div className='dash-container'>
      <div className='comment-top-wrapper'>
        <div className='comment-top-wrapper'>
          <div className='create-posting-button comment-dropdown'>
            <button className='comment-title'>Sort By:</button>
            <div className='dropdown-options'>
              <button className='comment-drop-button' onClick={() => setSortBy('Rating Asc')}>Best Rating</button>
              <button className='comment-drop-button' onClick={() => setSortBy('Rating Des')}>Lowest Rating</button>
              <button className='comment-drop-button' onClick={() => setSortBy('Date Asc')}>Latest Comment</button>
              <button className='comment-drop-button' onClick={() => setSortBy('Date Des')}>Earliest Comment</button>
            </div>
          </div>
          <button className='create-posting-button' onClick={() => handlePageChange('In-Review')}>
            In-Review
          </button>
          <button className='create-posting-button' onClick={() => handlePageChange('Approved')}>
            Approved
          </button>
          <button className='create-posting-button' onClick={() => handlePageChange('Denied')}>
            Denied
          </button>
        </div>
        <input
          className='shortBar searchBar'
          type="text"
          placeholder="Search by name, business, review comment."
          onChange={handleSearch}
        />
      </div>
      
      <hr />
      <div>{renderComments()}</div>
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default ApproveReviews;
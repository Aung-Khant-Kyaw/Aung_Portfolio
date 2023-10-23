/**
 * publicProfile.js
 * @namespace Incomplete
 * @see Modules/PublicProfile
 */

/**
 * This module provides the formatting for a component for a public profile to dashboard.js.
 * @module PublicProfile
 * @version 0.1
 * @todo Allow profile customization and change from hard coded preview
 * @see styles/publicProfile.css
 * @see Classes/Dashboard
 */
import * as React from 'react';
import { useState } from 'react';
import '../styles/publicProfile.css';
import useAuth from '../hooks/useAuth';
import Avatar from '@mui/material/Avatar';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastInfo } from '../utils/toastFuncs';
import { blue500 } from 'material-ui/styles/colors';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import JobCard from '../components/modals/JobSavedCard';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  BsLink45Deg,
  BsTwitter,
} from 'react-icons/bs';
import { GrLinkedinOption } from 'react-icons/gr';


/**
 * This function provides the HTML formatting of the PublicProfile component to dashboard.js.
 * @function
 * @param {State} props - The current state of the program
 * @returns {HTMLCollection}
 * @see Classes/Dashboard
 */
const PublicProfile = ({
  // userID for the public profile
  userID,
  // userID for the user that clicked the public profile
  currentUserID,
  // to close this modal
  onCloseModal,
  // for Business Profile
  jobPostID,
  uploadEvalPdf,
  // for Student Profile

}) => {
  const { user, getUser } = useAuth();
  const [userData, setUserData] = useState(user);
  const [jobs, setJobs] = useState([]);
  const [publicComments, setPublicComments] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [hasAvatar, setHasAvatar] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);
  const [viewComment, setViewComment] = useState(false);
  const [sortBy, setSortBy] = useState('Date Asc');
  const [publicComment, setPublicComment] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: '', rating: '', reviewComment:'',
  });
  const {name, rating, reviewComment} = reviewFormData;
  const [ratingError, setRatingError] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [anonCheck, setAnonCheck]= useState(false);
  // for evaluation modal and pdf upload 
  const [evalModal, setEvalModal] = useState(false);
  const pdfFormData = new FormData();
  const [pdfFile, setPdfFile] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const [docsModal, setDocsModal] = useState(false);
  const [pdfObj, setPdfObj] = useState([]);
  // different typee of pdfs
  const [pdfs, setPdfs] = useState([]);
  const [resumePdfs, setResumePdfs] = useState([]);
  const [transcriptPdfs, setTranscriptPdfs] = useState([]);
  const [coverPdfs, setCoverPdfs] = useState([]);
  const [brochurePdfs, setBrochurePdfs] = useState([]);
  const [otherPdfs, setOtherPdfs] = useState([]);

  // useEffect to get userData
  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/users/${userID}`);
        setUserData(data);
      } catch (e) {
        console.error(e);
      }
    }) ();
  },[]);
  
  // Get public comments for business
  useEffect(() => {
    (async () => {
      if (userData.userType === 'business'){
        setPublicComments(userData.publicComments);
      }
    })();
  }, [userData]);

  // Use job history for student
  useEffect(() => {
    (async () => {
      if (userData.userType === 'student'){
        const jobIDs = userData.jobsHistory;
        const fetchedJobs = [];
        for await (const jobID of jobIDs){
          const jobResponse = await axios.get(`${process.env.REACT_APP_API}/api/jobs/${jobID}`);
            if (!jobResponse.data.error){
                fetchedJobs.push(jobResponse.data);
            }
        }
        fetchedJobs.sort((a,b) => {
          const temp = new Date(a.start).getTime();
          const temp2 = new Date(b.start).getTime();
  
          if (temp > temp2 ) {
            return -1;
          } else if (temp < temp2) {
            return 1;
          } else {
            return 0; 
          }
        });
        setJobs(fetchedJobs);
      }
    })();
  }, [userData]);

  // get user pdfs 
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/users/file/${userData._id}`
      );
      setPdfs(data);
      setResumePdfs(data.filter((pdf) => pdf.documentType === 'RESUME'));
      setTranscriptPdfs(data.filter((pdf) => pdf.documentType === 'TRANSCRIPT'));
      setCoverPdfs(data.filter((pdf) => pdf.documentType === 'COVER'));
      setBrochurePdfs(data.filter((pdf) => pdf.documentType === 'BROCHURE'));
      setOtherPdfs(data.filter((pdf) => pdf.documentType === 'OTHERS'));
    })();
  }, [userData]);

  // get user avatar
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/users/avatar/${userData.avatar}`
        );

        if (res.data.error) {
          setHasAvatar(false);
          return;
        }
        setHasAvatar(true);
        setAvatar(`profile_images/${userData.avatar}`);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userData]);

  // handle change in public review comment form 
  const handleReviewChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setReviewFormData({...reviewFormData, [key]: value.trim()});
    setRatingError(false);
    setReviewError(false);
  }

  // handle submit Public Review form 
  const onReviewSubmit = async (e) => {
    console.log(reviewFormData);
    e.stopPropagation();
    const reg = /^[0-9\b]+$/;
    if (rating === '' || Number(rating) < 1 || Number(rating) > 5 || !reg.test(rating)){
      setRatingError(true);
    } else if (reviewComment === '') {
      setReviewError(true);
    } else {
      setRatingError(false);
      setReviewError(false);
      try {
        let body;
        if (anonCheck){
          body = {
            name: '',
            rating: rating,
            review: reviewComment,
          }
        } else {
          body = {
            name: name,
            rating: rating,
            review: reviewComment,
          }
        }
        const res = await axios.post(`${process.env.REACT_APP_API}/api/users/postcomment/${userData._id}`, body);
        
        if (res.data.error) {
          toastInfo("Message Error");
          throw res.data.error;        
          // display error message
        } else {
          setPublicComment(false);
          toastInfo("The comment will be posted once reviewed by Admin");
        }
      } catch (err) {
        console.error(err);
        toastInfo("Message Error");
      }   
    }
  }

  // Pdf card 
  const PdfCard = ({ pdf }) => {
    const unix = pdf.filename.split('-')[0];
    let date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(unix);
  
    let originalname =
      pdf.originalname.length > 15
        ? `${pdf.originalname
            .split('.')[0]
            .slice(0, 10)} ... ${pdf.originalname.slice(
            pdf.originalname.split('.')[0].length - 5
          )}`
        : pdf.originalname;
  
    return (
      <div className='document-card'>
        <a href={`/profile_pdfs/${pdf.filename}`} target='_blank'>
          <div className='document-card-wrapper'>
            <div className='file-name-wrapper-business'>
              <div className='document-docname'>{pdf.documentName}</div>
              <div className='document-doc-type'>{originalname}</div>
            </div>
            <div className='document-date-added'>{date}</div>
          </div>
        </a>
      </div>
    );
  };

  // rendering job posts / job history for student
  const renderJobPosts = () => {
		return jobs.map((job, index) => {
			return (
				<div key={job._id}
					className='job-history-card-wrapper'
				>
				<JobCard
					jobTitle={job.jobTitle}
					businessID={job.businessID}
					location={job.location}
					jobCity={job.jobCity}
					jobState={job.jobState}
					saved={true}
					jobID={job._id}
					user={user}
					start={job.start}
					end={job.end}
				/>
				</div>
			);
		});
	};

  // rendering public comments for the business
  const renderComments = () => {
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    };
    if (sortBy==='Date Asc'){
      return publicComments
      .filter((comment) => comment.commentStatus=== 'Approved')
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
        let date = new Date(comment.reviewDate);
        const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');
        return (
          <div key={index} className='comment-card-wrapper'>
            <div className='comment-top-wrapper'>
              <div className='comment-title'>{comment.name} (Rating: {comment.rating})</div>
              <div className='comment-title'> {dateOnly}</div>
            </div>
            <div className='comment-review'>{comment.review}</div>
          </div>
        );
      });
    } else if (sortBy==='Date Des'){
      return publicComments
      .filter((comment) => comment.commentStatus=== 'Approved')
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
        let date = new Date(comment.reviewDate);
        const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');
        return (
          <div key={index} className='comment-card-wrapper'>
            <div className='comment-top-wrapper'>
              <div className='comment-title'>{comment.name} (Rating: {comment.rating})</div>
              <div className='comment-title'> {dateOnly}</div>
            </div>
            <div className='comment-review'>{comment.review}</div>
          </div>
        );
      });
    } else if (sortBy==='Rating Asc'){
      return publicComments
      .filter((comment) => comment.commentStatus=== 'Approved')
      .sort((a,b) => a.rating > b.rating ? -1 : 1)
      .map((comment, index) => {
        let date = new Date(comment.reviewDate);
        const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');
        return (
          <div key={index} className='comment-card-wrapper'>
            <div className='comment-top-wrapper'>
              <div className='comment-title'>{comment.name} (Rating: {comment.rating})</div>
              <div className='comment-title'> {dateOnly}</div>
            </div>
            <div className='comment-review'>{comment.review}</div>
          </div>
        );
      });
    } else if (sortBy==='Rating Des'){
      return publicComments
      .filter((comment) => comment.commentStatus=== 'Approved')
      .sort((a,b) => a.rating > b.rating ? 1 : -1)
      .map((comment, index) => {
        let date = new Date(comment.reviewDate);
        const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');
        return (
          <div key={index} className='comment-card-wrapper'>
            <div className='comment-top-wrapper'>
              <div className='comment-title'>{comment.name} (Rating: {comment.rating})</div>  
              <div className='comment-title'> {dateOnly}</div>
            </div>
            <div className='comment-review'>{comment.review}</div>
          </div>
        );
      });
    } else {
      return publicComments
      .filter((comment) => comment.commentStatus=== 'Approved')
      .map((comment, index) => {
        let date = new Date(comment.reviewDate);
        const dateOnly = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()),date.getFullYear()].join('-');
        return (
          <div key={index} className='comment-card-wrapper'>
            <div className='comment-top-wrapper'>
              <div className='comment-title'>{comment.name} (Rating: {comment.rating})</div>
              <div className='comment-title'> {dateOnly}</div>
            </div>
            <div className='comment-review'>{comment.review}</div>
          </div>
        );
      });
    }
  };

  // handle file change upload
  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setPdfFile([...pdfFile, file]);
      setPdfObj([...pdfObj, file.name]);
      setIsNewPdf(true);
      setDocsModal(false);
    }
  };

  // method to upload pdf to the Database 
  const uploadPDF = async (docType) => {
    let res;
    pdfFormData.append('docType', docType);
    pdfFormData.append('forId', userID);
    pdfFormData.append('userId', currentUserID);
    pdfFormData.append('jobId', jobPostID);
    pdfFormData.append('pdf', pdfFile[0]);
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_API}/api/users/upload-eval`,
      data: pdfFormData,
    };
    try {
      const response = await axios(config);
      res = response.data;
      pdfFormData.delete('pdfObject');
      pdfFormData.delete('pdf');
      setPdfFile([]);
      setPdfObj([]);
    } catch (error) {
      return error;
    }
    return res;
  };

  // handle eval modal submit form
  const handleEvalSubmit = async (docType) => {
    if (pdfObj.length === 1){
      const res = await uploadPDF(docType);
      if (res.msg) {
        toastInfo(res.msg);
      } else {
        toastFail('You have uploaded an evaluation form already!');
      }
      setEvalModal(false);
    } else {
      toastFail('Something went wrong! Please try again later!');
      setEvalModal(false);
    }
  };

  return (
    <div className='profile-modal-container'>
      <div className='modal-overlay' onClick={onCloseModal}>
      </div>
      <div className='dash-std-option-content'></div>
      <div className="profile-modal-wrapper">
        {userData.userType === "business" ? (
          /// -------------------  For Public BUSINESS Profile ------------------- ///
          <>
          <div className="profile-big-wrapper">
                {/* /// ------------------- For Profile Header------------------- /// */}
                <div className="profile-header">
                  <div className="profile-userpic">
                    <>
                      <Avatar
                        sx={{
                          bgcolor: blue500,
                          height: 100,
                          width: 100,
                        }}
                        src={avatar}
                      />
                    </>

                    <div className="profile-basic-info">
                      <div className="profile-name">{userData.businessName}</div>
                      <div className="industry-type">
                        <div className="industry-content">
                          <div>
                            {userData.companyIndustry
                              ? userData.companyIndustry
                              : `unset industry`}
                          </div>
                          <div className="num-employees">
                            <FontAwesomeIcon icon={faUsers} />
                            {userData.companySize
                              ? userData.companySize
                              : "1 to 9"}{" "}
                            employees
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-intro">
                    <div className="profile-intro-wrapper">
                      <div className="profile-intro-title">About</div>
                      <div className="profile-intro-content">
                        {userData.companyOverview === "" ? (
                          <div className="profile-intro-content-placeholder">
                            Tell us about your company...
                          </div>
                        ) : (
                          userData.companyOverview
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* /// ------------------- For Profile Contact Info------------------- /// */}
                <div className="profile-contact">
                  <div className="profile-contact-info">
                    <div className="profile-rating  profile-contact-title">
                        Rating: <br></br>{userData.rating ? userData.rating : "-"} / 5
                        <button className='comment-button' onClick={() => setViewComment(true)}>View Comments and Reviews</button>
                    </div>
                        
                        {viewComment && (
                          <div className='profile-modal-container'>
                          {/* /// ------------------- VIEW COMMENT GOES HERE------------------- /// */}
                            <div className='modal-overlay' onClick={() => setViewComment(false)}></div>
                            <div className='comment-modal-container'>
                              <div className='comment-topbar'>
                                <div className='comment-title-h1'>Interns Ratings and Comments</div>
                                <div>
                                  <button className='comment-title close-button-right' onClick={() => setViewComment(false)}>Close</button>
                                  <div className='comment-dropdown'>
                                    <button className='comment-title'>Sort By:</button>
                                    <div className='dropdown-options'>
                                      <button className='comment-drop-button' onClick={() => setSortBy('Rating Asc')}>Highest Rating</button>
                                      <button className='comment-drop-button' onClick={() => setSortBy('Rating Des')}>Lowest Rating</button>
                                      <button className='comment-drop-button' onClick={() => setSortBy('Date Asc')}>Newest First</button>
                                      <button className='comment-drop-button' onClick={() => setSortBy('Date Des')}>Oldest First</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='comment-reviews'>
                                {renderComments()}
                              </div>
                            </div>
                          </div>
                        )}
                    <div className="profile-contact-title">
                      Contact Information
                    </div>
                    <div className="profile-contact-content">
                      {userData.businessDivision && (
                          <div className="bus-division">
                            <div className="profile-contact-header">
                              Business Division:
                            </div>
                            <div className="profile-contact-data">
                              {userData.businessDivision}
                            </div>
                          </div>
                        )}
                      {userData.userPhoneNumber && (
                        <div className="phone-number">
                          <div className="profile-contact-header">
                            Phone number:
                          </div>
                          {userData.userPhoneNumber ? (
                            <div className="phone-number-data">
                              ({userData.userPhoneNumber.slice(0, 3)}){" "}
                              {userData.userPhoneNumber.slice(3, 6)}-
                              {userData.userPhoneNumber.slice(6, 10)}
                            </div>
                          ) : (
                            <div className="profile-contact-data">
                              (---) -------
                            </div>
                          )}
                        </div>
                      )}
                      {userData.linkCompany && (
                        <div className="website-link">
                          <div className="link-content">
                            <div className="profile-contact-header">Website:</div>
                            <a href={`${userData.linkCompany}`} target="_blank">
                              <FontAwesomeIcon icon={faUsers} />
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="profile-email">
                        <div className="profile-contact-header">Email:</div>
                        <div className="profile-contact-data">
                          {userData.email}
                        </div>
                      </div>
                      {(userData.linkLinkedIn ||
                        userData.linkTwitter ||
                        userData.linkOther) && (
                        <div className="profile-contact-link-wrapper">
                          <div className="profile-socials">
                            <div className="profile-contact-header">
                              Social Media:
                            </div>
                            <div className="profile-socials-links">
                              {userData.linkLinkedIn && (
                                <a href={userData.linkLinkedIn} target="_blank">
                                  <div className="profile-socials-linkedIn">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <GrLinkedinOption />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                              {userData.linkTwitter && (
                                <a href={userData.linkTwitter} target="_blank">
                                  <div className="profile-socials-twitter">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <BsTwitter />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                              {userData.linkOther && (
                                <a href={userData.linkOther} target="_blank">
                                  <div className="profile-socials-others">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <BsLink45Deg />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {((userData.userType === "business" &&
                          (userData.businessCity || userData.businessState))) && (
                        <div className="profile-location">
                          <div className="profile-bus-location">
                              <div className="profile-contact-header">
                                Location:
                              </div>
                              <div className="profile-stud-location-info">
                                {userData.businessCity}, {userData.businessState}
                              </div>
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='document-wrapper'>
                    <div className='public-doc-container'>
                      {(pdfs.length > 0 ||
                        brochurePdfs.length > 0 ||
                        otherPdfs.length > 0) && (
                        <div className='document-header'>Documents</div>
                      )}
                      <div className='public-document-content'>
                          <>
                            {brochurePdfs.length > 0 && (
                              <div className='brochure'>
                                <div className='document-std-content-header'>
                                  <div className='document-std-content-header-name'>Brochure</div>
                                </div>
                                {brochurePdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                            {otherPdfs.length > 0 && (
                              <div className='others'>
                                <div className='document-std-content-header'>
                                  <div className='document-std-content-header-name'>Others</div>
                                </div>
                                {otherPdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                          </>
                      </div>
                      {pdfs.length === 0 &&
                        brochurePdfs.length === 0 &&
                        otherPdfs.length === 0 && (
                          <div className='documents'>
                            <div className='document-content'>
                              <div className='nothing-to-show'>
                                There is not document for this user. 
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* /// ------------------- Button on Public Profile------------------- /// */}
                <div className='public-btn'>
                  <button className='public-button' onClick={onCloseModal}>Close</button>
                  <button  className='public-button' onClick={() => setPublicComment(true)}>Review this Business</button>
                  {uploadEvalPdf && (
                    <button className='public-button' onClick={() => setEvalModal(true)}>Evaluate this Internship</button>
                  )}
                </div>
                {/* /// ------------------- Write Public Comment on Business------------------- /// */}
                {publicComment && (
                    <div className='profile-modal-container'>
                      <div className='modal-overlay' onClick={() => setPublicComment(false)}></div>
                      <div className='public-comment-container'>
                        <label className='rating-input'>
                          Name:
                          <input
                            id='name'
                            type='text'
                            onChange={(e) => handleReviewChange(e)}
                          />
                          <input type="checkbox" checked={anonCheck} onChange={() => setAnonCheck(!anonCheck)}/> Check for an Anonymous comment
                        </label>
                        <label  className='rating-input'>
                          Rate out of 5:
                          <input
                              id="rating"
                              type="text"
                              required
                              onChange={(e) => handleReviewChange(e)}
                            />
                        </label>
                        {ratingError && (
                          <p className='error-message' style={{ color: 'red' }}>
                                Please rate between 1 and 5.</p>
                        )}
                        <textarea
                          className='reviewComment'
                          id='reviewComment'
                          type="text"
                          rows='5'
                          required
                          placeholder="Write your review here."
                          onChange={(e) => handleReviewChange(e)}
                        />
                        {reviewError && (
                          <p className='error-message' style={{ color: 'red' }}>
                                Please write a comment for the review.</p>
                        )}
                        <div className='button-container-bottom'>
                          <button className='close-button' onClick={() => setPublicComment(false)}>Cancel</button>
                          <button className='close-button' onClick={(e) => onReviewSubmit(e)}>Post Comment</button>
                        </div>
                      </div>
                    </div>
                  )}
                {/* /// ------------------- Download/Upload eval pdf on Business------------------- /// */}
                {evalModal && (
                  <div className='profile-modal-container'>
                    <div className='modal-overlay' onClick={() => setEvalModal(false)}></div>
                    <div className='public-comment-container upload-center'>
                      {/* /// ------------------- Download pdf button here ------------------- /// */}
                      <div className='upload-box'>
                        <a href={`/J4I_Internship_Evaluation.docx`} target='_blank'>
                          <div className='document-docname'>Please download the Evaluation Form here and fill it.</div>
                        </a>
                      </div>
                      {/* /// ------------------- Upload eval pdf on Business------------------- /// */}
                      <div className='upload-text'>
                        Once completed, please upload the Form as PDF here.</div>
                      {(pdfObj.length === 0) && (
                        <div className='doc-file upload-margin'>
                          <div className='doc-file-header'>Drag and drop a PDF document here or select a file below</div>
                          <div className='doc-file-btn'>Select From Computer</div>
                          <input
                            type='file'
                            onChange={handleFileChange}
                            accept='.pdf'
                            required
                          />
                        </div>
                      )}
                      {pdfObj.length > 0 &&
                        pdfObj.map((obj, index) => {
                          const fileNameArr = obj.split('.');
                          let fileName = '';
                          if (fileNameArr[0].length > 10) {
                            fileName = `${fileNameArr[0].slice(
                              0,
                              7
                            )} ... ${fileNameArr[0].slice(
                              fileNameArr[0].length - 5
                            )}.PDF`;
                          } else {
                            fileName = obj;
                          }
                          return (
                            <div className='document-info upload-width' key={index}>
                              <div className='doc-name-wrapper'>
                                <div className='file-name'>{fileName}</div>
                              </div>
                              <div
                                className='doc-icon'
                                onClick={() => {
                                  setPdfFile([]);
                                  setPdfObj([]);  
                                }}
                              >
                                X
                              </div>
                            </div>
                          );
                        })}
                      <div className='button-container-bottom'>
                        <button className='close-button' onClick={() => setEvalModal(false)}>Cancel</button>
                        <button className='close-button' disabled={(pdfObj.length === 0)} onClick={(e) => handleEvalSubmit('TO BUSINESS')}>Submit the Form</button>
                      </div>
                    </div>
                  </div>
                )}  
              </div>
          </>
        ) : (
          /// -------------------  For Public STUDENT Profile ------------------- ///
          <div className="profile-big-wrapper">
                {/* <PublicProfileHeader user={userData} userData={userData} avatar={avatar} publicPro={true} />
                <div className='contact-container'><PublicProfileContact userData={userData} user={userData} publicPro={true} /></div>
                <div className='profile-btn-container'>
                  <div>
                    <div onClick={onCloseModal()}>Buttons</div>
                  </div> */}
                {/* /// ------------------- For Profile Header------------------- /// */}
                <div className="public-profile-header">
                  <div className="profile-userpic">
                    <div className="profile-stud-college">
                    {userData.institution}
                    </div>
                    <>
                      <Avatar
                        sx={{
                          bgcolor: blue500,
                          height: 100,
                          width: 100,
                        }}
                        src={avatar}
                      />
                    </>

                    <div className="profile-basic-info">
                      <div className="profile-name">
                          {userData.firstName} {userData.lastName}
                      </div>
                      <div className="profile-gpa">
                          <div className="gradyear">
                            <FontAwesomeIcon icon={faGraduationCap} />{" "}
                            {userData.gradYear}
                          </div>
                          <div className="gpa">
                            <FontAwesomeIcon icon={faBook} /> {userData.gpa}
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="profile-intro">
                    <div className="profile-intro-wrapper">
                      <div className="profile-intro-title">About</div>
                      <div className="profile-intro-content">
                        {userData.bio === "" ? (
                                <div className="profile-intro-content-placeholder">
                                  Edit your journey to introduce yourself...
                                </div>
                              ) : (
                                userData.bio
                              )}
                      </div>
                    </div>
                    <div className="profile-intro-wrapper">
                        <div className="profile-intro-title">Jobs History</div>
                        <div className="job-history-post-container">
                          {renderJobPosts()}
                        </div>
                      </div>
                  </div>
                </div>
                {/* /// ------------------- For Profile Contact Info------------------- /// */}
                <div className="public-contact">
                  <div className="profile-contact-info">
                    <div className="profile-contact-title">
                      Contact Information
                    </div>
                    <div className="profile-contact-content">
                      {userData.userPhoneNumber && (
                        <div className="phone-number">
                          <div className="profile-contact-header">Phone number:</div>
                          {userData.userPhoneNumber ? (
                            <div className="phone-number-data">
                              ({userData.userPhoneNumber.slice(0, 3)}){" "}
                              {userData.userPhoneNumber.slice(3, 6)}-
                              {userData.userPhoneNumber.slice(6, 10)}
                            </div>
                          ) : (
                            <div className="profile-contact-data">(---) -------</div>
                          )}
                        </div>
                      )}
                      {user.userType === "student" && userData.linkPortfolio && (
                        <div className="website-link">
                          <div className="link-content">
                            <div className="profile-contact-header">Portfolio:</div>
                            <a href={`${userData.linkPortfolio}`} target="_blank">
                              <FontAwesomeIcon icon={faUser} />
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="profile-email">
                        <div className="profile-contact-header">Email:</div>
                        <div className="profile-contact-data">{userData.email}</div>
                      </div>
                      {(userData.linkLinkedIn ||
                        userData.linkTwitter ||
                        userData.linkOther) && (
                        <div className="profile-contact-link-wrapper">
                          <div className="profile-socials">
                            <div className="profile-contact-header">Social Media:</div>
                            <div className="profile-socials-links">
                              {userData.linkLinkedIn && (
                                <a href={userData.linkLinkedIn} target="_blank">
                                  <div className="profile-socials-linkedIn">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <GrLinkedinOption />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                              {userData.linkTwitter && (
                                <a href={userData.linkTwitter} target="_blank">
                                  <div className="profile-socials-twitter">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <BsTwitter />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                              {userData.linkOther && (
                                <a href={userData.linkOther} target="_blank">
                                  <div className="profile-socials-others">
                                    <IconContext.Provider
                                      value={{
                                        size: "20px",
                                        style: {
                                          color: "#26506c",
                                          transition: "ease-in-out 0.3s",
                                        },
                                      }}
                                    >
                                      <div>
                                        <BsLink45Deg />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {((user.userType === "student" &&
                        (userData.addressCity || userData.addressState)) ||
                        (user.userType === "business" &&
                          (userData.businessCity || userData.businessState))) && (
                        <div className="profile-location">
                          {user.userType === "student" ? (
                            <div className="profile-stud-location">
                              <div className="profile-contact-header">Location:</div>
                              <div className="profile-stud-location-info">
                                {userData.addressCity}, {userData.addressState}
                              </div>
                            </div>
                          ) : (
                            <div className="profile-bus-location">
                              <div className="profile-contact-header">Location:</div>
                              <div className="profile-stud-location-info">
                                {userData.businessCity}, {userData.businessState}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='document-wrapper'>
                    <div className='document-container'>
                      {(pdfs.length > 0 ||
                        brochurePdfs.length > 0 ||
                        otherPdfs.length > 0) && (
                        <div className='document-header'>Documents</div>
                      )}
                      <div className='public-document-content'>
                          <>
                            {resumePdfs.length > 0 && (
                              <div className='resume'>
                                <div className='document-std-content-header'>
                                  <div className='document-std-content-header-name'>
                                    Resumes
                                  </div>
                                </div>
                                {resumePdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                            {transcriptPdfs.length > 0 && (
                              <div className='transcript'>
                                <div className='document-std-content-header'>
                                  <div className='document-std-content-header-name'>
                                    Transcripts
                                  </div>
                                </div>
                                {transcriptPdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                            {coverPdfs.length > 0 && (
                              <div className='cover'>
                                <div className='document-std-content-header'>
                                  <div className='document-std-content-header-name'>
                                    Cover Letters
                                  </div>
                                </div>
                                {coverPdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                            {otherPdfs.length > 0 && (
                              <div className='others'>
                                <div className='document-content-header'>
                                  <div className='document-content-header-name'>Others</div>
                                </div>
                                {otherPdfs.map((pdf, index) => (
                                  <PdfCard pdf={pdf} key={index}/>
                                ))}
                              </div>
                            )}
                          </>
                      </div>
                      {pdfs.length === 0 &&
                        brochurePdfs.length === 0 &&
                        otherPdfs.length === 0 && (
                          <div className='documents'>
                            <div className='document-content'>
                              <div className='nothing-to-show'>
                                There is not document for this user. 
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                {/* /// ------------------- Button on Public Profile------------------- /// */}
                <div className='public-btn'>
                  <button className='public-button' onClick={onCloseModal}>Close</button>
                  {uploadEvalPdf && (
                    <button className='public-button' onClick={() => setEvalModal(true)}>Evaluate this Intern</button>
                  )}
                </div>
                {/* /// ------------------- Download/Upload eval pdf on Student------------------- /// */}
                {evalModal && (
                  <div className='profile-modal-container'>
                    <div className='modal-overlay' onClick={() => setEvalModal(false)}></div>
                    <div className='public-comment-container upload-center'>
                      {/* /// ------------------- Download pdf button here ------------------- /// */}
                      <div className='upload-box'>
                        <a href={`/J4I_Intern_Evaluation.docx`} target='_blank'>
                          <div className='document-docname'>Please download the Evaluation Form here and fill it.</div>
                        </a>
                      </div>
                      {/* /// ------------------- Upload eval pdf on Business------------------- /// */}
                      <div className='upload-text' >
                        Once completed, please upload the Form as PDF here.</div>
                      {(pdfObj.length === 0) && (
                        <div className='doc-file upload-margin'>
                          <div className='doc-file-header'>Drag and drop a PDF document here or select a file below</div>
                          <div className='doc-file-btn'>Select From Computer</div>
                          <input
                            type='file'
                            onChange={handleFileChange}
                            accept='.pdf'
                            required
                          />
                        </div>
                      )}
                      {pdfObj.length > 0 &&
                        pdfObj.map((obj, index) => {
                          const fileNameArr = obj.split('.');
                          let fileName = '';
                          if (fileNameArr[0].length > 10) {
                            fileName = `${fileNameArr[0].slice(
                              0,
                              3
                            )} ... ${fileNameArr[0].slice(
                              fileNameArr[0].length - 5
                            )}.PDF`;
                          } else {
                            fileName = obj;
                          }
                          return (
                            <div className='document-info upload-width' key={index}>
                              <div className='doc-name-wrapper'>
                                <div className='file-name'>{fileName}</div>
                              </div>
                              <div
                                className='doc-icon'
                                onClick={() => {
                                  setPdfFile([]);
                                  setPdfObj([]);  
                                }}
                              >
                                X
                              </div>
                            </div>
                          );
                        })}
                      <div className='button-container-bottom'>
                        <button className='close-button' onClick={() => setEvalModal(false)}>Cancel</button>
                        <button className='close-button' disabled={(pdfObj.length === 0)} onClick={(e) => handleEvalSubmit('TO STUDENT')}>Submit the Form</button>
                      </div>
                    </div>
                  </div>
                )} 
              </div>
        )}
      </div>
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default PublicProfile;

import { IconContext } from 'react-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  BsLink45Deg,
  BsTwitter,
} from 'react-icons/bs';
import { GrLinkedinOption } from 'react-icons/gr';
import DocumentAll from '../pages/DocumentAll';
import { useEffect, useState } from 'react';


function ProfileContactInfo({ userData, user}) {
  const [publicComments, setPublicComments] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [sortBy, setSortBy] = useState('Date Asc');
  const [currentComponent, setCurrentComponent] = useState(0);

  // Get public comments for business
  useEffect(() => {
    (async () => {
      if (userData.userType === 'business'){
        setPublicComments(userData.publicComments);
      }
    })();
  }, [userData]);

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

  return (
    /// ------------------- For User Profile ------------------- ///
    <div className="profile-contact">
      <div className="profile-contact-info">
        {user.userType === "business" && (
          <>
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
          </>
        )}
        <div className="profile-contact-title">
          Contact Information
        </div>
        <div className="profile-contact-content">
          {user.userType === "business" && userData.businessDivision && (
            <div className="bus-division">
              <div className="profile-contact-header">Business Division:</div>
              <div className="profile-contact-data">
                {userData.businessDivision}
              </div>
            </div>
          )}
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
          {user.userType === "business" && userData.linkCompany && (
            <div className="website-link">
              <div className="link-content">
                <div className="profile-contact-header">Website:</div>
                <a href={`${userData.linkCompany}`} target="_blank">
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
      <DocumentAll
        userState={userData}
        setCurrentComponent={setCurrentComponent}
      />
    </div>
  );



}
export default ProfileContactInfo

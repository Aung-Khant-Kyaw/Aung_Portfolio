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
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import '../styles/publicProfile.css';
import { useEffect } from 'react';
import axios from 'axios';
import ProfileBusiness from '../pages/business/profileBusiness';
import ProfileStudent from '../pages/student/profileStudent';
import { IconContext } from 'react-icons';
import ProfilePageHeader from './ProfilePageHeader';
import ProfileContactInfo from './ProfileContactInfo';
import {BsPencilSquare} from 'react-icons/bs';
import DocumentAll from '../pages/DocumentAll';


/**
 * This function provides the HTML formatting of the PublicProfile component to dashboard.js.
 * @function
 * @param {State} props - The current state of the program
 * @returns {HTMLCollection}
 * @see Classes/Dashboard
 */
function UserProfile() {
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const { user, getUser } = useAuth();
  const [userData, setUserData] = useState(user);
  const [avatar, setAvatar] = useState('');
  const [hasAvatar, setHasAvatar] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(0);

  // get userData using UseAuth Hook
  useEffect(() => {
    (async () => {
      const res = await getUser();
      setUserData(res);
    })();
  }, []);

  // get userData again if the profile is updated
  useEffect(() => {
    (async () => {
      const res = await getUser();
      setUserData(res);
    })();
    setIsProfileUpdated(false);
  }, [isProfileUpdated]);

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

  return (
    <div className='public-profile-page'>
      {user.userType === 'business' ? (
        /// -------------------  For Business Profile ------------------- ///
        <>
          {currentComponent === 0 ? (
            <div className='profile-big-wrapper'>
              <ProfilePageHeader user={user} userData={userData} avatar={avatar} publicPro={false} />
              <div className='contact-container'><ProfileContactInfo userData={userData} user={user} /></div>
              <div className='profile-btn-container'>
                <div
                  className='profile-edit-btn'
                  onClick={() => setCurrentComponent(1)}
                >
                  <IconContext.Provider
                    value={{
                      size: '3.5vh',
                      style: {
                        color: '#26506c',
                        transition: 'ease-in-out 0.3s',
                      },
                    }}
                  >
                    <BsPencilSquare />
                    <div className='edit-name'>
                      Edit
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          ) : (
            <div className='profile-component-container'>
              <div className='profile-component-wrapper'>
                <ProfileBusiness
                  userState={userData}
                  setCurrentComponent={setCurrentComponent}
                  setIsProfileUpdated={setIsProfileUpdated}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        /// -------------------  For Student Profile ------------------- ///
        <>
          {currentComponent === 0 ? (
            <div className='profile-big-wrapper'>
              <ProfilePageHeader user={user} userData={userData} avatar={avatar} publicPro={false}/>
              <div className='contact-container'><ProfileContactInfo userData={userData} user={user} /></div>
              <div className='profile-btn-container'>
                <div
                  className='profile-edit-btn'
                  onClick={() => setCurrentComponent(1)}
                >
                  <IconContext.Provider
                    value={{
                      size: '3.5vh',
                      style: {
                        color: '#26506c',
                        transition: 'ease-in-out 0.3s',
                      },
                    }}
                  >
                    <BsPencilSquare />
                    Edit
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          ) : (
            <div className='profile-component-container'>
              <div className='profile-component-wrapper'>
                <ProfileStudent
                  userState={userData}
                  setCurrentComponent={setCurrentComponent}
                  setIsProfileUpdated={setIsProfileUpdated}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserProfile;

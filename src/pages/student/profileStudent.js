import React, { useEffect, useState } from 'react';
import '../../styles/profile-student.css';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastSuccess } from '../../utils/toastFuncs';
import SelectUSState from 'react-select-us-states';
import _ from 'lodash';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Hint } from 'react-autocomplete-hint';
import school from '../../utils/us_institutions.json';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import { validateForm } from '../../utils/fieldValidation';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import AddDocsModal from '../../components/modals/AddDocsModal';

/**
 * This class provides the student profile component to dashboard.js.
 * @class
 * @version 0.1
 * @see react
 * @see styles/profile.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const ProfileStudent = ({
  userState,
  setCurrentComponent,
  setIsProfileUpdated,
}) => {
  const { getUser } = useAuth();
  const [user, setUser] = useState(userState);
  const [formData, setFormData] = useState(user);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errorsObject, setErrorsObject] = useState({});
  const [avatar, setAvatar] = useState('');
  const [isNewAvatarUploaded, setIsNewAvatarUploaded] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(false);
  const avatarData = new FormData();
  const pdfFormData = new FormData();
  const [pdfFile, setPdfFile] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const [docsBtnHover, setDocsBtnHover] = useState(false);
  const [docsModal, setDocsModal] = useState(false);
  const [pdfObj, setPdfObj] = useState([]);

  const hintData = school.map((item) => {
    return item.institution;
  });

  const isError = () => {
    for (const key in errorsObject) {
      if (errorsObject[key] !== '') return true;
    }
    return false;
  };

  const openModal = () => {
    if (pdfObj.length >= 5) {
      toastFail('Maximum documents reached!');
      return;
    }
    setDocsModal(true);
  };

  if (docsModal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const deletePdfFile = (index) => {
    setPdfObj(pdfObj.filter((_, i) => i !== index));
  };

  /**
   * This function handles changes in the text fields of the form
   * @function
   * @param {Event} event - The event from the onChange event attribute of the text fields
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    validateForm(e, errorsObject, setErrorsObject, formData);
  };

  const UpdateProfileHandler = async (e) => {
    e.preventDefault();
    if (!_.isEqual(formData, user)) {
      try {
        const config = {
          method: 'put',
          url: `${process.env.REACT_APP_API}/api/users/update-user`,
          data: formData,
        };

        const { data } = await axios(config);

        if (pdfObj.length > 0) {
          uploadPDF();
          setIsNewPdf(false);
        }
        setIsUpdated(true);
        toastSuccess(data);
        setIsProfileUpdated(true);
        setCurrentComponent((prev) => prev - 1);
      } catch (err) {
        toastFail(err.response?.data.msg);
        return;
      }
    } else if (pdfObj.length > 0) {
      const res = await uploadPDF();
      if (res.msg) {
        toastSuccess(
          'File successfully uploaded! Navigate to my document page to view your new documents!'
        );
        setCurrentComponent((prev) => prev - 1);
      } else {
        toastFail('Something went wrong! Please try again later!');
      }
    } else {
      toastFail('Nothing to update');
      return;
    }
  };

  const updateProfileImageHandler = async (e) => {
    let avatarFile = e.target.files[0];
    avatarData.append('userID', user._id);
    avatarData.append('photo', avatarFile);

    const res = await axios.patch(
      `${process.env.REACT_APP_API}/api/users/upload-avatar`,
      avatarData
    );

    if (res.data.error) {
      setHasAvatar(false);
      console.error(res.data.error);
      return;
    }
    setHasAvatar(true);
    setIsNewAvatarUploaded(!isNewAvatarUploaded);
    setIsProfileUpdated(true);
  };

  const uploadPDF = async () => {
    let res;
    pdfFormData.append('userId', user._id);
    pdfFormData.append('userType', user.userType);

    for (let i = 0; i < pdfFile.length; i++) {
      pdfFormData.append('pdfObject', JSON.stringify(pdfObj[i]));
      pdfFormData.append('pdf', pdfFile[i]);
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API}/api/users/upload-pdf`,
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
    }
    return res;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/users/avatar/${user.avatar}`
        );
        if (res.data.error) {
          setAvatar('');
          setHasAvatar(false);
          return;
        }
        setHasAvatar(true);
        setAvatar(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const res = await getUser();
      setUser(res);
      setFormData(res);
    })();
  }, [isUpdated, isNewAvatarUploaded]);

  return (
    <div className='profile-page-container-stud'>
      <div className='profile-container-stud'>
        <div className='column-left-wrapper'>
          <div className='column-left-stud'>
            {hasAvatar ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: blue500,
                    fontWeight: 600,
                    fontSize: '3em',
                    height: 150,
                    width: 150,
                  }}
                  src={avatar}
                />
              </>
            ) : (
              <>
                {formData.username && (
                  <Avatar
                    sx={{
                      bgcolor: blue500,
                      fontWeight: 600,
                      fontSize: '3em',
                      height: 150,
                      width: 150,
                    }}
                  >
                    {formData.username[0].toUpperCase()}
                  </Avatar>
                )}
              </>
            )}

            <br />
            <br />
            <label>Change Profile Image</label>
            <br />
            <input
              type='file'
              name='profileImage'
              accept='.jpg, .jpeg, .png'
              onChange={updateProfileImageHandler}
            />
            <br />
          </div>
        </div>

        <div className='column-right-wrapper-stud'>
          <div className='fields'>
            <label>First Name:</label>
            <br />
            <input
              value={formData.firstName}
              id='firstName'
              type='text'
              onChange={(e) => handleChange(e)}
            />

            <label>Last Name:</label>
            <br />
            <input
              value={formData.lastName}
              id='lastName'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>My Journey:</label>
            <textarea
              value={formData.bio}
              id='bio'
              type='text'
              onChange={(e) => handleChange(e)}
              rows='4'
              cols='50'
            />

            <br />
            <label>Email:</label>
            <br />
            <input
              value={formData.email}
              id='email'
              type='email'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Address: </label>
            <br />
            <input
              value={formData.addressStreet}
              id='addressStreet'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>City: </label>
            <br />
            <input
              value={formData.addressCity}
              id='addressCity'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>
              State:
              <SelectUSState
                type='text'
                required
                onLoad='AL'
                onChange={(e) => setFormData({ ...formData, addressState: e })}
              />
            </label>

            <hr />
            <br />
            <label>Institution:</label>
            <Hint options={hintData} allowTabFill>
              <input
                value={formData.institution}
                id='institution'
                type='text'
                onChange={(e) => handleChange(e)}
                required
              />
            </Hint>

            <label>Graduation Year: </label>
            <br />
            <input
              value={formData.gradYear}
              id='gradYear'
              type='number'
              min='2022'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>GPA: </label>
            <br />
            <input
              value={formData.gpa}
              id='gpa'
              type='number'
              min='0'
              max='4'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Phone Number: </label>
            <br />
            <input
              value={formData.userPhoneNumber}
              id='userPhoneNumber'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <a href='#'>Change Password? </a>

            <br />

            <hr className='header-spacing' />

            <h3> Documents </h3>
            <div
              className='add-docs-btn'
              onMouseOver={() => setDocsBtnHover(!docsBtnHover)}
              onMouseOut={() => setDocsBtnHover(!docsBtnHover)}
              onClick={openModal}
            >
              {docsBtnHover ? (
                <div className='add-docs-btn-icon'>
                  <IconContext.Provider
                    value={{
                      size: '30px',
                      style: {
                        color: '#fff',
                        transition: 'ease-in-out 0.3s',
                      },
                    }}
                  >
                    <div>
                      <AiOutlineFileAdd />
                    </div>
                  </IconContext.Provider>
                </div>
              ) : (
                <div className='add-docs-btn-icon'>
                  <IconContext.Provider
                    value={{
                      size: '30px',
                      style: {
                        color: '#26506c',
                        transition: 'ease-in-out 0.3s',
                      },
                    }}
                  >
                    <div>
                      <AiOutlineFileAdd />
                    </div>
                  </IconContext.Provider>
                </div>
              )}

              <div className='add-docs-btn-title'>Add New Documents</div>
            </div>
            <div className='docs-small-wrapper'>
              <small>Maximum 5 documents at a time</small>
              <div>{pdfObj.length} / 5</div>
            </div>

            {docsModal && (
              <AddDocsModal
                userType={user.userType}
                setDocsModal={setDocsModal}
                setPdfFile={setPdfFile}
                pdfFile={pdfFile}
                setPdfObj={setPdfObj}
                pdfObj={pdfObj}
                setIsNewPdf={setIsNewPdf}
              />
            )}
            {pdfObj.length > 0 &&
              pdfObj.map((obj, index) => {
                const fileNameArr = obj.fileName.split('.');
                let fileName = '';
                if (fileNameArr[0].length > 10) {
                  fileName = `${fileNameArr[0].slice(
                    0,
                    3
                  )} ... ${fileNameArr[0].slice(
                    fileNameArr[0].length - 5
                  )}.PDF`;
                } else {
                  fileName = obj.fileName;
                }
                return (
                  <div className='document-info' key={index}>
                    <div className='doc-name-wrapper'>
                      <div className='doc-name'>{obj.docName}</div>
                      <div className='file-name'>{fileName}</div>
                    </div>
                    <div className='doc-type'>{obj.docType}</div>
                    <div
                      className='doc-icon'
                      onClick={() => {
                        deletePdfFile(index);
                      }}
                    >
                      X
                    </div>
                  </div>
                );
              })}

            <hr className='header-spacing' />

            <h3> Social Medias </h3>

            <label>Portfolio: </label>
            <br />
            <input
              value={formData.linkPortfolio}
              id='linkPortfolio'
              placeholder='https://my-portfolio.com/....'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Linkedin: </label>
            <br />
            <input
              value={formData.linkLinkedIn}
              id='linkLinkedIn'
              placeholder='https://linkedin.com/...'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Twitter: </label>
            <br />
            <input
              value={formData.linkTwitter}
              id='linkTwitter'
              placeholder='https://twitter.com/...'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Other: </label>
            <br />
            <input
              value={formData.linkOther}
              id='linkOther'
              placeholder='https://other-social-media.com/...'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <ul>
              {Object.keys(errorsObject).map((key, index) => {
                if (errorsObject[key] != '') {
                  return (
                    <li
                      className='error-message'
                      key={index}
                      style={{ color: 'red' }}
                    >
                      {errorsObject[key]}
                    </li>
                  );
                }
              })}
            </ul>

            <div className='stud-btn-wrapper'>
              <div
                className='stud-back-btn'
                variant='primary'
                onClick={() => setCurrentComponent((prev) => prev - 1)}
                disabled={isError()}
              >
                Back
              </div>
              <div
                className='stud-update-btn'
                variant='primary'
                onClick={UpdateProfileHandler}
                disabled={isError()}
              >
                Update Profile
              </div>
            </div>
          </div>
          <ToastContainer position='bottom-right' hideProgressBar={false} />
        </div>
      </div>
    </div>
  );
};

export default ProfileStudent;

import React, { useState } from 'react';
import '../../styles/profile-business.css';
import { toastFail, toastSuccess } from '../../utils/toastFuncs';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import {
  COMPANY_INDUSTRIES,
  COMPANY_SIZES,
} from '../../utils/constants';
import axios from 'axios';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify';
import SelectUSState from 'react-select-us-states';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import { validateForm } from '../../utils/fieldValidation';
import { IconContext } from 'react-icons';
import { AiOutlineFileAdd } from 'react-icons/ai';
import AddDocsModal from '../../components/modals/AddDocsModal';

/**
 * profileBusiness.js
 * @namespace Incomplete
 * @see Classes/ProfileBusiness
 */

/**
 * This class provides the business profile component to dashboard.js.
 * @class
 * @version 0.1
 * @todo Allow for profile customization and remove hard coded examples
 * @see react
 * @see styles/profile.css
 * @see react-router-dom
 * @see react-toastify
 * @see Modules/toastFuncs
 * @see Classes/Dashboard
 */
const ProfileBusiness = ({
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
  const [hasAvatar, setHasAvatar] = useState(false);
  const [isNewAvatarUploaded, setIsNewAvatarUploaded] = useState(false);
  const avatarData = new FormData();
  const pdfFormData = new FormData();
  const [pdfFile, setPdfFile] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const [docsBtnHover, setDocsBtnHover] = useState(false);
  const [docsModal, setDocsModal] = useState(false);
  const [pdfObj, setPdfObj] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    validateForm(e, errorsObject, setErrorsObject, formData);
  };

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

  const UpdateProfileHandler = async (e) => {
    e.preventDefault();
    if (!_.isEqual(formData, user)) {
      try {
        let config = {
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
        setIsProfileUpdated(true);
        toastSuccess(data);
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
        setIsProfileUpdated(true);
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
    if (e.target.files.length > 0) {
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
    }
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

  /**
   * This function provides the HTML formatting of the profileBusiness component to dashboard.js.
   * @function
   * @returns {HTMLCollection}
   * @see Classes/Dashboard
   */

  return (
    <div className='profile-page-container-business'>
      <div className='profile-container-business'>
        <div className='column-left-wrapper'>
          <div className='column-left-business'>
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
              className='profile-input'
              type='file'
              accept='.jpg, .jpeg, .png'
              name='profileImage'
              onChange={updateProfileImageHandler}
            />
            <br />
          </div>
        </div>

        <div className='column-right-wrapper-business'>
          <div className='fields'>
            <br />
            <label>Business Name: </label>
            <br />
            <input
              value={formData.businessName}
              id='businessName'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />
            <label>Business Division: </label>
            <br />
            <input
              value={formData.businessDivision}
              id='businessDivision'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Address: </label>
            <br />
            <input
              value={formData.businessStreet}
              id='businessStreet'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>City: </label>
            <br />
            <input
              value={formData.businessCity}
              id='businessCity'
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
                onChange={(e) => setFormData({ ...formData, businessState: e })}
              />
            </label>

            <label>Company Overview: </label>
            <br />

            <textarea
              value={formData.companyOverview}
              id='companyOverview'
              type='text'
              onChange={(e) => handleChange(e)}
              rows='4'
              cols='50'
            />

            <br />

            <label>Point of Contact</label>
            <br />
            <input
              value={formData.poc}
              id='poc'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <label>Email</label>
            <br />
            <input
              type='email'
              value={formData.email}
              id='email'
              required
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

            <label>Company's Industry: </label>
            <br />
            <select
              name='companyIndustry'
              onChange={(e) =>
                setFormData({ ...formData, companyIndustry: e.target.value })
              }
              value={
                formData.companyIndustry === ''
                  ? `Select an industry`
                  : formData.companyIndustry
              }
            >
              <option value=''>Select an industry </option>
              {COMPANY_INDUSTRIES.map((industry, index) => {
                return (
                  <option key={index} value={industry}>
                    {industry}
                  </option>
                );
              })}
            </select>

            <label>Company Size: </label>
            <select
              name='companySize'
              onChange={(e) =>
                setFormData({ ...formData, companySize: e.target.value })
              }
              value={
                formData.companySize === ''
                  ? `Select an industry`
                  : formData.companySize
              }
            >
              {COMPANY_SIZES.map((size, index) => {
                return (
                  <option key={index} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>

            <label>Company Type: </label>
            <select
              name='companyType'
              onChange={(e) =>
                setFormData({ ...formData, companyType: e.target.value })
              }
              value={
                formData.companyType === '' ? `Private` : formData.companyType
              }
            >
              <option value='Private'>Private</option>
              <option value='Public'>Public</option>
            </select>
            <br />

            <br />

            <a href='#'>Change Password? </a>

            <br />

            <h3> Documents </h3>
            <div
              className='add-docs-btn-business'
              onMouseOver={() => setDocsBtnHover(!docsBtnHover)}
              onMouseOut={() => setDocsBtnHover(!docsBtnHover)}
              onClick={openModal}
            >
              {docsBtnHover ? (
                <div className='add-docs-btn-icon-business'>
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
                <div className='add-docs-btn-icon-business'>
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

              <div className='add-docs-btn-title-business'>
                Add New Documents
              </div>
            </div>
            <div className='docs-small-wrapper-business'>
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
                  <div className='document-info-business' key={index}>
                    <div className='doc-name-wrapper-business'>
                      <div className='doc-name-business'>{obj.docName}</div>
                      <div className='file-name-business'>{fileName}</div>
                    </div>
                    <div className='doc-type-business'>{obj.docType}</div>
                    <div
                      className='doc-icon-business'
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

            <label>Company Website: </label>
            <br />
            <input
              value={formData.linkCompany}
              id='linkCompany'
              placeholder='https://my-portfolio.com/...'
              type='text'
              onChange={(e) => {
                const updatedFormData = {
                  ...formData,
                  linkCompany: e.target.value,
                };
                setFormData(updatedFormData);
              }}
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
              value={`${formData.linkOther}`}
              id='linkOther'
              placeholder='https://other-social-media.com/...'
              type='text'
              onChange={(e) => handleChange(e)}
            />
            <br />

            <ul>
              {Object.keys(errorsObject).map((key, index) => {
                if (errorsObject[key] !== '') {
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

            <div className='bus-btn-wrapper'>
              <div
                className='bus-back-btn'
                variant='primary'
                onClick={(e) => setCurrentComponent((prev) => prev - 1)}
                disabled={isError()}
              >
                Back
              </div>
              <div
                className='bus-update-btn'
                variant='primary'
                onClick={(e) => UpdateProfileHandler(e)}
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

export default ProfileBusiness;

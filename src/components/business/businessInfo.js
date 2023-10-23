/**
 * This module provides the formatting for the business information component to register.js
 * @module BusinessInfo
 * @version 0.1
 * @see react-select-us-states
 * @see Classes/Register
 */
import React, { useState } from 'react';
import SelectUSState from 'react-select-us-states';
import {
  COMPANY_INDUSTRIES,
  COMPANY_SIZES,
} from '../../utils/constants';
import { toastFail, toastSuccess } from '../../utils/toastFuncs';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import AddDocsModal from '../../components/modals/AddDocsModal';
import '../../styles/Dropdown.css';

/**
 * This function provides the HTML formatting of the second page of the business registration process to register.js
 * @function
 * @param { state, setFormDataBusiness, handleChange, handleFocusChange} props - The props passing from register.js
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function BusinessInfo({
  state,
  setFormDataBusiness,
  handleChange,
  handleFocusChange,
  handleProfileImageChange,
  setPdfFile,
  pdfFile,
  setPdfObj,
  pdfObj,
  setIsNewPdf,
}) {
  const [docsBtnHover, setDocsBtnHover] = useState(false);
  const [docsModal, setDocsModal] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <>
      <label>
        Profile Picture:
        <input
          type='file'
          accept='.jpg, .jpeg, .png'
          id='avatar'
          onChange={handleProfileImageChange}
        />
      </label>
      <br />

      <label>
        Business Name:
        <input
          value={state.businessName}
          id='businessName'
          type='text'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Division/Group:
        <input
          value={state.businessDivision}
          id='businessDivision'
          type='text'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Business Address:
        <input
          value={state.businessStreet}
          id='businessStreet'
          type='text'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Address Line 2:
        <input
          value={state.businessStreet2}
          id='businessStreet2'
          type='text'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        City:
        <input
          value={state.businessCity}
          id='businessCity'
          type='text'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        State:
        <SelectUSState
          value={state.businessState}
          type='text'
          required
          onLoad='AL'
          onChange={(e) => setFormDataBusiness({ ...state, businessState: e })}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Zip Code:
        <input
          value={state.businessZip}
          id='businessZip'
          type='text'
          minLength='5'
          maxLength='10'
          pattern='[0-9-]*'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Phone Number:
        <input
          value={state.userPhoneNumber}
          id='userPhoneNumber'
          type='text'
          minLength='10'
          maxLength='10'
          pattern='[0-9]*'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>Company's Industry: </label>
      <br />
      <select
        name='companyIndustry'
        onChange={(e) =>
          setFormDataBusiness({ ...state, companyIndustry: e.target.value })
        }
        value={
          state.companyIndustry === ''
            ? `Select an industry`
            : state.companyIndustry
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

      <label>Company Size:</label>
      <select
        name='companySize'
        onChange={(e) =>
          setFormDataBusiness({ ...state, companySize: e.target.value })
        }
        value={
          state.companySize === '' ? `Select a company size` : state.companySize
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
          setFormDataBusiness({ ...state, companyType: e.target.value })
        }
        value={state.companyType === '' ? `Private` : state.companyType}
      >
        <option value='Private'>Private</option>
        <option value='Public'>Public</option>
      </select>

      <hr className='page-spacing' />

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
          userType={'business'}
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
            )} ... ${fileNameArr[0].slice(fileNameArr[0].length - 5)}.PDF`;
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
      <hr className='page-spacing' />

      <label>
  Social Media:
  <button
    id="socialMediaToggle"
    onClick={(e) => {
      e.preventDefault();
      setDropdownOpen(!isDropdownOpen);
    }}
  >
    ▼
  </button>
  <div className="dropdown-container">
  <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
      <label>
        Company Website:
        <input
          value={state.linkCompany}
          id="linkCompany"
          placeholder="https://my-portfolio.com/..."
          type="text"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        LinkedIn:
        <input
          value={state.linkLinkedIn}
          id="linkLinkedIn"
          placeholder="https://linkedin.com/..."
          type="text"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Twitter:
        <input
          value={state.linkTwitter}
          id="linkTwitter"
          placeholder="https://twitter.com/..."
          type="text"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        Other Social Media:
        <input
          value={state.linkOther}
          id="linkOther"
          placeholder="https://other-social-media.com/..."
          type="text"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>
    </div>
  </div>
</label>

    </>
  );
}

export default BusinessInfo;

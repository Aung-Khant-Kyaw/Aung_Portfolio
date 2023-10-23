/**
 * This module provides the formattting for the student information component to register.js.
 * @module StudentInfo
 * @version 0.1
 * @see react-autocomplete-hint
 * @see Classes/Register
 */
import { Hint } from 'react-autocomplete-hint';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toastFail, toastSuccess } from '../../utils/toastFuncs';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import AddDocsModal from '../../components/modals/AddDocsModal';

/**
 * This function provides the HTML formatting for the second page of the student registration process to register.js.
 * @function
 * @param {state, hintData, handleChange, handleFocusChange} props - State information from register.js that calls this function
 * @returns {HTMLCollection}
 * @see Classes/Register
 */
function StudentInfo({
  state,
  hintData,
  handleChange,
  handleFocusChange,
  setPdfFile,
  pdfFile,
  setPdfObj,
  pdfObj,
  setIsNewPdf,
}) {
  const [docsBtnHover, setDocsBtnHover] = useState(false);
  const [docsModal, setDocsModal] = useState(false);

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
      <label>Institution:</label>
      <Hint options={hintData} allowTabFill>
        <input
          value={state.institution}
          id='institution'
          type='text'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
          required
        />
      </Hint>

      <label>
        Graduation Year:
        <input
          value={state.gradYear}
          id='gradYear'
          type='text'
          minLength='4'
          maxLength='4'
          max='2022'
          pattern='[0-9]*'
          required
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

      <label>
        GPA:
        <input
          value={state.gpa}
          id='gpa'
          type='number'
          step='0.01'
          maxLength='4'
          max='4'
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleFocusChange(e)}
        />
      </label>

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
          userType={'student'}
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
    </>
  );
}

export default StudentInfo;

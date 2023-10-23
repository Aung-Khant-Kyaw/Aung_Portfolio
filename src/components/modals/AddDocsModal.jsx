import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import '../../styles/addDocsModal.css';
import { toastFail } from '../../utils/toastFuncs';

const AddDocsModal = ({
  userType,
  setDocsModal,
  setPdfFile,
  pdfFile,
  pdfObj,
  setPdfObj,
  setIsNewPdf,
}) => {
  const [currentFile, setCurrentFile] = useState([]);
  const [formData, setFormData] = useState({
    docName: '',
    docType: userType === 'student' ? `RESUME` : `BROCHURE`,
    fileName: '',
  });

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setCurrentFile([file]);
      setFormData({ ...formData, fileName: file.name });
    }
  };

  const addDocs = () => {
    if (formData.docName === '') {
      toastFail('Document Name is required');
      return;
    } else if (formData.fileName === '') {
      toastFail('File is required');
      return;
    }
    setPdfFile([...pdfFile, currentFile[0]]);
    setPdfObj([...pdfObj, formData]);
    setIsNewPdf(true);
    setDocsModal(false);
  };

  return (
    <div className='modal-container'>
      <div className='modal-overlay' onClick={() => setDocsModal(false)}></div>
      <div className='modal-wrapper'>
        <div className='modal-header'>Adding a New Document</div>
        <div className='doc-info'>
          <div className='doc-name-wrapper'>
            <div className='doc-name'>Document Name</div>
            <input
              maxLength='40'
              required
              className='doc-name-input'
              type='text'
              placeholder='Document name...'
              onChange={(e) =>
                setFormData({ ...formData, docName: e.target.value })
              }
            />
          </div>
          {userType === 'student' ? (
            <div className='doc-file-wrapper'>
              <div className='doc-type'>Document Type</div>
              <select
                name='docType'
                onChange={(e) =>
                  setFormData({ ...formData, docType: e.target.value })
                }
              >
                <option value='RESUME'>Resume</option>
                <option value='COVER'>Cover Letter</option>
                <option value='TRANSCRIPT'>Transcript</option>
                <option value='OTHERS'>Others</option>
              </select>
            </div>
          ) : (
            <div className='doc-file-wrapper'>
              <div className='doc-type'>Document Type</div>
              <select
                name='docType'
                onChange={(e) =>
                  setFormData({ ...formData, docType: e.target.value })
                }
              >
                <option value='BROCHURE'>Brochure</option>
                <option value='OTHERS'>Others</option>
              </select>
            </div>
          )}
        </div>
        <div className='doc-file'>
          <div className='doc-file-header'>
            Drag and drop a PDF document here or select a file below
          </div>

          {currentFile.length > 0 ? (
            <div className='original-file'>
              {currentFile.length > 0 &&
                currentFile.map((file, index) => {
                  return file.name && <div key={index}>{file.name}</div>;
                })}
            </div>
          ) : (
            <div>
              <div className='doc-file-btn'>Select From Computer</div>
            </div>
          )}
          <input
            type='file'
            onChange={handleFileChange}
            accept='.pdf'
            required
          />
        </div>

        <div className='btn-wrapper'>
          <div className='cancle-btn' onClick={() => setDocsModal(false)}>
            Cancel
          </div>
          <div className='add-btn' onClick={addDocs}>
            Add
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-right' hideProgressBar={false} />
    </div>
  );
};

export default AddDocsModal;

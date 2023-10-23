import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import '../styles/DocumentAll.css';
import AddDocsModal from '../components/modals/AddDocsModal';
import ProfileStudent from '../pages/student/profileStudent';

const DocumentCard = ({ pdf }) => {
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

/**
 * This class provides the business profile component to dashboard.js.
 * @class
 * @version 0.1
 *
 *
 */
const DocumentAll = ({ userState }) => {
  const [pdfs, setPdfs] = useState([]);
  const [resumePdfs, setResumePdfs] = useState([]);
  const [transcriptPdfs, setTranscriptPdfs] = useState([]);
  const [coverPdfs, setCoverPdfs] = useState([]);
  const [brochurePdfs, setBrochurePdfs] = useState([]);
  const [otherPdfs, setOtherPdfs] = useState([]);
  const { user, getUser } = useAuth();
  const pdfFormData = new FormData();
  const [pdfFile, setPdfFile] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const [docsBtnHover, setDocsBtnHover] = useState(false);
  const [docsModal, setDocsModal] = useState(false);
  const [pdfObj, setPdfObj] = useState([]);
  const [userData, setUserData] = useState(user);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(0);

  const handleAddDocument = () => {
    setDocsModal(true);
  };

  const deleteResume = async (index) => {
    const deleted = resumePdfs.filter((_, i) => i === index);
    setResumePdfs(resumePdfs.filter((_, i) => i !== index));
    await axios.delete(
      `${process.env.REACT_APP_API}/api/users/deletestdfile/${deleted[0]._id}`
    );
  };

  const deleteTranscript = async (index) => {
    const deleted = transcriptPdfs.filter((_, i) => i === index);
    setTranscriptPdfs(transcriptPdfs.filter((_, i) => i !== index));
    await axios.delete(
      `${process.env.REACT_APP_API}/api/users/deletestdfile/${deleted[0]._id}`
    );
  };

  const deleteCover = async (index) => {
    const deleted = coverPdfs.filter((_, i) => i === index);
    setCoverPdfs(coverPdfs.filter((_, i) => i !== index));
    await axios.delete(
      `${process.env.REACT_APP_API}/api/users/deletestdfile/${deleted[0]._id}`
    );
  };

  const deleteBrochure = async (index) => {
    const deleted = brochurePdfs.filter((_, i) => i === index);
    setBrochurePdfs(brochurePdfs.filter((_, i) => i !== index));
    await axios.delete(
      `${process.env.REACT_APP_API}/api/users/deletebnfile/${deleted[0]._id}`
    );
  };

  const deleteOther = async (index) => {
    const deleted = otherPdfs.filter((_, i) => i === index);
    setOtherPdfs(otherPdfs.filter((_, i) => i !== index));
    if (userState.userType === 'student') {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/users/deletestdfile/${deleted[0]._id}`
      );
    } else {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/users/deletebnfile/${deleted[0]._id}`
      );
    }
  };

  const deletePdfFile = (index) => {
    setPdfObj(pdfObj.filter((_, i) => i !== index));
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/users/file/${userState._id}`
      );
      setPdfs(data);
      setResumePdfs(data.filter((pdf) => pdf.documentType === 'RESUME'));
      setTranscriptPdfs(
        data.filter((pdf) => pdf.documentType === 'TRANSCRIPT')
      );
      setCoverPdfs(data.filter((pdf) => pdf.documentType === 'COVER'));
      setBrochurePdfs(data.filter((pdf) => pdf.documentType === 'BROCHURE'));
      setOtherPdfs(data.filter((pdf) => pdf.documentType === 'OTHERS'));
    })();
  }, []);

  return (
    <div className='document-wrapper'>
      <div className='document-container'>
        {(pdfs.length > 0 ||
          brochurePdfs.length > 0 ||
          otherPdfs.length > 0) && (
          <div className='document-header'>Documents</div>
        )}
        <div className='document-content'>
          {user.userType === 'student' ? (
            <>
              {resumePdfs.length > 0 && (
                <div className='resume'>
                  <div className='document-std-content-header'>
                    <div className='document-std-content-header-name'>
                      Resumes
                    </div>
                    <div className='document-std-content-header-date'>
                      {resumePdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {resumePdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteResume(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {transcriptPdfs.length > 0 && (
                <div className='transcript'>
                  <div className='document-std-content-header'>
                    <div className='document-std-content-header-name'>
                      Transcripts
                    </div>
                    <div className='document-std-content-header-date'>
                      {transcriptPdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {transcriptPdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteTranscript(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {coverPdfs.length > 0 && (
                <div className='cover'>
                  <div className='document-std-content-header'>
                    <div className='document-std-content-header-name'>
                      Cover Letters
                    </div>
                    <div className='document-std-content-header-date'>
                      {coverPdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {coverPdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteCover(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {otherPdfs.length > 0 && (
                <div className='others'>
                  <div className='document-content-header'>
                    <div className='document-content-header-name'>Others</div>
                    <div className='document-content-header-date'>
                      {otherPdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {otherPdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteOther(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {brochurePdfs.length > 0 && (
                <div className='brochure'>
                  <div className='document-content-header'>
                    <div className='document-content-header-name'>Brochure</div>
                    <div className='document-content-header-date'>
                      {brochurePdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {brochurePdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteBrochure(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {otherPdfs.length > 0 && (
                <div className='others'>
                  <div className='document-content-header'>
                    <div className='document-content-header-name'>Others</div>
                    <div className='document-content-header-date'>
                      {otherPdfs.length > 0 ? `Date added` : ``}
                    </div>
                  </div>
                  {otherPdfs.map((pdf, index) => (
                    <div className='document-doc-delete-wrapper' key={index}>
                      <DocumentCard pdf={pdf} />
                      <div
                        className='doc-icon'
                        onClick={() => {
                          deleteOther(index);
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {pdfs.length === 0 &&
          brochurePdfs.length === 0 &&
          otherPdfs.length === 0 && (
            <div className='documents'>
              <div className='document-content'>
                <div className='nothing-to-show'>
                  Edit your profile to Add Documents.
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default DocumentAll;

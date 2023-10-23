import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../application/Input';
import Avatar from '@mui/material/Avatar';
import { blue500 } from 'material-ui/styles/colors';
import { validateForm } from '../../utils/fieldValidation';

import '../../styles/studentApp.css';
import '../../styles/forms.css';

export default function AppModal({
  isAppModalOpen,
  closeAppModal,
  submitMessage,
  user,
  jobTitle,
  jobID,
  businessID,
  applied,
}) {
  const [appTemplate, setAppTemplate] = useState([]);
  const [formData, setFormData] = useState({
    studentId: user._id,
    jobId: jobID,
    applicationStatus: 'pending',
    answers: [],
  });
  const [avatar, setAvatar] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [pdfFormData, setPdfFormData] = useState([]);
  const [isNewPdf, setIsNewPdf] = useState(false);
  const pdfSubmitData = new FormData();
  const [errors, setErrors] = useState([]);
  const [errorsObject, setErrorsObject] = useState({});
  const defaultValues = {
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    'Phone Number': user.userPhoneNumber,
    City: user.addressCity,
    State: user.addressState,
  };

  // runs the functions to get the application questions and business info on the first render
  useEffect(() => {
    fetchQuestions();
    fetchBusinessInfo();
  }, []);

  // adds info to formData and pdfFormData after the appTemplate is changed
  useEffect(() => {
    let answersArray = appTemplate.map((x) => ({
      ['questionId']: x._id,
      ['answer']: [defaultValues[x.prompt] || ''],
    }));

    setFormData({
      ...formData,
      answers: answersArray,
    });

    let filesArray = appTemplate.filter((question) => question.type === 'file');
    setPdfFormData(
      filesArray.map((x) => ({
        ['questionId']: x._id,
        ['docType']: x.options[0],
      }))
    );
  }, [appTemplate]);

  // this function gets the application questions from the database
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/applications/all/${businessID}`
      );
      // add the applicationTemplateID to formData
      setFormData({ ...formData, applicationTemplateId: res.data[0]._id });
      setAppTemplate(res.data[0].questions); //store the questions in appTemplate
    } catch {
      console.log('Error getting application questions');
    }
  };

  //The function gets the business name and avatar from the database
  const fetchBusinessInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/users/busicard/${businessID}`
      );
      setAvatar(`profile_images/${res.data.avatar}`);
      setBusinessName(res.data.businessName);
    } catch {
      console.log('Error getting Business Name and its avatar from API');
    }
  };

  //The function renders the application questions using the Input.jsx component
  const renderQuestions = () => {
    return appTemplate.map(function (element) {
      return (
        <Input
          key={element._id}
          prompt={element.prompt}
          type={element.type}
          questionId={element._id}
          options={element.options}
          defaultValues={defaultValues}
          change={(e) => {
            handleChange(e);
          }}
        ></Input>
      );
    });
  };

  //This function stores the input values in formData or pdfFormData when there's a change to an input element
  const handleChange = (e) => {
    //loop through formdata to find matching questionId
    for (let i = 0; i < formData.answers.length; i++) {
      if (formData.answers[i].questionId === e.target.name) {
        let answers = formData.answers;
        //if a file is added
        if (e.target.attributes[0].value === 'file') {
          //the filename is stored in formData. Maybe change this depending on what's needed for fetching the file later.
          answers[i] = { ...answers[i], ['answer']: [e.target.files[0].name] };
          setIsNewPdf(true);
          //file name and the file are added to pdfFormData
          setPdfFormData(
            pdfFormData.map((item) => {
              if (item.questionId === e.target.name) {
                return {
                  ...item,
                  ['fileName']: e.target.files[0].name,
                  ['file']: e.target.files[0],
                };
              } else {
                return item;
              }
            })
          );
        } else if (e.target.id === 'docName') {
          //if the docName input is changed
          setPdfFormData(
            pdfFormData.map((item) => {
              if (item.questionId === e.target.name) {
                return { ...item, ['docName']: e.target.value };
              } else {
                return item;
              }
            })
          );
        } else if (e.target.attributes[0].value === 'checkbox') {
          // if box is checked, push the value to the array
          if (e.target.checked === true) {
            answers[i].answer.push(e.target.value);
          } else {
            // if box is unchecked, find index of value, then remove it from the array
            const index = answers[i].answer.indexOf(e.target.value);
            if (index > -1) {
              // only splice array when item is found
              answers[i].answer.splice(index, 1); //2nd parameter means remove one item only
            }
          }
        } else {
          answers[i] = { ...answers[i], ['answer']: [e.target.value] };
        }

        setFormData({
          ...formData,
          answers: answers,
        });

        validateForm(e, errorsObject, setErrorsObject, formData);
      }
    }
  };

  //add code for saving a draft of the applicaiton here
  const saveAppDraft = () => {
    console.log('Save Draft');
  };

  /**
   * This function check if errorsObject is clear or not.
   * Used to turn decide to disable the next and submit buttons
   * @returns boolean
   */
  const isError = () => {
    for (const key in errorsObject) {
      if (errorsObject[key] != '') return true;
    }
    return false;
  };
  //this function is for submitting the application. Posts the formData to the database and calls the uploadPDF function.
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit');

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/applications/studentApp`,
        formData
      );
      if (isNewPdf) {
        uploadPDF(user._id);
      }
      submitMessage();
      closeAppModal();
      applied();
    } catch (e) {
      const err = e.response.data.errors;
      if (err) {
        err.forEach((error) => {
          console.error(error.msg);
          setErrors(`${error.msg}`);
        });
      }
    }
  };

  //This function uploads the pdf information to the database with the pdf_uploader middleware.
  const uploadPDF = async (id) => {
    let res;
    pdfSubmitData.append('userId', id);
    pdfSubmitData.append('userType', user.userType);

    for (let i = 0; i < pdfFormData.length; i++) {
      const pdfObject = {
        ['docName']: pdfFormData[i].docName,
        ['docType']: pdfFormData[i].docType,
        ['fileName']: pdfFormData[i].fileName,
      };

      pdfSubmitData.append('pdfObject', JSON.stringify(pdfObject));
      pdfSubmitData.append('pdf', pdfFormData[i].file);
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API}/api/users/upload-pdf`,
        data: pdfSubmitData,
      };
      try {
        const response = await axios(config);
        res = response.data;
        pdfSubmitData.delete('pdfObject');
        pdfSubmitData.delete('pdf');
      } catch (error) {
        return error;
      }
    }
    return res;
  };

  return (
    <div>
      {isAppModalOpen && (
        <div className='app-modal-wrapper'>
          <h1 className='app-modal-header'> {jobTitle} Application</h1>
          <div className='app-modal-business-info'>
            <Avatar
              sx={{
                bgcolor: blue500,
                height: 50,
                width: 50,
              }}
              src={avatar}
            />
            <h2> {businessName}</h2>
          </div>
          {/* <div>{location}</div> */}
          <form className='app-form' onSubmit={(e) => onSubmit(e)}>
            {renderQuestions()}
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
            {errors !== '' ? (
              <div className='error'>{errors}</div>
            ) : (
              <div></div>
            )}
            <div className='app-btn-wrapper'>
              <button
                className='app-close-btn'
                type='button'
                onClick={closeAppModal}
              >
                Close
              </button>
              {/* <button
                  className='app-save-btn'
                  type='button'
                  onClick={saveAppDraft}
                >
                  Save Draft
                </button> */}
              <button
                className='app-submit-btn'
                type='submit'
                disabled={isError()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

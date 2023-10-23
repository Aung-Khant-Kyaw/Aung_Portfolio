import '../../styles/studentApp.css';
import { useState } from 'react';
import { usStates } from '../../utils/constants';

function Input({ prompt, type, questionId, options, defaultValues, change }) {
  //file, radio, and checkbox have unique code, so "useGeneral" is false for these types.
  let useGeneral = true;
  const [selectedState, setSelectedState] = useState(defaultValues['State']);
  const statesArray = Object.keys(usStates).map((abbreviation) => ({
    abbreviation,
    name: usStates[abbreviation],
  }));

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      {prompt === 'State' && (
        <>
          {(useGeneral = false)}
          <label htmlFor={prompt}>{prompt}:</label>
          <select
            value={selectedState}
            id={prompt}
            name={questionId}
            required
            onChange={(e) => {
              handleStateChange(e);
              change(e);
            }}
          >
            {statesArray.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
          <br></br>
        </>
      )}

      {(type === 'radio' || type === 'checkbox') && (
        <div>
          {/* don't use the general input code */}
          {(useGeneral = false)}
          <h4>{prompt}:</h4>
          {options.map((option) => {
            return (
              // this div needs a key or a warning shows up
              <div key={`${questionId}.${option}`}>
                <label htmlFor={option}>{option}</label>
                <input
                  type={type}
                  value={option}
                  id={option}
                  name={questionId}
                  onChange={change}
                ></input>
                <br></br>
              </div>
            );
          })}
          <br></br>
        </div>
      )}

      {type === 'file' && (
        <>
          {/* don't use the general input code */}
          {(useGeneral = false)}
          <label htmlFor={prompt}>{prompt}:</label>

          <label htmlFor='docName' className='app-file-label'>
            Document Name:{' '}
          </label>
          {/* text input for the document name */}
          <input
            type='text'
            id='docName'
            name={questionId}
            onChange={change}
            required
          ></input>
          {/* input for adding the file */}
          <p className='sub-text-app'>Formats Accepted: PDF </p>
          <input
            type={type}
            id={prompt}
            name={questionId}
            accept='.pdf'
            onChange={change}
            required
          />
        </>
      )}

      {useGeneral && (
        <>
          <label htmlFor={prompt}>{prompt}:</label>
          <input
            type={type}
            id={prompt}
            name={questionId}
            onChange={change}
            defaultValue={defaultValues[prompt] || ''}
            required
          />
          <br></br>
        </>
      )}
    </>
  );
}

export default Input;

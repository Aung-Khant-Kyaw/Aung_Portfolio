export default function SubmitJob({isOpen, setCurrentComponent, setIsOpen}) {
  const confirm = () => {
    setCurrentComponent('JOBS-POSTED')
  }

  return (
    <div>
      {isOpen &&
        <div className='modal-container'>
          <div className='modal-overlay'></div>
          <div className='submit-modal-wrapper'>
            <h1 className='submit-modal-header'>Job Successfully Created!</h1>
            <div className='submit-btn-wrapper'>
              <button className='close-btn' onClick={()=> {setIsOpen(false); confirm()}}>
                Close
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

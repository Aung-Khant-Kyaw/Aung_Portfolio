export default function AdminConfirmModal({isOpen, close}) {
  
    return (
      <div>
        {isOpen && 
          <div className='modal-container'>
            <div className='modal-overlay'></div>
            <div className='submit-modal-wrapper'>
              <h1 className='submit-modal-header'>Email Sent.</h1>
              <p>The admin will get an email with a unique link to register admin account.</p>
              <div className='submit-btn-wrapper'>
                <button className='close-btn' onClick={close}>
                  Close
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  };
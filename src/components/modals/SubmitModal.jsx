export default function SubmitModal({isOpen, close}) {
  
  return (
    <div>
      {isOpen && 
        <div className='modal-container'>
          <div className='modal-overlay'></div>
          <div className='submit-modal-wrapper'>
            <h1 className='submit-modal-header'>Message Submitted!</h1>
            <p>Thank you for your message. We will respond as soon as possible.</p>
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
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './EmailModal.css';

const SendEmailModal = ({ isOpen, onRequestClose, onSendEmail, eventType, clickedDate }) => {
  const [emailDetails, setEmailDetails] = useState({
    name: '',
    email: '',
    message: '',
    subject: eventType === 'buy' ? 'Buy Day' : 'Sell Day'
  });

  const handleInputChange = (event) => {
    setEmailDetails({ ...emailDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedMessage = `Date: ${clickedDate}\n\n${emailDetails.message}`;
    onSendEmail({ ...emailDetails, message: updatedMessage });
    onRequestClose();
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} className="email-modal">
      <div>
        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="text"
            name="name"
            value={emailDetails.name}
            onChange={handleInputChange}
            placeholder="Your name here"
            required
          />
          <input
            type="email"
            name="email"
            value={emailDetails.email}
            onChange={handleInputChange}
            placeholder="Your email here"
            required
          />
          <textarea
            name="message"
            value={emailDetails.message}
            onChange={handleInputChange}
            placeholder="Please put in your childs name here along with any other relevant information"
            required
          />
          <button type="submit" className="send-button">Send Email</button>
        </form>
      </div>
    </ReactModal>
  );
};

export default SendEmailModal;
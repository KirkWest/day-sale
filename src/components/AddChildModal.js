import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { addCalendarChild } from '../services/apiFunctions';
import './AddChildModal.css';

const AddChildModal = ({ isLoading, isOpen, onRequestClose, date, refreshEvents }) => {
  const [childName, setChildName] = useState('');
  const[error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // added in error handling for submitting an empty field
    if (!childName.trim()) {
      setError("The name cannot be empty");
      return;
    }

    // uses our addcalendarchild api function from apiFunctions.js
    await addCalendarChild(date, childName);

    setChildName('');
    refreshEvents(); // this should refresh so the app registers the new database information
    onRequestClose();
  };

  return (
    <ReactModal
    className="add-child-format"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    >
      <form className="add-form-format" onSubmit={handleSubmit}>
        {error && <div className="add-error-message">{error}</div>}
        <input
          type="text"
          className="add-form-input"
          value={childName}
          onChange={(event) => {
            setChildName(event.target.value);
            setError('');
          }}
          placeholder="child's name here"
          required
        />
        <button type="submit" className="add-submit-button" disabled={isLoading}>{isLoading ? "Loading ..." : "Add Child"}</button>
      </form>
    </ReactModal>
  );
};

export default AddChildModal;
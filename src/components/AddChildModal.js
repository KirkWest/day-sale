import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { addCalendarChild } from '../services/apiFunctions';

const AddChildModal = ({ isOpen, onRequestClose, date, refreshEvents }) => {
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

  console.log(handleSubmit);
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          value={childName}
          onChange={(event) => {
            setChildName(event.target.value);
            setError('');
          }}
          placeholder="child's name here"
          required
        />
        <button type="submit">Add Child</button>
      </form>
    </ReactModal>
  );
};

export default AddChildModal;
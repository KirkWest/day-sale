import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { addCalendarChild, removeCalendarChild } from '../services/apiFunctions';
import './ManageChildrenModal.css'

const ManageChildrenModal = ({ isLoading, isOpen, onRequestClose, childrenNames, date, refreshEvents }) => {
  const [newChildName, setNewChildName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if(!newChildName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // uses our addcalendarchild api function from apiFunctions.js
    await addCalendarChild(date, newChildName);

    setNewChildName('');
    await refreshEvents(); // this will refresh and show the added name to that date
    setError(''); // clears error
  };

  const handleRemove = async (childName) => {
    // uses the removeCalendarChild api function from apiFunctions.js
    await removeCalendarChild(date, childName);

    if (childrenNames.length === 1) {
      onRequestClose();
    } else {
      // setting success message when child is removed
      setSuccessMessage('Child removed successfully');
      // success message leaves after 3 seconds
      setTimeout(() => setSuccessMessage(''), 2000);
    }
    await refreshEvents(); // should show the remaining names if any on that date
  };

  return (
    <ReactModal className="manage-child-format" isOpen={isOpen} onRequestClose={onRequestClose}>
      {error && <div className="manage-error-message">{error}</div>}
      {successMessage && <div className="manage-success-message">{successMessage}</div>}
      <ul className="child-name-list">
        {childrenNames.map((name, index) => (
          <li key={index} className="child-name-individual">
            {name}
            <button className="manage-remove-button" onClick={() => handleRemove(name)} disabled={isLoading}>{isLoading ? <div className="loader" /> : "Remove"}</button>
          </li>
        ))}
      </ul>
      <form className="manage-form-format">
        <input
          type="text"
          className="manage-form-input"
          value={newChildName}
          onChange={(event) => {
            setNewChildName(event.target.value);
            setError('');
          }}
          placeholder="child's name here"
        />
        <button type="button" className="manage-submit-button" onClick={handleAdd}>Add Child</button>
      </form>
    </ReactModal>
  );
};

export default ManageChildrenModal;
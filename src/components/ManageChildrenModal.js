import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { addCalendarChild, removeCalendarChild } from '../services/apiFunctions';

const ManageChildrenModal = ({isOpen, onRequestClose, childrenNames, date, refreshEvents }) => {
  const [newChildName, setNewChildName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if(!newChildName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    // uses our addcalendarchild api function from apiFunctions.js
    await addCalendarChild(date, newChildName);

    setNewChildName('');
    refreshEvents(); // this will refresh and show the added name to that date
    setError(''); // clears error
  };

  const handleRemove = async (childName) => {

    // uses the removeCalendarChild api function from apiFunctions.js
    await removeCalendarChild(date, childName);

    refreshEvents(); // should show the remaining names if any on that date
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {childrenNames.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => handleRemove(name)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newChildName}
        onChange={(event) => {
          setNewChildName(event.target.value);
          setError('');
        }}
        placeholder="child's name here"
      />
      <button onClick={handleAdd}>Add Child</button>
    </ReactModal>
  );
};

export default ManageChildrenModal;
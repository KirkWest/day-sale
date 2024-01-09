import React, { useState } from 'react';
import ReactModal from 'react-modal';

const AddChildModal = ({ isOpen, onRequestClose, onAddChild, date }) => {
  const [childName, setChildName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddChild(date, childName);
    onRequestClose();
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={childName}
          onChange={(event) => setChildName(event.target.value)}
          placeholder="child's name here"
          required
        />
        <button type="submit">Add Child</button>
      </form>
    </ReactModal>
  );
};

export default AddChildModal;
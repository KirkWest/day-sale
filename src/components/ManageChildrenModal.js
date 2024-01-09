import React, { useState } from 'react';
import ReactModal from 'react-modal';

const ManageChildrenModal = ({isOpen, onRequestClose, childrenNames, onRemoveChild, onAddChild, date }) => {
  const[newChildName, setNewChildName] = useState('');

  const handleAdd = () => {
    onAddChild(date, newChildName);
    setNewChildName('');
  }
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ul>
        {childrenNames.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => onRemoveChild(date, name)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newChildName}
        onChange={(event) => setNewChildName(event.target.value)}
        placeholder="Add new child here"
      />
      <button onClick={handleAdd}>Add Child</button>
    </ReactModal>
  );
};

export default ManageChildrenModal;
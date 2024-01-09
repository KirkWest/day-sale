import React from 'react';
import ReactModal from 'react-modal';

const ManageChildrenModal = ({isOpen, onRequestClose, childrenNames, onRemoveChild, onAddChild, date }) => {
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
      <button onClick={() => onAddChild(date)}>Add Child</button>
    </ReactModal>
  );
};

export default ManageChildrenModal;
import React from 'react';

const DropdownMenu = ({ onEdit, onDelete }) => {
  return (
    <div className="dropdown-menu">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default DropdownMenu;

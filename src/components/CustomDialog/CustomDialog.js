// CustomDialog.js
import React, { useRef } from 'react';
import './CustomDialog.css';

const CustomDialog = ({ isOpen, onClose, onSubmit, children }) => {
  const dialogRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - dialogRef.current.getBoundingClientRect().left,
      y: e.clientY - dialogRef.current.getBoundingClientRect().top,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      dialogRef.current.style.left = `${e.clientX - offset.current.x}px`;
      dialogRef.current.style.top = `${e.clientY - offset.current.y}px`;
      dialogRef.current.style.position = 'absolute'; // Make it absolute during dragging
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div 
        className="dialog-box" 
        ref={dialogRef} 
        onMouseDown={handleMouseDown}
        style={{ cursor: 'move' }} // Show move cursor
      >
        <div className="dialog-header">
          <h2>Dialog Title</h2>
          <button className="dialog-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-content">{children}</div>
        <div className="dialog-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;

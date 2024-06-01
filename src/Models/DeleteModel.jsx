import React from 'react';
import './DeleteModel.css'; // Import CSS file for styling

function DeleteModel({ isOpen, onClose, onConfirm ,text}) {
  const handleConfirmDelete = () => {
    // Perform delete action here
    // You can add your delete logic or call delete function passed as props
    // Example: onDelete()
    onConfirm();
  };

  return (
    <div className={`absolute z-40 delete-model-container ${isOpen ? 'show' : ''}`}>
      {isOpen && (
        <div className="delete-overlay" onClick={onClose}></div>
      )}
      {isOpen && (
        <div className="delete-model">
          <div className="delete-model-content">
            <p className='text-medium font-bold'>{text}</p>
            <div className="button-container">
              <button className="confirm-button" onClick={handleConfirmDelete}>Yes, Delete</button>
              <button className="cancel-button" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModel;

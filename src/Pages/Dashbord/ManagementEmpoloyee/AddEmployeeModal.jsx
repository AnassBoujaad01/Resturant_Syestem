import React, { useState } from 'react';
import Modal from 'react-modal';
import Keyboard from '../../../Components/keyboard'; // Import your Keyboard component here

Modal.setAppElement('#root');

function AddEmployeeModal({ isOpen, onRequestClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    password: '',
    image: null
  });
  const [activeInput, setActiveInput] = useState(null);
  const [backspaceTimeout, setBackspaceTimeout] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false); // Added state for keyboard visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'password' ? parseInt(value) || formData.password : value; // Parse value as an integer for the password field
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleInputClick = (inputName) => {
    setActiveInput(inputName);
    setIsKeyboardOpen(true); // Open keyboard when input is clicked
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case 'Backspace':
        handleBackspace();
        break;
      case 'Enter':
        setIsKeyboardOpen(false);
        break;
      default:
        if (activeInput) {
          handleInputChange({ target: { name: activeInput, value: formData[activeInput] + key } });
        }
        break;
    }

    // Clear input after 3 seconds if the "Backspace" button is clicked
    if (key === 'Backspace') {
      clearTimeout(backspaceTimeout);
      setBackspaceTimeout(setTimeout(() => {
        setFormData({ ...formData, [activeInput]: '' });
      }, 3000));
    }
  };

  const handleBackspace = () => {
    if (activeInput === 'password') {
      const passwordAsString = String(formData.password); // Convert password to string
      const updatedPassword = passwordAsString.slice(0, -1); // Remove the last character
      setFormData({ ...formData, password: parseInt(updatedPassword) || '' }); // Convert back to number
    } else {
      setFormData({ ...formData, [activeInput]: formData[activeInput].slice(0, -1) });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Employee"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl mb-4">Add Employee</h2>
      <form onSubmit={onAdd} className="space-y-4">
        <div>
          <label className="block text-sm">Full Name</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
              onClick={() => handleInputClick('name')}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <div className="relative">
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="border p-2 w-full"
              onClick={() => handleInputClick('role')}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border p-2 w-full"
              onClick={() => handleInputClick('password')}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Profile Image</label>
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className="border p-2 w-full"
            accept="image/*"
            required
          />
        </div>
        {isKeyboardOpen && (
          <Keyboard onKeyPress={handleKeyPress} className="relative bottom-0 left-0" />
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddEmployeeModal;

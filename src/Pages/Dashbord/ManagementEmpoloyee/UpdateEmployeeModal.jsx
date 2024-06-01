import React, { useState } from 'react';
import Modal from 'react-modal';
import Keyboard from '../../../Components/keyboard'; // Import your Keyboard component here

Modal.setAppElement('#root');

function UpdateEmployeeModal({ isOpen, onRequestClose, employee, onUpdate }) {
  const [name, setName] = useState(employee.name);
  const [role, setRole] = useState(employee.role);
  const [password, setPassword] = useState(employee.password);
  const [image, setImage] = useState(employee.image);
  const [activeField, setActiveField] = useState(null); // State to keep track of active input field
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...employee, name, role, password, image }); // Update all fields
    onRequestClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (activeField) {
      case 'name':
        setName(value);
        break;
      case 'role':
        setRole(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleInputClick = (field) => {
    setIsKeyboardOpen(true);
    setActiveField(field); // Set active input field
  };

  const handleKeyPress = (key) => {
    switch (key) {
      case 'Backspace':
        setPassword(password.slice(0, -1));
        break;
      default:
        setPassword(password + key);
        break;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Employee"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-2xl mb-4">Update Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            onClick={() => handleInputClick('name')} // Set active field on click
            required
          />
        </div>
        <div>
          <label className="block text-sm">Role</label>
          <input
            type="text"
            name="role"
            value={role}
            onChange={handleInputChange}
            className="border p-2 w-full"
            onClick={() => handleInputClick('role')} // Set active field on click
            required
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="border p-2 w-full"
            onClick={() => handleInputClick('password')} // Set active field on click
            readOnly // Make password input read-only
          />
        </div>
        <div>
          <label className="block text-sm">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange} // Handle image change separately
            className="border p-2 w-full"
            accept="image/*"
          />
          {image && <img src={URL.createObjectURL(image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto mt-4" />}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
      {isKeyboardOpen && <Keyboard onKeyPress={handleKeyPress} />}
    </Modal>
  );
}

export default UpdateEmployeeModal;

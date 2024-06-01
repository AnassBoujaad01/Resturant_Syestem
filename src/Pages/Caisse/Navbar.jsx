// Navbar.js
import React, { useState } from 'react';
import téléchargerImage from '../../Image/télécharger1.jpg';
import LOGO from '../../Image/Logo.png';
import DropdownMenu from './DropdownMenu';

function Navbar() {
  // State variables for management data
  const [title, setTitle] = useState("RESTAURANT SYSTEM-MANAGEMENT");
  const [userData, setUserData] = useState({ Name: "ANASS BOUJAAD", Role: 'Cashier' });
  const [showMenu, setShowMenu] = useState(false);
  
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };


  return (
    <div className="flex justify-between items-center h-16 w-full bg-whiteColor text-darkColor p-10 border-yellowColor border-bottom-yellowColor" id="NavbarContainer ">
      {/* Logo */}
      <div className="flex items-center space-x-2 pl-4">
        <img src={LOGO} alt="Logo" className="h-32" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      {/* User Information and Menu */}
      <div className="relative cursor-pointer" onClick={handleMenuToggle}>
        <div className="flex items-center space-x-4 pr-4">
          <div className="rounded-full border-2 border-yellowColor overflow-hidden">
            <img src={téléchargerImage} alt="User" className="w-14 h-14 object-cover" />
          </div>
          <div>
            <p className="text-lg font-medium">{userData.Name}</p>
            <p className="text-sm text-gray-500">Role: {userData.Role}</p>
          </div>
        </div>
        {/* Dropdown Menu */}
        {showMenu &&<DropdownMenu />}
      </div>
    </div>
  );
}

export default Navbar;

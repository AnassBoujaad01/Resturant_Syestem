import React, { useState } from 'react';
import { IoMdInformationCircle } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { MdOutlineHeadsetMic } from "react-icons/md";
import LoginForm from './LoginForm';
import SquareIcons from '../../Components/SquareBtn';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [inputValue, setInputValue] = useState('');

  const handleBackspaceClick = () => {
    setInputValue(prevValue => prevValue.slice(0, -1));
  };

  const handleNumberClick = (number) => {
    setInputValue(prevValue => prevValue + number);
  };

  const handleUpdatedClick = () => {
    // Handle submission or validation here
    console.log("Password submitted:", inputValue);
  };

  const handlePowerClick = () => {
    // Handle power button click here
    console.log("Power button clicked");
  };

  return (
    <div className='relative flex flex-col justify-between h-screen' style={{ background: `linear-gradient(to bottom right, #ff7e5f, #feb47b, #9eb3ff)` }}>
      {/* Notification Bar */}
      <div className='flex justify-between items-center h-16 px-8 py-4 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-md shadow-md'>
        <div className='flex items-center'>
          <IoMdInformationCircle className='text-red-500 text-3xl mr-4'/>
          <p className='text-gray-800 font-bold'>TEST VERSION - REST 2 DAYS</p>
        </div>
        <button className='px-8 py-2 bg-blue-500 rounded-md text-white font-bold border border-blue-500 hover:text-blue-500 hover:bg-white'>
          Activate Here
        </button>
      </div>

      {/* Main Content */}
      <div className='flex justify-center  items-center h-full'>
        <div className='w-1/4 bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-md shadow-md'>
          {/* Authentication Form */}
          <LoginForm
            onBackspaceClick={handleBackspaceClick}
            onNumberClick={handleNumberClick}
            onUpdatedClick={handleUpdatedClick}
            inputValue={inputValue}
          />
          
          {/* Account Information (if needed) */}
        </div>
      </div>

      {/* Power and Mic Icons */}
      <div className='flex justify-end items-center h-[100px] p-8 gap-5'>
        <SquareIcons Icon={MdOutlineHeadsetMic} width={60} height={60} textColor='#699BF7' bgColor='white' hoverColor='white' onClick={handlePowerClick} />
        <SquareIcons Icon={FaPowerOff} width={60} height={60} textColor='#F11623' bgColor='white' hoverColor='white' onClick={handlePowerClick} />
      </div>
    </div>
  );
}

export default LoginPage;

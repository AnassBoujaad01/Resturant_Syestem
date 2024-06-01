import React from 'react';
import Cards from './Cards';
import SquareIcons from '../../Components/SquareBtn';
import { IoSettings } from "react-icons/io5";
import { GiBookmarklet } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";

function MenuApp() {
  return (
    <div className='relative w-full h-full flex flex-col bg-white-600'> {/* Added bg-white for white background */}
      {/* Header */}
      <div className='p-4 flex items-center justify-start h-16'>
        <button className='flex'>
          <IoArrowBack className="text-blue-600 text-3xl mr-2" />
          <span className='font-semibold text-2xl text-blue-600'>Back</span>
        </button>
      </div>
      
      {/* Content */}
      <div className='h-[85vh] flex-grow'>
        <Cards />
      </div>
      
      {/* Footer */}
      <div className='p-4 flex justify-end items-center h-16 gap-16'>
        <SquareIcons Icon={GiBookmarklet} width={60} height={60} textColor='#008CE7' bgColor='white' hoverColor='white' />
        <SquareIcons Icon={IoSettings} width={60} height={60} textColor='#F11623' bgColor='white' hoverColor='white' />
      </div>
    </div>
  );
}

export default MenuApp;

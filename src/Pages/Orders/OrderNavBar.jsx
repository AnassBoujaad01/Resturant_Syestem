import React, { useState } from 'react';
import SquareIcons from '../../Components/SquareBtn';
import { FcMoneyTransfer } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";
import { IoIosBackspace } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

function OrderNavBar({ onBackClick, onSelectPage }) { // Add onSelectPage prop
  const [page, setPage] = useState({
    bgColor: '#1ABF48',
    title: 'LIST ORDERS PAYMENT',
    selectedPage: 'Payment'
  });

  const handleIconClick = (bgColor, title, selectedPage) => {
    setPage({
      bgColor: bgColor,
      title: title,
      selectedPage: selectedPage
    });
    // Send the selected page to the parent component
    onSelectPage(selectedPage);
  };

  return (
    <div className='flex justify-center items-start'>
      <div className='p-4 absolute top-12 left-12 h-16'>
        <button className='flex items-center' onClick={onBackClick}>
          <IoArrowBack className="text-blue-600 text-3xl mr-2" />
          <span className='font-semibold text-2xl text-blue-600'>Back</span>
        </button>
      </div>
      <div className='relative bg-gray-50 bg-opacity-50 flex justify-around p-8 gap-12 rounded-md shadow-md'>
        <SquareIcons
          Icon={FcMoneyTransfer}
          width={60}
          height={60}
          textColor='white'
          bgColor={'whiteColor'}
          hoverColor='whiteColor'
          onClick={() => handleIconClick('#1ABF48', 'LIST ORDERS PAYMENT', 'Payment')}
        />
        <SquareIcons
          Icon={MdOutlinePendingActions}
          width={60}
          height={60}
          textColor='#F1B416'
          bgColor={'whiteColor'}
          hoverColor='whiteColor'
          onClick={() => handleIconClick('#F1B416', 'LIST PENDING ORDERS', 'Pending')}
        />
        <SquareIcons
          Icon={MdPlaylistRemove}
          width={60}
          height={60}
          textColor='#F11623'
          bgColor={'whiteColor'}
          hoverColor='whiteColor'
          onClick={() => handleIconClick('#F11623', 'LIST REMOVE ORDERS', 'Remove')}
        />
        <SquareIcons
          Icon={IoIosBackspace}
          width={60}
          height={60}
          textColor='#403F3F'
          bgColor={'whiteColor'}
          hoverColor='whiteColor'
          onClick={() => handleIconClick('#403F3F', 'LIST CANCEL ORDERS', 'Cancel')}
        />
        {/* Add more SquareIcons for other categories */}
        <div className={`absolute bottom-0 mx-auto rounded-xl w-96 h-2`} style={{ backgroundColor: page.bgColor }}></div>
      </div>

      <div className='p-4 absolute top-12 right-12 h-16 rounded-md bg-opacity-25' style={{ backgroundColor: page.bgColor ,opacity:'0.5' }}>
        <h1 className={`font-semibold text-3xl text-whiteColor`} >{page.title}</h1>
      </div>
    </div>
  );
}

export default OrderNavBar;

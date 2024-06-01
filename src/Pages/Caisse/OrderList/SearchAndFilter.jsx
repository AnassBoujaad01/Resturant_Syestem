import React, { useState } from 'react';
import { Input } from '@mui/material';
import { MdKeyboardAlt } from "react-icons/md";
import KeyboardNumber from '../../../Components/KeyboardNumber';

const SearchAndFilter = ({ search, setSearch, displayKeyboard, setDisplayKeyboard }) => {

  const handleBackspaceClick = () => {
    setSearch(prevState => ({
      ...prevState,
      orderID: prevState.orderID.slice(0, -1)
    }));
  };

  const handleNumberClick = (number) => {
    setSearch(prevState => ({
      ...prevState,
      orderID: prevState.orderID + String(number)
    }));
  };

  const handleButtonClick = (value) => {
    setSearch(prevState => ({
      ...prevState,
      OrderListSelected: value
    }));
  };

  return (
    <div className='flex justify-between gap-4'>
      <div className='flex gap-2'>
        <button
          className={`px-6 py-3 rounded-md  font-bold ${search.OrderListSelected === 'all' ? 'bg-blue-400 text-white' : 'bg-white text-blue-400 '  } border border-blue-500 hover:bg-blue-300`}
          onClick={() => handleButtonClick('all')}
        >
          All
        </button>
        <button
          className={`px-6 py-3 rounded-md ${search.OrderListSelected === 'pending' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-500'} border border-yellow-500 hover:bg-yellow-100`}
          onClick={() => handleButtonClick('pending')}
        >
          ⌛
        </button>
        <button
          className={`px-6 py-3 rounded-md ${search.OrderListSelected === 'remove' ? 'bg-red-400 text-white' : 'bg-white text-red-500'} border border-red-500 hover:bg-red-100`}
          onClick={() => handleButtonClick('remove')}
        >
          🗑️
        </button>
      </div>
      <div className='relative'>
        <Input
          type='text'
          placeholder='Search by Order ID'
          value={search.orderID}
          onChange={(e) => setSearch({ ...search, orderID: e.target.value })}
          className='bg-white bg-opacity-75 w-96 h-14 p-2 shadow-md text-2xl font-semibold'
        />
        <MdKeyboardAlt
          className='absolute top-3 right-3 text-4xl text-blue-500 cursor-pointer'
          onClick={() => setDisplayKeyboard(!displayKeyboard)}
        />
        {displayKeyboard && (
          <div className='absolute z-10 w-96 p-8 bg-white rounded-md shadow-xl'>
            <KeyboardNumber
              onNumberClick={handleNumberClick}
              onBackspaceClick={handleBackspaceClick}
              onUpdatedClick={() => setDisplayKeyboard(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;

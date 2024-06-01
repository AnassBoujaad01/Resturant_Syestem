import React, { useState } from 'react';
import { Input } from '@mui/material';
import KeyboardNumber from './../../Components/KeyboardNumber';
import { MdKeyboardAlt, MdRemoveRedEye, MdSend, MdVisibilityOff } from "react-icons/md";
import './Assets/OrderStyle.css';

function Orders() {
  const image = 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=300';
  const [displayKeyboard, setDisplayKeyboard] = useState(false);
  const [search, setSearch] = useState({ orderID: '' });
  const [showItems, setShowItems] = useState(false);

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

  return (
    <div className="absolute h-screen w-screen flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="w-[600px] h-[80%] bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
        <div className="p-6 h-full flex flex-col justify-between">
          <div className='flex justify-between gap-4'>
            <div className='flex gap-2'>
              <button className='px-6 py-3 rounded-md text-white font-bold bg-blue-400 border border-blue-500 hover:bg-blue-300'>
                All
              </button>
              <button className='px-6 py-3 rounded-md bg-white border border-yellow-500 text-yellow-500 hover:bg-yellow-100'>
                ⌛
              </button>
              <button className='px-6 py-3 rounded-md bg-white border border-red-500 text-red-500 hover:bg-red-100'>
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
          <div className="h-full border-t border-gray-200 mt-4 px-1 bg-gray-100 overflow-y-auto " style={{scrollbarWidth:'none'}}>
            {/* Order content goes here */}
            <div className='relative'>
              <div className="div-gradient w-full p-6 shadow-lg rounded-lg border select-none hover:border-blue-400 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 text-justify">Order ID: <span className="text-blue-500">12345</span></p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500 mr-4"><strong>Date:</strong> 2024-05-22</span>
                      <span className="text-sm text-gray-500 mr-4"><strong>Time:</strong> 14:30:00</span>
                      <span className="text-sm text-gray-500 "><strong>Items:</strong> 5</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-yellow-500 font-semibold">Status: Pending</p>
                  </div>
                </div>
                <div className='flex justify-between items-center '>
                  <span className="text-2xl font-bold text-gray-500"><strong>Total:</strong> 100.00 MAD</span>
                  <div className="flex gap-4">
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition duration-300 ${
                        showItems ? 'bg-red-500 hover:bg-red-400' : 'bg-blue-500 hover:bg-blue-400'
                      }`}
                      onClick={() => setShowItems(!showItems)}
                    >
                      {showItems ? <MdVisibilityOff className="text-lg" /> : <MdRemoveRedEye className="text-lg" />}
                      {showItems ? 'Hide' : 'View'}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-400 transition duration-300">
                      <MdSend className="text-lg" />
                      Send to Cashier
                    </button>
                  </div>
                </div>
              </div>
              {/* show items when onClick view */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showItems ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className='flex items-center bg-gray-200 p-4 cursor-default select-none'>
                  <div className='w-2/4 text-center font-bold text-darkColor'>Items</div>
                  <div className='w-1/4 text-center font-bold text-darkColor'>Quantity</div>
                  <div className='w-1/4 text-center font-bold text-darkColor'>Price</div>
                </div>
                <div className="w-full h-[600px]">
                  <div className={`relative flex items-center bg-whiteColor rounded-t-lg p-4 cursor-default select-none border-b border-grayColor hover:bg-grayColor`}>
                    <div className='w-2/4 flex items-center'>
                      <img src={image} alt="" className='w-1/4 h-24 mr-2 rounded-md' />
                      <div className='w-3/4 font-bold'>{'PIZZA'}</div>
                    </div>
                    <div className='w-1/4 text-center font-bold'>{'0' + 1}</div>
                    <div className='w-1/4 text-center font-bold'>{'25MAD'}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional order cards can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

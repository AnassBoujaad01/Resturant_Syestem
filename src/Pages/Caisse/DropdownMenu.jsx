import React from 'react';
import { useDispatch } from 'react-redux';
import { showOrders } from '../../Redux/slices/orderSlices/orderSlice';

const DropdownMenu = () => {
  const dispatch = useDispatch();

  const handleClickDisplayOrder = () => {
    dispatch(showOrders());
    
  };

  return (
    <div className="relative z-10">
      <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 transition-transform transform scale-100 origin-top-right hover:scale-105">
        <div className="py-3 px-4">
          <div className='flex flex-col space-y-3'>
            <div
              className="flex items-center justify-between p-4 py-8 text-lg text-gray-800 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={handleClickDisplayOrder}
            >
              📃 <span>List orders</span>
            </div>
          </div>
          <div className='mt-5 border-t border-gray-300 pt-4'>
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-lg shadow-md transform hover:scale-105"
            >
              Logout
            </button>
            <button
              className="flex items-center justify-center w-full px-4 py-2 mt-3 text-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-lg shadow-md transform hover:scale-105"
            >
              End Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;

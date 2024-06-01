import React, { useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import OrderCard from './OrderCard';
import '../Assets/OrderStyle.css';
import { useDispatch } from 'react-redux';
import { hideOrders } from '../../../Redux/slices/orderSlices/orderSlice';
import { MdClose } from "react-icons/md"; // Import the close icon from react-icons

function Orders() {
  const dispatch = useDispatch();

  const [displayKeyboard, setDisplayKeyboard] = useState(false);
  const [search, setSearch] = useState({ OrderListSelected: 'all', orderID: '' });

  const orders = [
    {
      id: '12345',
      date: '2024-05-22',
      time: '14:30:00',
      items: [
        { name: 'PIZZA', quantity: 1, price: '25MAD' },
        // More items here...
      ],
      total: '100.00',
      status: 'Pending'
    },
    // More orders here...
  ];

  const handleHiddenOrderClick = () => {
    dispatch(hideOrders());
  };

  return (
    <>
      <div className="absolute h-screen w-screen flex justify-center items-center bg-gray-900 bg-blur-2xl bg-opacity-75 z-50">
        {/* Close icon for hiding orders */}
        <div className="absolute top-4 right-4 z-10">
          <MdClose className="text-gray-500 text-6xl cursor-pointer transition duration-5 hover:text-white" onClick={handleHiddenOrderClick} />
        </div>
        <div className="w-[700px] h-[80%] bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
          <div className="p-6 h-full flex flex-col justify-between">
            <SearchAndFilter
              search={search}
              setSearch={setSearch}
              displayKeyboard={displayKeyboard}
              setDisplayKeyboard={setDisplayKeyboard}
            />
            <div className="h-full border-t border-gray-200 mt-4 px-1 bg-gray-100 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;

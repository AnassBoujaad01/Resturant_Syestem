import React, { useState } from 'react';
import { MdRemoveRedEye, MdSend, MdVisibilityOff } from "react-icons/md";
import OrderItems from './OrderItems';

const OrderCard = ({ order }) => {
  const [showItems, setShowItems] = useState(false);
  const image='https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=300';

  return (
    <div className="relative">
      <div className="div-gradient w-full p-6 shadow-lg rounded-lg border select-none hover:border-blue-400 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-800 text-justify">Order ID: <span className="text-blue-500">{order.id}</span></p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500 mr-4"><strong>Date:</strong> {order.date}</span>
              <span className="text-sm text-gray-500 mr-4"><strong>Time:</strong> {order.time}</span>
              <span className="text-sm text-gray-500 "><strong>Items:</strong> {order.items.length}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg text-yellow-500 font-semibold">Status: {order.status}</p>
          </div>
        </div>
        <div className='flex justify-between items-center '>
          <span className="text-2xl font-bold text-gray-500"><strong>Total:</strong> {order.total} MAD</span>
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
      {showItems && <OrderItems items={order.items} image={image} />}
    </div>
  );
};

export default OrderCard;

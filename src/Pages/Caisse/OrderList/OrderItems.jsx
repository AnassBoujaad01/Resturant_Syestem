import React from 'react';

const OrderItems = ({ items, image }) => {
  return (
    <div className={`transition-all duration-500 ease-in-out overflow-hidden max-h-screen opacity-100`}>
      <div className='flex items-center bg-gray-200 p-4 cursor-default select-none'>
        <div className='w-2/4 text-center font-bold text-darkColor'>Items</div>
        <div className='w-1/4 text-center font-bold text-darkColor'>Quantity</div>
        <div className='w-1/4 text-center font-bold text-darkColor'>Price</div>
      </div>
      <div className="w-full h-[600px]">
        {items.map((item, index) => (
          <div key={index} className={`relative flex items-center bg-whiteColor rounded-t-lg p-4 cursor-default select-none border-b border-grayColor hover:bg-grayColor`}>
            <div className='w-2/4 flex items-center'>
              <img src={image} alt="" className='w-16 h-16 bg-cover mr-2 rounded-md' />
              <div className='w-3/4 font-bold'>{item.name}</div>
            </div>
            <div className='w-1/4 text-center font-bold'>{item.quantity}</div>
            <div className='w-1/4 text-center font-bold'>{item.price} MAD</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;

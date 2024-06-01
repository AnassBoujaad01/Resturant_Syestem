import React, { useEffect, useState } from 'react';
import notFound from '../../Image/notFound.gif';
import { IoMdInformationCircle } from "react-icons/io";


function OrdersTable({ Page }) {
  const [isChecked, setIsChecked] = useState(false);
  const [configTable, setConfigTable] = useState({ bgColor: 'greenColor', status: '💵Payment' });
  const [orders, setOrders] = useState(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    // Set the tableList based on the selected page
    switch (Page) {
      case 'Payment':
        setConfigTable({ bgColor: 'greenColor', status: '💵Payment' });
        setOrders(/* Your logic to fetch orders for Payment page */);
        break;
      case 'Pending':
        setConfigTable({ bgColor: 'yellowColor', status: '⌛Pending' });
        setOrders(/* Your logic to fetch orders for Pending page */);
        break;
      case 'Cancel':
        setConfigTable({ bgColor: 'darkColor', status: '❌Cancel' });
        setOrders(/* Your logic to fetch orders for Cancel page */);
        break;
      case 'Remove':
        setConfigTable({ bgColor: 'redColor', status: '🗑️Delete' });
        setOrders(/* Your logic to fetch orders for Remove page */);
        break;
      default:
        break;
    }
  }, [Page]);

  return (
    <div className='relative w-full mt-12 rounded-md shadow-xl bg-grayColor overflow-hidden'>
      <div className='sticky top-0 z-5 flex justify-center items-center h-32 bg-whiteColor rounded-md shadow-xl'>
        <div className='font-bold text-2xl w-96'>ORDER ID</div>
        <div className='font-bold text-2xl w-96'>CASHIER</div>
        <div className='font-bold text-2xl w-96'>Quantite</div>
        <div className='font-bold text-2xl w-96'>Price</div>
        <div className='font-bold text-2xl w-96'>Date</div>
        <div className='font-bold text-2xl w-96'>Time</div>
        <div className='font-bold text-2xl w-96'>Status</div>
        <div className='font-bold text-4xl w-96'>•••</div>
      </div>
      <div className='relative h-[calc(100% - 3.5rem)] overflow-y-auto'>
              {/* Rows */}
              {orders && orders.length > 0 ? (
          orders.map((item, index) => (
            <div key={index} className='flex justify-center items-center bg-whiteColor border-t-4 border-darkColor h-24'>
              <div className='font-semibold text-md w-96'>{item.orderID}</div>
              <div className='font-semibold text-md w-96'>{''}</div>
              <div className='font-semibold text-md w-96'>X {item.detailsOrder.countItems}</div>
              <div className='font-semibold text-md w-96'>{item.detailsOrder.price} MAD</div>
              <div className='font-semibold text-md w-96'>{item.date}</div>
              <div className='font-semibold text-md w-96'>{item.time}</div>
              <div className={`font-bold text-md w-96 bg-${configTable.bgColor} text-white flex justify-center items-center h-full`}>{configTable.status}</div>
              <div className='font-semibold text-md w-96 flex justify-center items-center gap-12'>
                <IoMdInformationCircle className={`text-5xl font-bold text-${configTable.bgColor} cursor-pointer`} />
                <input
                  type='checkbox'
                  className={`w-10 h-10 border-none rounded-xl check:bg-greenColor ${isChecked ? 'checked' : ''}`}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>
          ))
        ) : (
          <div className='relative'>
                <img src={notFound} alt="Not Found" className='w-full h-[65vh] cover' />
                <div className={`absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-6xl text-${configTable.bgColor}`}>
                    <h1>DATA NOT FOUND</h1>
                </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;

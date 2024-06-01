import React from 'react';
import Btn from '../../Components/btn';
import Item from '../../Components/Item';
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { RiPrinterFill } from "react-icons/ri";

function OrderDetailsPage({ Page }) {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray-50 select-none'>
      <div className='h-[70vh] w-[100vw] max-w-screen-lg bg-gray-100 rounded-lg shadow-lg overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          <div className='w-full lg:w-1/3 bg-gray-800 rounded-lg pt-12 p-12 lg:p-8   text-justify'>
            <div className='text-whiteColor  text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="key">🗝️</span> <span className='text-sm lg:text-lg block'>Order ID: 351531515165131</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="calendar">📅</span> <span className='text-sm lg:text-lg block'>Date: 05/05/2024</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="clock">⌚</span> <span className='text-sm lg:text-lg block'>Time: 05:50:01</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="money">💵</span> <span className='text-sm lg:text-lg block'>Total: 200 MAD</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="payment">💳</span> <span className='text-sm lg:text-lg block'>Payment Method: Cash</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold mb-6'>
              <span role="img" aria-label="box">📦</span> <span className='text-sm lg:text-lg block'>Quantity: 5</span>
            </div>
            <div className='text-white text-2xl lg:text-3xl font-bold'>
              <span role="img" aria-label="person">🧑‍🦱</span> <span className='text-sm lg:text-lg block'>Cashier: Anass Boujaad</span>
            </div>
          </div>
          <div className='  items-center h-full lg:w-2/3 bg-white rounded-lg p-4 lg:p-8 '>
            <div className='flex  w-24 text-5xl text-gray-500 cursor-pointer transition duration-500 opacity-50 hover:opacity-100 hover:text-red-500'>
             <IoArrowUndoCircleOutline  />
              <span className='text-xl'>back</span>
            </div>
             <div className='relative overflow-hidden w-full'>
              <div className='flex justify-start  flex-wrap gap-4 px-2   overflow-y-auto w-full max-h-[58vh]  ' style={{ scrollbarWidth: 'none' }}>
                  {[...Array(7)].map((_, index) => (
                   <Item key={index} width='190px' height='250px' image={'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=300'} name={'Pizza'} price={25} />
                  ))}
              </div>

            </div>
            <div className='h-[15%] flex justify-center lg:justify-end mt-2  gap-12'>
              {Page !== 'Payment' && <Btn icon={IoIosSend} color={"greenColor"} text={"SEND TO CASHIER"} />}
              <Btn icon={RiPrinterFill} color={"blueColor"} text={"PRINT RECEIPT"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;

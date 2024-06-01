import React,{useState} from 'react';
import { Input } from '@mui/material';
import KeyboardNumber from '../../Components/KeyboardNumber';
import { MdKeyboardAlt } from "react-icons/md";

function CardAmountStart() {

    const [displayKeyboard, setDisplayKeyboard] = useState(false);
    const [cashier, setCashier] = useState({ amountStart: '0.00' });

  const handleNumberClick = (number) => {
    setCashier(prevState => ({
      ...prevState,
      amountStart: (prevState.amountStart === '0.00' ? '' : prevState.amountStart) + String(number)
    }));
  };

  const handleBackspaceClick = () => {
    setCashier(prevState => ({
      ...prevState,
      amountStart: prevState.amountStart.slice(0, -1) || '0.00'
    }));
  };
  return (
    <div className='w-96 bg-white rounded-md shadow-xl p-4'>
        <div className='relative'>
            <div className='relative text-darkColor font-bold text-2xl'>
                Amount Start 
            </div>
          <Input
            type='text'
            placeholder='Enter Amount'
            value={cashier.amountStart}
            className='bg-white w-full h-12 p-2 text-2xl font-semibold shadow-md'
          />
          <MdKeyboardAlt
            className='absolute top-10 right-3 text-4xl text-blue-500 cursor-pointer'
            onClick={() => setDisplayKeyboard(!displayKeyboard)}
          />
        </div>
        {displayKeyboard && (
          <div className='relative top-0 right-0 z-10'>
            <KeyboardNumber
              onNumberClick={handleNumberClick}
              onBackspaceClick={handleBackspaceClick}
              onUpdatedClick={() => setDisplayKeyboard(false)}
            />
          </div>
        )}
        <div className='flex justify-between mt-4'>
          <button className='bg-red-500 text-white font-bold h-12 w-32 rounded-md shadow-md'>Cancel</button>
          <button className='bg-green-600 text-white font-bold h-12 w-32 rounded-md shadow-md'>Start</button>
        </div>
      </div>
  )
}

export default CardAmountStart;
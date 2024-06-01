import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { orderSlice } from '../Redux/slices/orderSlices/orderSlice';

function UpdateCommand({ id, image, name, Qte, Price, onClose }) {
  const dispatch = useDispatch();
  const [commandValue, setCommandValue] = useState({ Qte, Price });
  const [activeField, setActiveField] = useState(null);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        onClose(); // Close the UpdateCommand component when clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (type, value) => {
    if (type === 'Qte') {
      setCommandValue(prevState => ({
        ...prevState,
        Qte: value >= 1 ? value : 1 // Ensure the value is at least 1
      }));
    } else if (type === 'Price') {
      setCommandValue(prevState => ({
        ...prevState,
        Price: value >= 0 ? value : 0
      }));
    }
  };

  const handleNumberClick = (number) => {
    if (activeField === 'priceInput') {
      setCommandValue(prevState => ({
        ...prevState,
        Price: prevState.Price * 10 + number
      }));
    } else {
      setCommandValue(prevState => ({
        ...prevState,
        Qte: prevState.Qte * 10 + number
      }));
    }
  };

  const handleBackspaceClick = () => {
    if (activeField === 'priceInput') {
      setCommandValue(prevState => ({
        ...prevState,
        Price: Math.floor(prevState.Price / 10)
      }));
    } else {
      if (commandValue.Qte > 1) {
        setCommandValue(prevState => ({
          ...prevState,
          Qte: Math.floor(prevState.Qte / 10)
        }));
      }
    }
  };

  const handleInputClick = (field) => {
    setActiveField(field);
  };

  const handleUpdatedClick = () => {
    const newOrder = {
      id,
      name,
      image,
      quantity: commandValue.Qte,
      price: commandValue.Price
    };
    console.log("This is the new order updated:", Object.entries(newOrder));
    dispatch(orderSlice.actions.updateItem(newOrder));
    onClose(); // Close the UpdateCommand component after updating
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div ref={componentRef} className="relative w-96 p-8 bg-white rounded-md shadow-xl flex flex-col justify-between">
        <div>
          <div className='flex justify-around align-center mb-4'>
            <label className="block mb-2 font-semibold text-lg w-24" htmlFor="quantityInput">Quantity:</label>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-l text-xl" onClick={() => handleChange('Qte', commandValue.Qte - 1)}>-</button>
              <input
                min={1}
                id="quantityInput"
                type="number"
                value={commandValue.Qte}
                onChange={(e) => handleChange('Qte', parseInt(e.target.value))}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500 text-center text-xl"
                onClick={() => handleInputClick('quantityInput')}
              />
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-r text-xl" onClick={() => handleChange('Qte', commandValue.Qte + 1)}>+</button>
            </div>
          </div>
          <div className='flex justify-around align-center'>
            <label className="block mt-6 mb-2 font-semibold text-lg w-24" htmlFor="priceInput">Price:</label>
            <div className="flex items-center">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-l text-xl" onClick={() => handleChange('Price', commandValue.Price - 10)}>-</button>
              <input
                id="priceInput"
                type="number"
                value={commandValue.Price}
                onChange={(e) => handleChange('Price', parseInt(e.target.value))}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500 text-center text-xl"
                onClick={() => handleInputClick('priceInput')}
              />
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-r text-xl" onClick={() => handleChange('Price', commandValue.Price + 10)}>+</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number, index) => (
            <button key={index} className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none text-xl" onClick={() => handleNumberClick(number)}>{number}</button>
          ))}
          <button className="col-span-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 focus:outline-none text-xl" onClick={handleBackspaceClick}>❌</button>
          <button className="col-span-1 bg-green-200 text-green-700 rounded-md hover:bg-green-300 focus:outline-none text-xl" onClick={handleUpdatedClick}>✅</button>
          
        </div>
      </div>
    </div>
  );
}

export default UpdateCommand;

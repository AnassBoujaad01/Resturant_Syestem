import React from 'react';

function KeyboardNumber({ onNumberClick, onBackspaceClick, onUpdatedClick }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4 select-none ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number, index) => (
        <button key={index} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none text-xl" onClick={() => onNumberClick(number)}>{number}</button>
      ))}
      <button className="col-span-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 focus:outline-none text-xl" onClick={onBackspaceClick}>❌</button>
      <button className="col-span-1 bg-green-200 text-green-700 rounded-md hover:bg-green-300 focus:outline-none text-xl" onClick={onUpdatedClick}>✅</button>
    </div>
  );
}

export default KeyboardNumber;

import React from 'react';

function Window({ title, id, isSelected, onClick, onDelete }) {

  
  const handleClick = () => {
    onClick(id);
  };

  const handleDelete = () => {
    console.log(id);
    if(id!==undefined || id !==null){
      onDelete(id);
    }
  };

  return (
    <div className={`relative w-full h-14  p-7  shadow-lg overflow-hidden  ${isSelected ? 'bg-yellowColor' : 'bg-whiteColor'}`} style={{width:'220px', userSelect: 'none', borderStartStartRadius: '5px', borderStartEndRadius: '5px', borderRight: '1px solid', borderColor: 'whitesmoke', padding: '3px' }} onClick={handleClick}>
      <div className={`flex justify-between items-center px-4 h-full cursor-pointer ${isSelected ? 'text-whiteColor' : 'text-darkColor'}`}>
        <div>{title}</div>
        <button className="text-sm text-gray-400 hover:text-white" onClick={handleDelete}>
          <span className="text-xl">&#x2715;</span>
        </button>
      </div>
    </div>
  );
}

export default Window;

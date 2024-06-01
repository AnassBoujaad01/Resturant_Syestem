import React from 'react';

function Categorie({ image , name , key , handleClick }) {

    
  return (
    <div  key={key} className="relative cursor-pointer transition duration-300 transform hover:scale-105 border hover:border-yellowColor " onClick={handleClick}>
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded-md" style={{ maxHeight: '150px' }} />
      <h1 className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white text-sm font-medium px-2 py-1">{name}</h1>
    </div>
  );
}

export default Categorie;

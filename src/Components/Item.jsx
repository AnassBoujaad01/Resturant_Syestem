import React from 'react';


function Item({ height , width , image , name, price }) {

  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative " style={{ userSelect: 'none', height: height, width: width, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }} >
      <div className='h-full'>
        <img className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-105" src={image} alt={`${name} product`} />
      </div>
      <div className="p-4 absolute bottom-0 left-0 w-full bg-whiteColor bg-opacity-25 backdrop-blur-lg">
        <h2 className="text-yellowColor text-lg font-semibold">{name}</h2>
        <p className="mt-2 text-whiteColor">{price} MAD</p>
      </div>
    </div>
  );
}

export default Item;

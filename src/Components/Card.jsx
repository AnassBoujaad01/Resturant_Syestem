import React from 'react';
import { useDispatch } from 'react-redux';
import { orderSlice } from '../Redux/slices/orderSlices/orderSlice';

function ProductCard({ image, name, price }) {
  const dispatch = useDispatch();
  
  const handleCardClick = () => {
    dispatch(orderSlice.actions.addItem({ image, name, quantity: 1, price }));
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative " style={{ userSelect: 'none', height: 'auto', width: '300px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }} onClick={handleCardClick}>
      <div className="h-80">
        <img className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-105" src={image} alt={`${name} product`} />
      </div>
      <div className="p-4 absolute bottom-0 left-0 w-full bg-whiteColor bg-opacity-25 backdrop-blur-lg">
        <h2 className="text-yellowColor text-lg font-semibold">{name}</h2>
        <p className="mt-2 text-whiteColor">{price} MAD</p>
      </div>
    </div>
  );
}

export default ProductCard;

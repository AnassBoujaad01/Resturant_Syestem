import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import Categories from './Categories';
import Caisse from './Caisse';
import { useDispatch,useSelector } from 'react-redux';
import { categorySlice } from '../../Redux/slices/categorySlices/categorySlice';
import Data from '../../DataLocal/data.json';
import Orders from './OrderList/Orders';

export default function CaissePage() {
  const dispatch = useDispatch();
  const OrdersState = useSelector(state => state.order.displayOrderComponent);
  useEffect(() => {
    if (Data && Data.Categories) {
      dispatch(categorySlice.actions.setCategory(Data.Categories));
    }
  }, [dispatch]);

  return (
    <>
    {OrdersState && (<Orders></Orders>)}
    <div className=" relative flex flex-col h-screen overflow-hidden" style={{minWidth:"800px"}}>
      {/* Navbar */}
      <div className="bg-gray-800 text-white">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Component (Caisse) */}
        <div className=" relative w-1/4 h-full bg-whiteColor">
          <Caisse />
        </div>

        {/* Center Component (Product) */}
        <div className="flex flex-1 flex-col gap-4 w-2/4 bg-gray-300 h-full overflow-y-auto">
          <Product />
        </div>

        {/* Right Component (Categories) */}
        <div className="w-1/10 h-full bg-gray-200">
          <div className="p-4">
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

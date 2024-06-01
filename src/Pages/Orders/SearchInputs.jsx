import React, { useEffect, useState } from 'react';
import { Input } from '@mui/material';
import KeyboardNumber from './../../Components/KeyboardNumber';
import { FaSearch } from "react-icons/fa";
import { MdKeyboardAlt } from "react-icons/md";
import Btn from '../../Components/btn';
import { useSelector } from 'react-redux';

function SearchInputs({ Page }) {
  const [displayKeyboard, setDisplayKeyboard] = useState(false);
  const [search, setSearch] = useState({ orderID: '', date: null });
  const orders = useSelector(state => state.order); // Get the orders from Redux store
  const [tableList, setTableList] = useState(null);

  useEffect(() => {
    if(Page!==null && orders!==null){
      handleSelectList(Page);
    }
}, [Page, orders]); // Include Page and orders in the dependency array

  const handleBackspaceClick = () => {
    setSearch(prevState => ({
      ...prevState,
      orderID: prevState.orderID.slice(0, -1)
    }));
  };

  const handleNumberClick = (number) => {
    setSearch(prevState => ({
      ...prevState,
      orderID: prevState.orderID + String(number)
    }));
  };

  const handleSelectList = (Page) => {
    // Set the tableList based on the selected page
    switch (Page) {
      case 'Payment':
        setTableList(orders.PaymentList);
        break;
      case 'Pending':
        setTableList(orders.pendingList);
        break;
      case 'Cancel':
        setTableList(orders.CancelList);
        break;
      case 'Remove':
        setTableList(orders.DeleteList);
        break;
      default:
        break;
    }
  };

  const handleSearchClick = () => {
    if (tableList !== null) {
      let filteredData = tableList;
      if (search.orderID !== '') {
        filteredData = filteredData.filter(data => data.orderID === search.orderID);
      } else if (search.date !== null && search.orderID === '') {
        filteredData = filteredData.filter(data => data.date === search.date);
      } else {
        handleSelectList(Page); // Reset tableList if search criteria are empty
      }
      // Use the filteredData as needed
      console.log(filteredData);
    }
  };

  return (
    <div className='flex justify-around items-center gap-40 mx-auto'>
      <div className='relative'>
        <Input type='text' placeholder='Search by Order ID' value={search.orderID} className='bg-gray w-96 h-14 p-2 shadow-md text-2xl font-semibold' />
        <MdKeyboardAlt className='absolute top-3 right-1 text-4xl text-blueColor cursor-pointer' onClick={() => setDisplayKeyboard(!displayKeyboard)} />
        {displayKeyboard && <div className='absolute z-10 w-96 p-8 bg-white rounded-md shadow-xl'><KeyboardNumber
          onNumberClick={handleNumberClick}
          onBackspaceClick={handleBackspaceClick}
          onUpdatedClick={() => setDisplayKeyboard(false)}
        /></div>}
      </div>
      <Input type='date' placeholder='Search by Date Order' className='bg-gray w-96 h-14 p-2 shadow-md text-2xl font-semibold' />
      <Btn icon={FaSearch} color={"blueColor"} text={"Search"} onClick={handleSearchClick} />
    </div>
  );
}

export default SearchInputs;

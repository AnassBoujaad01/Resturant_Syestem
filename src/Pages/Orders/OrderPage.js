import React, {useState } from 'react';
import OrderNavBar from './OrderNavBar';
import SearchInputs from './SearchInputs';
import FooterButtons from './FooterButtons';
import OrdersTable from './OrdersTable';

function OrderPage() {
  const [selectedPage, setSelectedPage] = useState('Payment');

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };


  return (
    <div className='h-full w-full select-none'>
      <OrderNavBar onSelectPage={handleSelectPage} />
      <main className='relative h-[80vh] w-[80vw] inline-block mt-10 mb-4'>
        <div className='flex justify-between items-around h-30 gap-12'>
          <SearchInputs Page={selectedPage}/>
        </div>
        <OrdersTable Page={selectedPage}/>
      </main>
      <FooterButtons Page={selectedPage}/>
    </div>
  );
}

export default OrderPage;

import React from 'react';
import Image from '../../Image/Logo1.png';
import AccountCard from '../../Components/AccountCard';

function AccountInfo() {
  return (
    <div className='flex flex-col w-1/2 bg-white rounded-md overflow-hidden select-none'>
      <div className='p-8'>
        <h2 className='text-xl font-bold mb-4'>Account</h2>
        <div className='grid grid-cols-2 gap-5 overflow-y-auto' style={{ scrollbarWidth: 'none', maxHeight: '400px' }}>
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
          <AccountCard name={'Anass Boujaad'} Image={Image} />
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;

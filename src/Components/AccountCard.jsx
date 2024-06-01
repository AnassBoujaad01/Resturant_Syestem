import React from 'react'

function AccountCard({name,Image}) {
  return (
    <div className='w-48 h-48 max-w-xs bg-white shadow-md rounded-md border border-blue-300 overflow-hidden cursor-pointer relative select-none'>
    <div className="h-full">
      <img className="w-full h-full object-cover object-center transition duration-300 transform hover:scale-105" src={Image} alt={`user`} />
    </div>

    <div className="p-4 absolute bottom-0 left-0 w-full bg-white bg-opacity-10 backdrop-blur-lg">
      <h2 className="text-gray-600 text-md font-bold">{name}</h2>
    </div>
  </div>
  )
}

export default AccountCard;
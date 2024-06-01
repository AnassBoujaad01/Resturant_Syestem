import React from 'react'

function CardSatrtWork() {
  return (
    <div className="relative flex flex-col justify-between items-center rounded-md shadow-lg bg-white text-gray-800 h-96 w-96 p-8">
    {/* Icon and text elements */}
    <div className="flex flex-col items-center">
      <div className="text-6xl mb-2">👋</div>
      <div className="text-3xl font-bold mt-2">Hey!</div>
      <div className="text-lg mt-4">Ready to take orders and serve delicious meals?</div>
    </div>

    {/* Start button */}
    <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10">
      Start Now
    </button>

    {/* Wave effect */}
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg className="w-full h-24 " viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,49.98C150,99.96,350,99.96,500,49.98C650,0,850,0,1000,49.98C1150,99.96,1300,99.96,1450,49.98C1600,0,1800,0,1950,49.98L1950,120L0,120Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  </div>
  )
}

export default CardSatrtWork
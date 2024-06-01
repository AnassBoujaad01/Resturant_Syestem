import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, onClick }) => {
  return (
    <div className="my-4 relative">
      <input
        type="text"
        placeholder="Search by title or ID"
        className="w-full p-2 pr-10 border border-gray-300 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={onClick} // Add onClick event handler
      />
      <button
        className="absolute top-0 right-0 h-full px-3 flex items-center justify-center bg-gray-200 border-l border-gray-300 rounded-r cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 19l-2.828-2.828M10 8l-4 4m0 0l4 4m-4-4h12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;

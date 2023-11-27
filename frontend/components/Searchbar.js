import React, { useState } from 'react';


const Searchbar = ({ onSearch, onFilterClick }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };
  const handleFilter = () =>{
    onFilterClick();
  } 

  return (
    <div className="flex items-center rounded-full bg-white p-0 border border-gray-300">  
      <img
        src="/search-normal.svg"
        alt="Search normal"
        className="h-8 w-8 p-2 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="flex-1 px-3 py-2 border-none outline-none"
      />
      <img
        src="/filter.svg"
        alt="Filter"
        className="h-8 w-8 p-2 cursor-pointer"
        onClick={handleFilter}
      />
    </div>
  );
};

export default Searchbar;
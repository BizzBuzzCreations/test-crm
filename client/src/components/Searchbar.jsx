import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle input changes
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    onSearch(searchQuery); // Pass the search query back to parent component (ShowLeads)
  };

  return (
    <div>
      <form
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden px-2 gap-2 group focus-within:ring-2 focus-within:ring-[#f3eefe] focus-within:border-[#8b5cf6]"
      >
        <IoSearch className="text-2xl text-gray-400 group-focus-within:text-[#8b5cf6]" />
        <input
          type="text"
          placeholder="Search by ID, Name..."
          value={query}
          onChange={handleSearch}
          className="w-full py-2 text-gray-700 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default Searchbar;

"use client";

import React, { useState } from "react";
import Loader from "./Loader";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Pesquisar...",
  onSearch,
  buttonText,
  onButtonClick,
  loading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Loader size="small" />
          </div>
        )}
      </div>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SearchBar;

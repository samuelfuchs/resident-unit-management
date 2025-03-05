"use client";

import React, { useState } from "react";
import Loader from "./Loader";
import Button from "./Button";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
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
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 shadow-sm pr-10 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-600 focus:ring-opacity-50"
        />
        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Loader size="small" />
          </div>
        )}
      </div>
      {buttonText && onButtonClick && (
        <Button onClick={onButtonClick}>{buttonText}</Button>
      )}
    </div>
  );
};

export default SearchBar;

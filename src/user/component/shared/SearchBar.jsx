import React, { useEffect, useState } from "react";
import Icon from "../../../shared/component/Icon";

export default function SearchBar({ placeholder, data, dataFromSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = data.filter((element) =>
      ["title", "firstName", "lastName", "startDate", "email"].some(
        (property) =>
          element[property]?.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setFilteredData(filteredData);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
    setIsSearching(false);
  };

  useEffect(() => {
    dataFromSearch(filteredData);
  }, [filteredData, dataFromSearch]);

  useEffect(() => {
    clearSearch();
  }, [data.length]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      clearSearch();
    } else {
      filterData();
    }
  };

  return (
    <div className="flex space-x-2 sm:space-x-4 items-center w-full rounded-b-lg p-2 sm:p-4 shadow-xl bg-white">
      <div className="flex items-center border border-gray-400 rounded-lg py-1 sm:py-2 w-full bg-white">
        <input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full focus:outline-none bg-white px-1"
        />
      </div>
        {isSearching ? (
          <Icon name="close" onClick={clearSearch} style="cursor-pointer h-4 w-4" />
        ) : (
          <Icon name="search" onClick={filterData} style="cursor-pointer h-4 w-4" />
        )}
    </div>
  );
}

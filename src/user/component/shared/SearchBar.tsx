import React, { useEffect, useState, ChangeEvent } from "react";
import Icon from "../../../shared/component/Icon";

interface SearchBarProps<T> {
  placeholder: string;
  data: T[];
  dataFromSearch: (filteredData: T[]) => void;
}

export default function SearchBar<T extends Record<string, any>>({
  placeholder,
  data,
  dataFromSearch,
}: SearchBarProps<T>): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<T[]>([]);

  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filtered = data.filter((element) =>
      ["title", "firstName", "lastName", "startDate", "email"].some(
        (property) =>
          typeof element[property] === "string" &&
          element[property].toLowerCase().includes(lowerCaseSearchTerm)
      )
    );

    setFilteredData(filtered);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      clearSearch();
    } else {
      filterData();
    }
  };

  return (
    <div className="flex space-x-4 items-center w-full rounded-b-lg p-4 shadow-xl bg-white">
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

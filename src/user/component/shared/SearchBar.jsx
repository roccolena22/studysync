import { useState } from "react";
import Icon from "../../../shared/component/Icon";

export default function SearchBar({ placeholder, data, dataFromSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = data.filter((element) =>
      ["title", "firstName", "lastName", "startDate", "email"].some((property) =>
        element[property]?.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    dataFromSearch(filteredData);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    dataFromSearch(data);
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      dataFromSearch(data);
      setIsSearching(false);
    } else {
      filterData();
    }
  };

  return (
    <div className="py-6 px-4 flex items-center shadow-lg w-full rounded-b-2xl bg-white">
      <div className="flex items-center space-x-4 w-full">
        <input
          className="w-full bg-zinc-100 border border-zinc-400 h-6 sm:h-7 border rounded-lg py-2 px-3 pr-10 focus:outline-none shadow-lg"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div>
          {isSearching ? (
            <Icon name="close" onClick={clearSearch} style="cursor-pointer" />
          ) : (
            <Icon name="search" onClick={filterData} style="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
}

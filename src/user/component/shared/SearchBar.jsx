import { useState } from "react";
import Icon from "../../../shared/component/Icon";
import Input from "../../../shared/component/Input";

export default function SearchBar({ placeholder, data, dataFromSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = data.filter((element) =>
      ["title", "firstName", "lastName", "startDate", "email"].some(
        (property) =>
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
    <div className="shadow-lg flex space-x-2 sm:space-x-4 items-center w-full bg-slate-50 rounded-b-2xl p-4">
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div>
          {isSearching ? (
            <Icon
              name="close"
              onClick={clearSearch}
              style="cursor-pointer"
            />
          ) : (
            <Icon
              name="search"
              onClick={filterData}
              style="cursor-pointer"
            />
          )}
        </div>
    </div>
  );
}

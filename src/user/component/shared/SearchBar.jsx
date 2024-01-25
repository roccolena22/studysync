import { useEffect, useState } from "react";
import Icon from "../../../shared/component/Icon";
import { useSelector } from "react-redux";

export default function SearchBar({ placeholder, data, dataFromSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const loggedUser = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.bookings);

  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = data.filter((element) =>
      ["title", "firstName", "lastName", "startDate", "email"].some(
        (property) =>
          element[property]?.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    dataFromSearch(filteredData);
  };

  const clearSearch = () => {
    setSearchTerm("");
    dataFromSearch(data);
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    e.target.value !== "" && setIsSearching(true);
    if (e.target.value === "") {
      dataFromSearch(data);
      setIsSearching(false);
    } else {
      filterData();
    }
  };

  useEffect(() => {
    filterData();
  }, [loggedUser, bookings, data.lenght]);

  return (
    <div className="flex space-x-2 sm:space-x-4 items-center w-full rounded-b-lg p-4 shadow-xl bg-white">
      <div className="flex justify-between items-center border border-gray-400 rounded-lg p-2 w-full bg-gray-50">
        <input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full focus:outline-none bg-gray-50 px-1"
        />
        {isSearching && (
          <Icon name="close" onClick={clearSearch} style="cursor-pointer w-6 h-6" />
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import Icon from "../../../shared/component/Icon";
import { getUsersByFilter } from "../../../api/apiUsers"; // API per cercare da server
import { User } from "../../models";
import { DefaultColor } from "../../../shared/models";

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
  const [loading, setLoading] = useState<boolean>(false);

 const filterData = async () => {
  if (!searchTerm.trim()) return;

  setLoading(true);

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  let filtered = data.filter((element) =>
    ["title", "firstName", "lastName", "startDate", "email"].some(
      (property) =>
        typeof element[property] === "string" &&
        element[property].toLowerCase().includes(lowerCaseSearchTerm)
    )
  );

  if (filtered.length === 0) {
    try {
    
      const formula = `OR(
        FIND('${lowerCaseSearchTerm}', LOWER({firstName})),
        FIND('${lowerCaseSearchTerm}', LOWER({lastName})),
        FIND('${lowerCaseSearchTerm}', LOWER({email}))
      )`;

      const fetchedUsers: User[] = await getUsersByFilter(formula);
      filtered = fetchedUsers as unknown as T[];
    } catch (error) {
      console.error("Errore durante la ricerca da API:", error);
    }
  }

  setFilteredData(filtered);
  setIsSearching(true);
  setLoading(false);
};


  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
    setIsSearching(false);
    dataFromSearch([]);
  };

  useEffect(() => {
    dataFromSearch(filteredData);
  }, [filteredData, dataFromSearch]);

  useEffect(() => {
    clearSearch();
  }, [data.length]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filterData();
    }
  };

  return (
    <div className={`flex space-x-4 items-center w-full rounded-b-lg p-4 shadow-xl bg-${DefaultColor.SECONDARY_COLOR}`}>
      <div className={`flex items-center border border-gray-400 rounded-lg py-1 sm:py-2 w-full bg-${DefaultColor.SECONDARY_COLOR}`}>
        <input
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Avvia ricerca su Invio
          className={`w-full focus:outline-none bg-${DefaultColor.SECONDARY_COLOR} px-1`}

        />
      </div>
      {loading ? (
        <span>🔄</span>
      ) : isSearching ? (
        <Icon name="close" onClick={clearSearch} style="cursor-pointer h-4 w-4" />
      ) : (
        <Icon name="search" onClick={filterData} style="cursor-pointer h-4 w-4" />
      )}
    </div>
  );
}

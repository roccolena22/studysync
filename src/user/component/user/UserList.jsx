import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Utilities/fetchFunctions";

export default function UsersList({ usersToShow }) {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
    setIsSearching(true);
  };

  let usersToDisplay = isSearching ? searchedUsers : usersToShow;

  const sortedUsers = [...usersToDisplay].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0
      ? firstNameComparison
      : a.lastName.localeCompare(b.lastName);
  });

  return (
    <div>
      {usersToShow.length > 0 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={usersToShow}
          dataFromSearch={handleSearch}
        />
      )}

      <div className="pt-6">
        {sortedUsers.map((user) => (
          <div key={user.id}>
            <SingleUserInList user={user} />
          </div>
        ))}
        {usersToShow.length === 0 && (
          <p className="text-lg gray-500">No users to show.</p>
        )}
      </div>
    </div>
  );
}

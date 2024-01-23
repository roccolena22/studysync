import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Utilities/fetchFunctions";

export default function UsersList({ users }) {
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

  let usersToDisplay = isSearching ? searchedUsers : users;

  const sortedUsers = [...usersToDisplay].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0
      ? firstNameComparison
      : a.lastName.localeCompare(b.lastName);
  });

  return (
    <div>
      {users.length > 0 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={users}
          dataFromSearch={handleSearch}
        />
      )}

      <div className="pt-6">
        {sortedUsers.map((user, index) => (
          <div key={index}>
            <SingleUserInList user={user} />
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-lg gray-500">No users to show.</p>
        )}
      </div>
    </div>
  );
}

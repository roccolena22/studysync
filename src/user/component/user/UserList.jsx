import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import Message from "../Message";
import { fetchUsers } from "../../Utilities/fetchFunctions";
import { useDispatch } from "react-redux";

export default function UsersList({ usersToShow }) {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);

  const sortedUsers = usersToShow.sort((a, b) => {
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
          data={sortedUsers}
          dataFromSearch={handleSearch}
        />
      )}
      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map((user) => (
              <div key={user.id}>
                <SingleUserInList user={user} />
              </div>
            ))}
        {usersToShow.length === 0 && <Message text="No users to show." />}
      </div>
    </div>
  );
}

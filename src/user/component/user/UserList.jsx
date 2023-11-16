import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUser from "./SingleUser";

export default function UsersList({
  infoLoggedUser,
  users,
  handleFollow,
  removeFollow,
}) {
  const [searchedUsers, setSearchedUsers] = useState([]);

  const usersToSearch = users.filter(
    (user) => user.email !== infoLoggedUser.email
  );
  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };
  return (
    <div>
      <SearchBar
        placeholder="Search for a user based on their name or email"
        data={usersToSearch}
        dataFromSearch={handleSearch}
      />
      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : usersToSearch).map(
          (user) => (
            <div key={user.email}>
              <SingleUser
                user={user}
                handleFollow={handleFollow}
                removeFollow={removeFollow}
                infoLoggedUser={infoLoggedUser}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

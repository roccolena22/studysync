import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUser from "./SingleUser";

export default function UsersList({
  loggedUser,
  users,
  addFollowed,
  removeFollow,
}) {

  const [searchedUsers, setSearchedUsers] = useState([]);

  const usersToSearch = users.filter(
    (user) => user.email !== loggedUser.email
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
          (user, index) => (
            <div key={index}>
              <SingleUser
                user={user}
                addFollowed={addFollowed}
                removeFollow={removeFollow}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

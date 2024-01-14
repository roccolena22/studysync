import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import { addRecordToDatabase, deleteRecordFromDatabase, getListFromDatabase } from "../../../api/apiRequest";
import { addFollower, deleteFollower, setFollowers } from "../../../redux/slices/followersSlice";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { setUsers } from "../../../redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UsersList({
  loggedUser,
  users,
  excludeLogged,
}) {

  const followers = useSelector((state) => state.followers);

  const [searchedUsers, setSearchedUsers] = useState([]);

  const dispatch = useDispatch()
  const usersToSearch = excludeLogged
    ? users.filter((user) => user.email !== loggedUser.email)
    : users;

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };

  const sortedUsers = [...(searchedUsers.length > 0 ? searchedUsers : usersToSearch)].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0 ? firstNameComparison : a.lastName.localeCompare(b.lastName);
  });

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

  const toggleFollow = async (user, isAdding) => {
    const followerReduxAction = isAdding ? addFollower : deleteFollower;

    const followerData = isAdding
      ? { idFrom: [loggedUser.id], idTo: [user.id] }
      : followers && followers.find((item) => item.idTo[0] === user.id);

    try {
      if (isAdding) {
        await addRecordToDatabase("followers", followerData);
      } else if (followerData && followerData.id) {
        await deleteRecordFromDatabase("followers", followerData.id);
      }
      dispatch(followerReduxAction(followerData));
      const updatedUsers = await getListFromDatabase("users");
      dispatch(setUsers(updatedUsers));
      const refreshLoggedUser = updatedUsers.find((user) => user.id === loggedUser.id);
      dispatch(setLoggedUser(refreshLoggedUser));
      fetchFollowers();
    } catch (error) {
      console.error(`Error ${isAdding ? 'adding' : 'removing'} follower`, error);
    }
  };

  return (
    <div>
      {usersToSearch.length > 1 && (
        <SearchBar
          placeholder="Search for a user based on their name or email"
          data={usersToSearch}
          dataFromSearch={handleSearch}
        />
      )}

      <div className="pt-6">
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map(
          (user, index) => (
            <div key={index}>
              <SingleUserInList
                loggedUser={loggedUser}
                user={user}
                toggleFollow={toggleFollow}
                followers={followers}
              />
            </div>
          )
        )}
        {usersToSearch.length === 0 && <p className="text-lg gray-500">No users to show</p>}
      </div>
    </div>
  );
}

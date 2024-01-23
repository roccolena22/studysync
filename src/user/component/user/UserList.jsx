import React, { useEffect, useState } from "react";
import SearchBar from "../shared/SearchBar";
import SingleUserInList from "./SingleUserInList";
import {

  getListFromDatabase,
} from "../../../api/apiRequest";
import { setUsers } from "../../../redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UsersList({ users }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const usersFromDatabase = await getListFromDatabase("users");
      dispatch(setUsers(usersFromDatabase));
    } catch (error) {
      console.error("Error retrieving users from database", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (dataFromSearch) => {
    setSearchedUsers(dataFromSearch);
  };

  const sortedUsers = [
    ...(searchedUsers.length > 0 ? searchedUsers : users),
  ].sort((a, b) => {
    const firstNameComparison = a.firstName.localeCompare(b.firstName);
    return firstNameComparison !== 0
      ? firstNameComparison
      : a.lastName.localeCompare(b.lastName);
  });

  // const toggleFollow = async (userId, isAdding) => {
  //   const followerReduxAction = isAdding ? addFollower : deleteFollower;
  //   try {
  //     const followerData = isAdding
  //       ? { idFrom: [loggedUser.id], idTo: [userId] }
  //       : followers?.find((item) => item?.idTo?.[0] === userId);
  //     if (isAdding) {
  //       await addRecordToDatabase("followers", followerData);
  //     } else if (followerData?.id) {
  //       await deleteRecordFromDatabase("followers", followerData.id);
  //     }
  //     dispatch(followerReduxAction(followerData));

  //     const updatedUsers = await getListFromDatabase("users");
  //     dispatch(setUsers(updatedUsers));

  //     const refreshLoggedUser = updatedUsers.find(
  //       (user) => user.id === loggedUser.id
  //     );
  //     dispatch(setLoggedUser(refreshLoggedUser));
  //     fetchFollowers?.();
  //   } catch (error) {
  //     console.error(
  //       `Error ${isAdding ? "adding" : "removing"} follower`,
  //       error
  //     );
  //   }
  // };

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
        {(searchedUsers.length > 0 ? searchedUsers : sortedUsers).map(
          (user, index) => (
            <div key={index}>
              <SingleUserInList
                loggedUser={loggedUser}
                user={user}
              />
            </div>
          )
        )}
        {users.length === 0 && (
          <p className="text-lg gray-500">No users to show.</p>
        )}
      </div>
    </div>
  );
}

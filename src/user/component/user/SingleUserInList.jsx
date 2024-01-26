import React from "react";
import UserDetails from "./UserDetails";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
  getListFromDatabase,
} from "../../../api/apiRequest";
import { setLoggedUser } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../../redux/slices/usersSlice";
import FollowAndUnfollowButtons from "./FollowAndUnfollowButtons";
import { fetchFollowers } from "../../Utilities/fetchFunctions";

export default function SingleUserInList({ user }) {
  const loggedUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.followers);

  const dispatch = useDispatch();

  const toggleFollow = async (userId, isAdding) => {
    try {
      const currentRecord = isAdding
        ? { idFrom: [loggedUser.id], idTo: [userId] }
        : followers?.find(
            (item) =>
              item?.idTo?.[0] === userId && item.idFrom[0] === loggedUser.id
          );
      if (isAdding) {
        await addRecordToDatabase("followers", currentRecord);
      } else if (currentRecord?.id) {
        await deleteRecordFromDatabase("followers", currentRecord.id);
      }
      fetchFollowers?.(dispatch);
      const updatedUsers = await getListFromDatabase("users");
      dispatch(setUsers(updatedUsers));
      const refreshLoggedUser = updatedUsers.find(
        (user) => user.id === loggedUser.id
      );
      dispatch(setLoggedUser(refreshLoggedUser));
    } catch (error) {
      console.error(
        `Error ${isAdding ? "adding" : "removing"} follower`,
        error
      );
    }
  };
  return (
    <div className="flex justify-between items-center border-b border-gray-400 w-full py-2">
      <UserDetails
        firstName={user.firstName}
        lastName={user.lastName}
        email={user.email}
        role={user.role}
      />
      <FollowAndUnfollowButtons
        loggedUser={loggedUser}
        toggleFollow={toggleFollow}
        user={user}
      />
    </div>
  );
}

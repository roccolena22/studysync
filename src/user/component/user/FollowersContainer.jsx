import React, { useEffect } from "react";
import {
  addRecordToDatabase,
  deleteRecordFromDatabase,
  getListFromDatabase,
} from "../../../api/apiRequest";
import {
  addFollower,
  removeFollower,
  setFollowers,
} from "../../../redux/followersSlice";
import { setUsers } from "../../../redux/usersSlice";
import DiscoverUsers from "./DiscoverUsers";
import ManageUsers from "./ManageUsers";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../../../redux/authSlice";

export default function FollowersContainer({ followers, users, loggedUser }) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const followersFromDatabase = await getListFromDatabase("followers");
        dispatch(setFollowers(followersFromDatabase));
      } catch (error) {
        console.error("Error retrieving followers from database", error);
      }
    })();
  }, [dispatch]);

  const toggleFollow = async (userFollowedId, isAdding) => {
    const followerAction = isAdding ? addFollower : removeFollower;

    const followerData = isAdding
      ? { idFrom: [loggedUser.id], idTo: [userFollowedId] }
      : followers.find((item) => item.idTo[0] === userFollowedId);

    try {
      if (isAdding) {
        await addRecordToDatabase("followers", followerData);
      } else {
        await deleteRecordFromDatabase("followers", followerData.id);
      }

      dispatch(followerAction(followerData));

      const updatedUsers = await getListFromDatabase("users");
      const refreshLoggedUser = updatedUsers.find((user) => user.email === loggedUser.email);

      dispatch(setLoggedUser(refreshLoggedUser));
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error(`Error ${isAdding ? 'adding' : 'removing'} follower`, error);
    } finally {
      fetchFollowers();
    }
  };

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 pt-6">
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <DiscoverUsers
          loggedUser={loggedUser}
          followers={followers}
          users={users}
          toggleFollow={toggleFollow}
        />
      </div>
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
          toggleFollow={toggleFollow}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  addToDatabase,
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

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [dispatch]);

  const addFollowers = async (userFollowedId) => {
    const newFollower = {
      idFrom: [loggedUser.id],
      idTo: [userFollowedId],
    };

    try {
      await addToDatabase("followers", newFollower);
      const users = await getListFromDatabase("users");
      dispatch(setUsers(users));
      const refreshLoggedUser = users.find((user) => user.email === loggedUser.email);
      dispatch(setLoggedUser(refreshLoggedUser));
      dispatch(addFollower(newFollower));
      fetchFollowers();
    } catch (error) {
      console.error("Error adding followers", error);
    }
  };
  const removeFollow = async (userFollowedId) => {
    const result = followers.find((item) => item.idTo[0] === userFollowedId);
    if (result.id) {
      try {
        await deleteRecordFromDatabase("followers", result.id);
        dispatch(removeFollower(result));
        const users = await getListFromDatabase("users");
        const refreshLoggedUser = users.find((user) => user.email === loggedUser.email);
        dispatch(setLoggedUser(refreshLoggedUser));
        dispatch(setUsers(users));
        fetchFollowers();
      } catch (error) {
        console.error("Error removing follower", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 pt-6">
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <DiscoverUsers
          loggedUser={loggedUser}
          followers={followers}
          users={users}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
        />
      </div>
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
        />
      </div>    </div>
  );
}

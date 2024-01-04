import { useEffect } from "react";
import { setFollowers } from "../../../redux/slices/followersSlice";
import DiscoverUsers from "./DiscoverUsers";
import ManageUsers from "./ManageUsers";
import { useDispatch } from "react-redux";
import { getListFromDatabase } from "../../../api/apiRequest";

export default function FollowersContainer({ followers, users, loggedUser }) {
  const dispatch = useDispatch()

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };
  useEffect(() => {
    fetchFollowers()
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 pt-6">
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <DiscoverUsers
          loggedUser={loggedUser}
          users={users}
        />
      </div>
      <div className="bg-white w-full p-3 rounded-lg shadow-lg flex justify-center items-center">
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
        />
      </div>
    </div>
  );
}

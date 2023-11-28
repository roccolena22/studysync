import { useEffect } from "react";
import {
  addToDatabase,
  deleteFromDatabase,
  getFromDatabase,
} from "../../../api/apiRequest";
import { addFollower, setFollowers } from "../../../redux/followersSlice";
import GadgetBox from "../shared/GadgetBox";
import DiscoverUsers from "./DiscoverUsers";
import ManageUsers from "./ManageUsers";
import { useDispatch } from "react-redux";

export default function FollowersContainer({ followers, users, loggedUser }) {
  const dispatch = useDispatch();

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getFromDatabase("followers");
      const followers = followersFromDatabase.map((user) => ({
        ...user.fields,
      }));
      dispatch(setFollowers(followers));
    } catch (error) {
      console.error("Errore nel recupero dei follower dal database", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, [dispatch]);

  const addFollowers = async (userFollowed) => {
    const newFollower = {
      idFrom: loggedUser.id,
      idTo: userFollowed.id,
    };
    try {
      await addToDatabase("followers", newFollower);
      dispatch(addFollower(newFollower));
      fetchFollowers();
    } catch (error) {
      console.error("Errore nell'aggiunta dei follower", error);
    }
  };

  const removeFollow = async (userToRemove) => {
    const result = followers.find((item) => item.idTo === userToRemove.id);

    await deleteFromDatabase("followers", result.id);
    fetchFollowers();
  };

  return (
    <div className="flex w-full space-x-4 pt-6">
      <GadgetBox>
        <DiscoverUsers
          loggedUser={loggedUser}
          users={users}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
        />
      </GadgetBox>
      <GadgetBox>
        <ManageUsers
          users={users}
          followers={followers}
          loggedUser={loggedUser}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
        />
      </GadgetBox>
    </div>
  );
}

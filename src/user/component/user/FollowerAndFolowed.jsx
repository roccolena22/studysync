import { useEffect, useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";
import { setFollowers } from "../../../redux/slices/followersSlice";
import { getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";

export default function FollowerAndFollowed({
  loggedUserFollowing,
  loggedUserFollowers,
  loggedUser,
}) {
  const [indexSection, setIndexSection] = useState(0);

  const dispatch = useDispatch()

  const handleSections = (index) => {
    setIndexSection(index);
  };

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
    <div className="pt-2">
      <TabMenu
        firstSectionName="Following"
        secondSectionName="Followers"
        handleSections={handleSections}
      />
      {indexSection === 0 ? (
        <UsersList
          users={loggedUserFollowing}
          loggedUser={loggedUser}
          excludeLogged
        />
      ) : (
        <UsersList
          users={loggedUserFollowers}
          loggedUser={loggedUser}
          excludeLogged
        />
      )}
    </div>
  );
}

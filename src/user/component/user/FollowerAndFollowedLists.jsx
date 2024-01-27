import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";
import { useSelector } from "react-redux";

export default function FollowerAndFollowedLists({
  followingIds,
  followersIds,
  indexClicked,
}) {
  const users = useSelector((state) => state.users);
  const [indexSection, setIndexSection] = useState(indexClicked);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  const loggedUserFollowing =
    users && users.filter((user) => followingIds.includes(user.id));

  const loggedUserFollowers =
    users && users.filter((user) => followersIds.includes(user.id));

  return (
    <div className="pt-2">
      <TabMenu
        firstSectionName="Following"
        secondSectionName="Followers"
        handleSections={handleSections}
        indexClicked={indexClicked}
      />
      <UsersList
        usersToShow={
          indexSection === 0 ? loggedUserFollowing : loggedUserFollowers
        }
      />
    </div>
  );
}

import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  loggedUserFollowing,
  loggedUserFollowers,
  loggedUser,
}) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };
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

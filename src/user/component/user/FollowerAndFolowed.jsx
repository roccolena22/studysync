import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  loggedUserFollowing,
  loggedUserFollowers,
  loggedUser,
  indexClicked,
}) {
  const [indexSection, setIndexSection] = useState(indexClicked);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="pt-2">
      <TabMenu
        firstSectionName="Following"
        secondSectionName="Followers"
        handleSections={handleSections}
        indexClicked={indexClicked}
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

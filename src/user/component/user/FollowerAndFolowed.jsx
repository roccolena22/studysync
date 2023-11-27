import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  following,
  followers,
  loggedUser,
  addFollowers,
  removeFollow,
}) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };
  return (
    <div className="pt-2">
      <TabMenu
        firstSectionName="following"
        secondSectionName="Followers"
        handleSections={handleSections}
      />
      {indexSection === 0 ? (
        <UsersList
          users={following}
          followers={followers}
          loggedUser={loggedUser}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
          excludeLogged
        />
      ) : (
        <UsersList
          users={followers}
          followers={followers}
          loggedUser={loggedUser}
          addFollowers={addFollowers}
          removeFollow={removeFollow}
          excludeLogged
        />
      )}
    </div>
  );
}

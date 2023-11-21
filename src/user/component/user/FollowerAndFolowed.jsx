import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  following,
  followers,
  loggedUser,
  addFollowed,
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
          loggedUser={loggedUser}
          addFollowed={addFollowed}
          removeFollow={removeFollow}
        />
      ) : (
        <UsersList
          users={followers}
          loggedUser={loggedUser}
          addFollowed={addFollowed}
          removeFollow={removeFollow}
        />
      )}
    </div>
  );
}

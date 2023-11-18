import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  followed,
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
        firstSectionName="Followed"
        secondSectionName="Followers"
        handleSections={handleSections}
      />
      {indexSection === 0 ? (
        <UsersList
          users={followed}
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

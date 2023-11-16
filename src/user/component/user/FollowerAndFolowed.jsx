import { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";

export default function FollowerAndFollowed({
  followed,
  followers,
  infoLoggedUser,
  handleFollow,
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
          infoLoggedUser={infoLoggedUser}
          handleFollow={handleFollow}
          removeFollow={removeFollow}
        />
      ) : (
        <UsersList
          users={followers}
          infoLoggedUser={infoLoggedUser}
          handleFollow={handleFollow}
          removeFollow={removeFollow}
        />
      )}
    </div>
  );
}

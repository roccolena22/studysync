import React, { useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";
import { useSelector } from "react-redux";

interface User {
  id: string;
  [key: string]: any;
}

interface RootState {
  users: User[];
}

interface FollowerAndFollowedListsProps {
  followingIds: string[];
  followersIds: string[];
  indexClicked: number;
}

export default function FollowerAndFollowedLists({
  followingIds,
  followersIds,
  indexClicked,
}: FollowerAndFollowedListsProps): JSX.Element {
  const users = useSelector((state: RootState) => state.users);
  const [indexSection, setIndexSection] = useState<number>(
    typeof indexClicked === "number" ? indexClicked : 0
  );


  const handleSections = (index: number) => {
    setIndexSection(index);
  };

  const loggedUserFollowing = users.filter((user) =>
    followingIds.includes(user.id)
  );

  const loggedUserFollowers = users.filter((user) =>
    followersIds.includes(user.id)
  );

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

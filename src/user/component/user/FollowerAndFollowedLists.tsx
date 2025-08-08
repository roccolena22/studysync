import React, { useEffect, useState } from "react";
import TabMenu from "../navigation/TabMenu";
import UsersList from "./UserList";
import { getUsersByFilter } from "../../../api/apiUsers";
import { Follower } from "../../models";

interface FollowerAndFollowedListsProps {
  following: Follower[];
  followers: Follower[];
  indexClicked: number;
}

export default function FollowerAndFollowedLists({
  following,
  followers,
  indexClicked,
}: FollowerAndFollowedListsProps): JSX.Element {
  const [indexSection, setIndexSection] = useState<number>(
    typeof indexClicked === "number" ? indexClicked : 0
  );

  const [loggedUserFollowing, setLoggedUserFollowing] = useState<any[]>([]);
  const [loggedUserFollowers, setLoggedUserFollowers] = useState<any[]>([]);

  const handleSections = (index: number) => {
    setIndexSection(index);
  };

  useEffect(() => {
   
    const followingUserIds = following
      .map((f) => f.idTo[0])
      .filter((id): id is string => !!id);

    const followerUserIds = followers
      .map((f) => f.idFrom[0])
      .filter((id): id is string => !!id);

    const buildFilterFormula = (ids: string[]) => {
      if (ids.length === 0) return "";
      const conditions = ids.map((id) => `RECORD_ID()='${id}'`).join(", ");
      return `OR(${conditions})`;
    };

    const fetchUsers = async () => {
      try {
        if (followingUserIds.length > 0) {
          const formula = buildFilterFormula(followingUserIds);
          const users = await getUsersByFilter(formula);
          setLoggedUserFollowing(users);
        } else {
          setLoggedUserFollowing([]);
        }

        if (followerUserIds.length > 0) {
          const formula = buildFilterFormula(followerUserIds);
          const users = await getUsersByFilter(formula);
          setLoggedUserFollowers(users);
        } else {
          setLoggedUserFollowers([]);
        }
      } catch (error) {
        console.error("Errore fetch utenti filtrati:", error);
      }
    };

    fetchUsers();
  }, [following, followers]);

  return (
    <div className="pt-2">
      <TabMenu
        firstSectionName="Following"
        secondSectionName="Followers"
        handleSections={handleSections}
        indexClicked={indexClicked}
      />
      <UsersList
        usersToShow={indexSection === 0 ? loggedUserFollowing : loggedUserFollowers}
      />
    </div>
  );
}

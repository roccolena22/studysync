import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsListContainer from "../component/EventsListContainer";
import TitlePage from "../component/shared/TitlePage";
import GadgetBox from "../component/shared/GadgetBox";
import DiscoverUsers from "../component/user/DiscoverUsers";
import ManageUsers from "../component/user/ManageUsers";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "../hooks/localStorageHooks";

export default function Dashboard({ loggedUser }) {
  const [indexSection, setIndexSection] = useState(0);
  const [users, setUsers] = useState(getFromLocalStorage("users", []));
  const [followed, setFollowed] = useState(loggedUser.followed);

  const simpleLoggedUser = {
    ...loggedUser,
    password: undefined,
    confirmPassword: undefined,
    followed: undefined,
    followers: undefined,
  };

  const addFollowed = (userFollowed) => {
    const updatedUser = { ...userFollowed, followers: [simpleLoggedUser] };
    setFollowed((prevFollowed) => [...prevFollowed, updatedUser]);
  };

  const removeFollow = (email) => {};

  useEffect(() => {
    const updatedFollowed = users.map((user) => {
      if (user.email === loggedUser.email) {
        return {
          ...user,
          followed: [
            ...followed.map(({ name, surname, email, role }) => ({
              name,
              surname,
              email,
              role,
            })),
          ],
        };
      } else {
        return user;
      }
    });

    const combinedArray =
      followed.length > 0
        ? updatedFollowed.map((item1) => {
            const matchingItem2 = followed.find(
              (item2) => item2 && item1 && item2.email === item1.email
            );
            return matchingItem2 ? { ...item1, ...matchingItem2 } : item1;
          })
        : updatedFollowed;

    addToLocalStorage("users", combinedArray);
    setUsers(combinedArray);
  }, [followed, loggedUser]);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TitlePage title="Dashboard" />
      <div className="flex w-full space-x-4 pt-6">
        <GadgetBox>
          <DiscoverUsers
            loggedUser={loggedUser}
            users={users}
            addFollowed={addFollowed}
            removeFollow={removeFollow}
          />
        </GadgetBox>
        <GadgetBox>
          <ManageUsers
            loggedUser={loggedUser}
            users={users}
            addFollowed={addFollowed}
            removeFollow={removeFollow}
          />
        </GadgetBox>
      </div>
      <div className="w-full pt-10">
        <TabMenu
          firstSectionName="Next events"
          secondSectionName="Past events"
          handleSections={handleSections}
        />
      </div>
      <EventsListContainer
        indexSection={indexSection}
        loggedUser={loggedUser}
      />
    </div>
  );
}

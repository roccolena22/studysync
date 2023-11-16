import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsContainer from "../component/EventsContainer";
import TitlePage from "../component/shared/TitlePage";
import GadgetBox from "../component/shared/GadgetBox";
import DiscoverUsers from "../component/user/DiscoverUsers";
import ManageUsers from "../component/user/ManageUsers";
import {
  addToLocalStorage,
  getFromLocalStorage,
} from "../hooks/localStorageHooks";
import { getUser } from "../hooks/getUser";

export default function Dashboard({ infoLoggedUser }) {
  const [indexSection, setIndexSection] = useState(0);
  const [draftFollowed, setDraftFollowed] = useState([]);
  const users = getFromLocalStorage("users", []);
  const handleFollow = (email) => {
    const userToAdd = getUser(email);
    if (
      !draftFollowed.some(
        (existingUser) => existingUser.email === userToAdd.email
      )
    ) {
      setDraftFollowed((prevFollowed) => [...prevFollowed, userToAdd]);
    }
  };
  const removeFollow = (email) => {
    console.log(email);
  };
  const fullCurrentUser = getUser(infoLoggedUser.email);
  const basicCurrentUser = {
    ...fullCurrentUser,
    password: undefined,
    confirmPassword: undefined,
    followed: undefined,
    followers: undefined,
  };
  const updatedFollowers = draftFollowed.map((user) => ({
    ...user,
    followers: [basicCurrentUser],
  }));
  const updatedFollowed = users.map((user) =>
    user.email === infoLoggedUser.email
      ? {
          ...user,
          followed: [
            ...updatedFollowers.map(({ name, surname, email, role }) => ({
              name,
              surname,
              email,
              role,
            })),
          ],
        }
      : user
  );
  const combinedArray = updatedFollowed.map((item1) => {
    const matchingItem2 = updatedFollowers.find(
      (item2) => item2 && item1 && item2.email === item1.email
    );
    return matchingItem2 ? { ...item1, ...matchingItem2 } : item1;
  });

  useEffect(() => {
    addToLocalStorage("users", combinedArray);
  }, [combinedArray]);
  const handleSections = (index) => {
    setIndexSection(index);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <TitlePage title="Dashboard" />
      <div className="flex w-full space-x-4 pt-6">
        <GadgetBox>
          <DiscoverUsers
            infoLoggedUser={infoLoggedUser}
            users={users}
            handleFollow={handleFollow}
            removeFollow={removeFollow}
          />
        </GadgetBox>
        <GadgetBox>
          <ManageUsers
            infoLoggedUser={infoLoggedUser}
            combinedArray={combinedArray}
            handleFollow={handleFollow}
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
      <EventsContainer
        indexSection={indexSection}
        infoLoggedUser={infoLoggedUser}
      />
    </div>
  );
}

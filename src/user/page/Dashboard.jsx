import React, { useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsListContainer from "../component/EventsListContainer";
import TitlePage from "../component/shared/TitlePage";
import GadgetBox from "../component/shared/GadgetBox";
import DiscoverUsers from "../component/user/DiscoverUsers";
import ManageUsers from "../component/user/ManageUsers";
import { addToLocalStorage, getFromLocalStorage } from "../hooks/localStorageHooks";
import { addToDatabase } from "../../api/usersApi";

export default function Dashboard({ loggedUser }) {
  const [indexSection, setIndexSection] = useState(0);
  const [followers, setFollowers] = useState(getFromLocalStorage("followers", []));

  const usersFromDatabase = getFromLocalStorage("usersFromDatabase", []); //sarà sostituito con la chiamata al database

  const arrayWithFieldsOnly = usersFromDatabase.map((item) => item.fields);

  const [users, setUsers] = useState(arrayWithFieldsOnly);

  const addFollowed = (userFollowed) => {

    const followersArray = [
      {
        idFrom: loggedUser.id,
        idTo: userFollowed.id,
      },
    ];
    
    addToDatabase("followers", followersArray);

    setFollowers((prevFollowers) => [...prevFollowers, followersArray]);

    addToLocalStorage("followers", followers)
  };

  const removeFollow = (email) => {};

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
          followers={followers}
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

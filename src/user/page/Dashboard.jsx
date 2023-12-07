import React, { useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsContainer from "../component/EventsContainer";
import TitlePage from "../component/shared/TitlePage";
import FollowersContainer from "../component/user/FollowersContainer";

export default function Dashboard({ loggedUser, users, followers, events }) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <TitlePage title="Dashboard" />
      <FollowersContainer followers={followers} users={users} loggedUser={loggedUser}/>
      <div className="w-full pt-10">
        <TabMenu
          firstSectionName="Next events"
          secondSectionName="Past events"
          handleSections={handleSections}
        />
      </div>
      <EventsContainer
        indexSection={indexSection}
        loggedUser={loggedUser}
        events={events}
        users={users}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsContainer from "../component/EventsContainer";
import Title from "../component/shared/Title";
import FollowersContainer from "../component/user/FollowersContainer";

export default function DashboardPage({ loggedUser, users, followers, events, bookings }) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard" />
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
        followers={followers}
        bookings={bookings}
      />
    </div>
  );
}

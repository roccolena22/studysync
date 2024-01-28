import React, { useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsContainer from "../component/StatisticsContainer";

export default function DashboardPage({ userPastEvents, userActiveEvents }) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  const data = {one: 1};
  data.two = 22;

  console.log(data)

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard">
        <NewEvent name="New Event" />
      </Title>
      <StatisticsContainer activeEvents={userActiveEvents} />
      <div className="w-full pt-10">
        <Title title="Events created by me" fontSize="text-lg" />
      </div>
      <TabMenu
        firstSectionName="Active events"
        secondSectionName="Past events"
        handleSections={handleSections}
      />
      <EventList
        eventsToShow={indexSection === 0 ? userActiveEvents : userPastEvents}
      />
    </div>
  );
}

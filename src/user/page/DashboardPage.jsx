import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsSection from "../component/user/StatisticsSection";

export default function DashboardPage({ userPastEvents, userActiveEvents }) {
  const [indexSection, setIndexSection] = useState(0);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard">
        <NewEvent name="New Event" />
      </Title>
      <StatisticsSection
        activeEvents={userActiveEvents}
      />
      <div className="w-full pt-10">
        <Title title="My events" fontSize="text-lg" />
        <TabMenu
          firstSectionName="Active events"
          secondSectionName="Past events"
          handleSections={handleSections}
        />
      </div>
      <div className="w-full">
        {indexSection === 0 ? (
          <EventList
            events={userActiveEvents}
  
          />
        ) : (
          <EventList
            events={userPastEvents}
  
          />
        )}
      </div>
    </div>
  );
}

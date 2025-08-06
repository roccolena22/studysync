import React, { useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsContainer from "../component/StatisticsContainer";

interface Event {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  // Aggiungi altre proprietà se necessario
}

interface DashboardPageProps {
  userPastEvents: any[];
  userActiveEvents: any[];
}

export default function DashboardPage({
  userPastEvents,
  userActiveEvents,
}: DashboardPageProps): JSX.Element {
  const [indexSection, setIndexSection] = useState<number>(0);

  const handleSections = (index: number): void => {
    setIndexSection(index);
  };

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

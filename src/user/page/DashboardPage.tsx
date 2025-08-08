import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsContainer from "../component/StatisticsContainer";
import { useSelector } from "react-redux";
import moment from "moment";
import { getEventRecordsByFilter } from "../../api/apiEvents";
import { EventModel } from "../models";

export default function DashboardPage(): JSX.Element {
  const [indexSection, setIndexSection] = useState<number>(0);

  const [userActiveEvents, setUserActiveEvents] = useState<EventModel[]>([]);
  const [userPastEvents, setUserPastEvents] = useState<EventModel[]>([]);
  const [userAllActiveEvents, setUserAllActiveEvents] = useState<EventModel[]>([]); // attivi (autore + prenotato)

  const loggedUserId = useSelector((state: any) => state.auth.user.id);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const now = moment();

        // Eventi creati dall’utente
        const ownedEventsFormula = `{authorId} = '${loggedUserId}'`;
        const ownedEvents = await getEventRecordsByFilter(ownedEventsFormula);

        const activeOwnedEvents = ownedEvents.filter((event) =>
          moment(
            `${event.endDate} ${event.endTime}`,
            "YYYY-MM-DD HH:mm"
          ).isSameOrAfter(now)
        );

        const pastOwnedEvents = ownedEvents.filter((event) =>
          moment(
            `${event.endDate} ${event.endTime}`,
            "YYYY-MM-DD HH:mm"
          ).isBefore(now)
        );

        // Eventi dove è autore o prenotato
        const allActiveFormula = `OR({authorId} = '${loggedUserId}', FIND('${loggedUserId}', ARRAYJOIN({bookingsRecordId})))`;
        const allEvents = await getEventRecordsByFilter(allActiveFormula);

        const allActiveEvents = allEvents.filter((event) =>
          moment(
            `${event.endDate} ${event.endTime}`,
            "YYYY-MM-DD HH:mm"
          ).isSameOrAfter(now)
        );

        setUserActiveEvents(activeOwnedEvents);
        setUserPastEvents(pastOwnedEvents);
        setUserAllActiveEvents(allActiveEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    if (loggedUserId) fetchEvents();
  }, [loggedUserId]);

  const handleSections = (index: number): void => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard">
        <NewEvent name="New Event" />
      </Title>

      <StatisticsContainer
        userAllActiveEvents={userAllActiveEvents}
        userActiveEvents={userActiveEvents}
        userPastEvents={userPastEvents}
        loggedUserId={loggedUserId}
      />

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

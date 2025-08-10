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
import Loader from "../../shared/component/Loader";
import { DefaultColor } from "../../shared/models";
import Icon from "../../shared/component/Icon";
import { useNavigate } from "react-router-dom";

export default function DashboardPage(): JSX.Element {

   const navigate = useNavigate();

  const [indexSection, setIndexSection] = useState<number>(0);

  const [userActiveEvents, setUserActiveEvents] = useState<EventModel[]>([]);
  const [userPastEvents, setUserPastEvents] = useState<EventModel[]>([]);
  const [userAllActiveEvents, setUserAllActiveEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // stato di caricamento

  const loggedUserId = useSelector((state: any) => state.auth.user.id);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // inizia il caricamento
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
      } finally {
        setLoading(false); // fine caricamento
      }
    };

    if (loggedUserId) fetchEvents();
  }, [loggedUserId]);

  const handleSections = (index: number): void => {
    setIndexSection(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)}/>
      <Title title="Dashboard">
        <NewEvent name="New Event" />
      </Title>
      </div>

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

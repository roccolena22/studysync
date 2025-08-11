import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsContainer from "../component/StatisticsContainer";
import Loader from "../../shared/component/Loader";
import Icon from "../../shared/component/Icon";
import { DefaultColor } from "../../shared/models";
import { useNavigate } from "react-router-dom";
import { getEventRecordsByFilter } from "../../api/apiEvents";

export default function DashboardPage(): JSX.Element {
  const navigate = useNavigate();
  const loggedUserId = useSelector((state: any) => state.auth.user.id);

  const [indexSection, setIndexSection] = useState<number>(0);

  // Query per prendere eventi creati dall'utente
  const ownedEventsQuery = useQuery({
    queryKey: ["ownedEvents", loggedUserId],
    queryFn: () =>
      getEventRecordsByFilter(`{authorId} = '${loggedUserId}'`),
    enabled: !!loggedUserId,
    staleTime: 1000 * 60 * 5,
  });

  // Query per prendere eventi dove è autore o prenotato
  const allActiveEventsQuery = useQuery({
    queryKey: ["allActiveEvents", loggedUserId],
    queryFn: () =>
      getEventRecordsByFilter(
        `OR({authorId} = '${loggedUserId}', FIND('${loggedUserId}', ARRAYJOIN({bookingsRecordId})))`
      ),
    enabled: !!loggedUserId,
    staleTime: 1000 * 60 * 5,
  });

  if (ownedEventsQuery.isLoading || allActiveEventsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  if (ownedEventsQuery.isError || allActiveEventsQuery.isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Failed to load events. Please try again later.
      </div>
    );
  }

  const now = moment();

  // Filtra eventi attivi e passati tra quelli creati dall'utente
  const userActiveEvents = (ownedEventsQuery.data || []).filter((event) =>
    moment(event.endDate).isSameOrAfter(now)
  );
  const userPastEvents = (ownedEventsQuery.data || []).filter((event) =>
    moment(event.endDate).isBefore(now)
  );

  // Filtra eventi attivi tra quelli dove è autore o prenotato
  const userAllActiveEvents = (allActiveEventsQuery.data || []).filter(
    (event) => moment(event.endDate).isSameOrAfter(now)
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)} />
        <Title title="Dashboard">
          <NewEvent
            name="New Event"
            onEventCreated={() => {
              ownedEventsQuery.refetch();
              allActiveEventsQuery.refetch();
            }}
          />
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
        handleSections={setIndexSection}
      />

      <EventList
        eventsToShow={indexSection === 0 ? userActiveEvents : userPastEvents}
      />
    </div>
  );
}

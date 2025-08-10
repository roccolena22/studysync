import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import PersonalCalendar from "../component/PersonalCalendar";
import Title from "../component/shared/Title";
import Legend from "../component/Legend";
import SwitchButton from "../component/navigation/SwitchButton";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import Message from "../../shared/component/Message";
import Loader from "../../shared/component/Loader";
import { DefaultColor, TabelName } from "../../shared/models";
import Icon from "../../shared/component/Icon";
import { useNavigate } from "react-router-dom";
import { getBookingByFilter } from "../../api/apiBookings";
import { getEventRecordsByFilter } from "../../api/apiEvents";

export default function EventsPage() {
  const navigate = useNavigate();

  const loggedUserId = useSelector((state: any) => state.auth.user.id);

  const [indexSwitch, setIndexSwitch] = useState<number>(0);

   const queryClient = useQueryClient();

  // Query per prendere i booking dell'utente
  const bookingsQuery = useQuery({
  queryKey: ["userBookings", loggedUserId],
  queryFn: () => getBookingByFilter(`{bookedId} = '${loggedUserId}'`),
  enabled: !!loggedUserId,
});


  // Query per prendere gli eventi (creati o prenotati)
const eventsQuery = useQuery({
  queryKey: [TabelName.EVENTS, loggedUserId, bookingsQuery.data],
  queryFn: async () => {
    if (!loggedUserId) return [];

    const bookedEventIds = bookingsQuery.data?.map((b: any) => b.eventId) || [];

    let eventsFormula = `{authorId} = '${loggedUserId}'`;
    if (bookedEventIds.length > 0) {
      const idsOR = bookedEventIds.map((id) => `{id} = '${id}'`).join(",");
      eventsFormula = `OR({authorId} = '${loggedUserId}', ${idsOR})`;
    }

    return getEventRecordsByFilter(eventsFormula);
  },
  enabled: !!loggedUserId && !!bookingsQuery.data,
});


  const handleSwitch = (index: number) => {
    setIndexSwitch(index);
  };

  if (bookingsQuery.isLoading || eventsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="h-22 w-22" color={DefaultColor.TEXT_PRIMARY_COLOR} />
      </div>
    );
  }

  if (bookingsQuery.isError || eventsQuery.isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Failed to load events. Please try again later.
      </div>
    );
  }

  const currentDate = moment();
  const activeEvents = (eventsQuery.data || []).filter((event) =>
    moment(event.endDate).isSameOrAfter(currentDate)
  );

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex space-x-4 w-full items-center border-b border-slate-400 pb-2">
        <Icon name="back" onClick={() => navigate(-1)} />
        <Title title="Events">
          <div className="flex flex-col gap-2 sm:flex-row align-center justify-center items-center sm:space-x-4">
             <NewEvent
  name="New event"
  onEventCreated={() => queryClient.invalidateQueries({ queryKey: [TabelName.EVENTS] })}
/>
            <SwitchButton
              firstItem="grid"
              secondItem="calendar"
              handleSwitch={handleSwitch}
              indexSwitch={indexSwitch}
            />
          </div>
        </Title>
      </div>
      <div className="w-full">
        {indexSwitch === 0 ? (
          <EventList eventsToShow={activeEvents} />
        ) : (
          <div className="flex flex-col items-center pt-8">
            <div className="pb-6">
              <Legend
                colorOne="bg-green-500"
                colorTwo="bg-orange-600"
                textOne="Your events"
                textTwo="Events you attend"
              />
            </div>
            <PersonalCalendar events={eventsQuery.data || []} />
            <Message
              text="Use the calendar to choose when to create your event"
              iconName="light"
              iconStyle="text-yellow-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}

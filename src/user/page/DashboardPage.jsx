import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import StatisticsSection from "../component/user/StatisticsSection";

export default function DashboardPage({
  loggedUser,
  fetchFollowers,
  events,
  bookings,
}) {
  const [indexSection, setIndexSection] = useState(0);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  useEffect(() => {
    const handleBookedEvents = async () => {
      const eventsByBooked =
        events &&
        events.filter((event) => {
          if (event.bookingsRecordId) {
            return event.bookingsRecordId.some((bookingId) =>
              bookings.some(
                (booking) =>
                  bookingId === booking.id && booking.bookedId === loggedUser.id
              )
            );
          }
          return false;
        });
      setBookedEvents(eventsByBooked);
    };
    handleBookedEvents();
  }, [events, bookings, loggedUser]);

  useEffect(() => {
    const eventsByAuthor =
      events && events.filter((event) => event.authorId === loggedUser.id);

    const currentDate = new Date();

    const activeEventsFiltered = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    setActiveEvents(activeEventsFiltered);

    const pastEventsFiltered = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );
    setPastEvents(pastEventsFiltered);
  }, [events, loggedUser]);
  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard">
        <NewEvent loggedUser={loggedUser} name="New Event" />
      </Title>
      <StatisticsSection
        loggedUser={loggedUser}
        activeEvents={activeEvents}
        bookedEvents={bookedEvents}
        fetchFollowers={fetchFollowers}
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
            loggedUser={loggedUser}
            events={activeEvents}
            fetchFollowers={fetchFollowers}
          />
        ) : (
          <EventList
            loggedUser={loggedUser}
            events={pastEvents}
            fetchFollowers={fetchFollowers}
          />
        )}
      </div>
    </div>
  );
}

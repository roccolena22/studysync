import React, { useState, useEffect } from "react";
import EventList from "./card/EventList";

export default function EventsContainer({
  loggedUser,
  indexSection,
  events,
  users,
  bookings
}) {
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const handleBookedEvents = async () => {
      const eventsByBooked = events.filter((event) => {
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
      const eventsByAuthor = events.filter(
        (event) => event.authorId === loggedUser.id
      );
      const allEvents = [...eventsByAuthor, ...eventsByBooked];
      setCalendarEvents(allEvents);
    };

    handleBookedEvents();
  }, [events]);

  const currentDate = new Date();

  useEffect(() => {
    const nextEventsFiltered = calendarEvents.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    const pastEventsFiltered = calendarEvents.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );

    setNextEvents(nextEventsFiltered);
    setPastEvents(pastEventsFiltered);
  }, [events]);

  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <EventList
              loggedUser={loggedUser}
              events={nextEvents}
              users={users}
              indexSection={indexSection}
              bookings={bookings}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
              users={users}
              indexSection={indexSection}
            />
          )}
        </div>
      )}
    </div>
  );
}

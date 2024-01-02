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

  const currentDate = new Date();

  useEffect(() => {
    const handleBookedEvents = async () => { //questa logica è già presnte in Calendar
      const eventsByBooked = events && events.filter((event) => {
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
      const eventsByAuthor = events && events.filter(
        (event) => event.authorId === loggedUser.id
      );
      const allEvents = [...eventsByAuthor, ...eventsByBooked];


      const nextEventsFiltered = allEvents.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
      );
      const pastEventsFiltered = allEvents.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
      );

      setNextEvents(nextEventsFiltered);
      setPastEvents(pastEventsFiltered);
    };

    handleBookedEvents();
  }, [events, bookings, loggedUser]);

  return (
    <div className="w-full">
      {events && (
        <div className="w-full">
          {indexSection === 0 ? (
            <EventList
              loggedUser={loggedUser}
              events={nextEvents}
              users={users}
              bookings={bookings}
            />
          ) : (
            <EventList
              loggedUser={loggedUser}
              events={pastEvents}
              users={users}
            />
          )}
        </div>
      )}
    </div>
  );
}

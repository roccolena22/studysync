import { useEffect, useState } from "react";
import PersonaleCalendar from "../../user/component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import Title from "../component/shared/Title";
import Legend from "../component/user/Legend";
import { getListFromDatabase } from "../../api/apiRequest";

export default function CalendarPage({ loggedUser, followers, events }) {
  const [loggedUserEvents, setLoggedUserEvents] = useState([]);

  const handleBookedEvents = async () => {
    const bookings = await getListFromDatabase("bookings");
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
    setLoggedUserEvents(allEvents);
  };

  useEffect(() => {
    handleBookedEvents();
  }, [events]);

  return (
    <div className="flex flex-col items-center">
      <Title title="Calendar" />
      <Legend />
      <div className="w-full pt-8">
        <PersonaleCalendar
          loggedUser={loggedUser}
          followers={followers}
          events={loggedUserEvents}
        />
      </div>
      <Suggestion text="Use the calendar to choose when to create your event" />
    </div>
  );
}

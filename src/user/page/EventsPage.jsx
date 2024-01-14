import { useEffect, useState } from "react";
import PersonalCalendar from "../component/PersonalCalendar";
import Suggestion from "../component/shared/Suggestion";
import Title from "../component/shared/Title";
import Legend from "../component/user/Legend";
import SwitchTab from "../component/navigation/SwitchTab";
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";

export default function EventsPage({ loggedUser, events, bookings, users }) {
  const [nextEvents, setNextEvents] = useState([]);
  const [indexSection, setIndexSection] = useState(0);
  const currentDate = new Date();

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

    const activeEventsByUser = eventsByAuthor.filter((event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate);

    const activeEventUserBooked = eventsByBooked.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    const activeEvents = [...activeEventsByUser, ...activeEventUserBooked];
    const formattedEvents = activeEvents && activeEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.startDate + " " + event.startTime),
      end: new Date(event.endDate + " " + event.endTime),
      mode: event.mode,
      firstName: event.firstName,
      lastName: event.lastName,
      email: event.email,
      places: event.places,
      bookedRecordId: event.bookedRecordId,
      bookingsRecordId: event.bookingsRecordId,
      role: event.role,
      authorId: event.authorId,
      location: event.location,
      platform: event.platform,
      link: event.link,
      startDate: event.startDate,
      startTime: event.startTime,
      endDate: event.endDate,
      endTime: event.endTime,
    }));
    setNextEvents(formattedEvents);
  };

  useEffect(() => {
    handleBookedEvents();
  }, [events]);

  const handleSections = (index) => {
    setIndexSection(index);
  };

  return (
    <div className="flex flex-col items-center relative">
      <Title title="Next events" >
        <div className="flex items-center space-x-4">
          <NewEvent loggedUser={loggedUser} name="New event" />
          <SwitchTab firstItem="grid" secondItem="calendar" handleSections={handleSections} indexSection={indexSection} />
        </div>
      </Title>
      <div className="w-full">
        {indexSection === 0 ? (
          <EventList
            loggedUser={loggedUser}
            events={nextEvents}
            users={users}
            bookings={bookings}
          />) : (
          (
            <div className="flex flex-col items-center pt-8">
              <div className="pb-6">
                <Legend colorOne="bg-green-500" colorTwo="bg-orange-600" textOne="Your events" textTwo="Events you attend" />
              </div>
              <PersonalCalendar
                loggedUser={loggedUser}
                events={nextEvents}
              />
              <Suggestion text="Use the calendar to choose when to create your event" />
            </div>
          )
        )}
      </div>
    </div>
  );
}

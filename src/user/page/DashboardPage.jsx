import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import EventsContainer from "../component/EventsContainer";
import Title from "../component/shared/Title";
import FollowersContainer from "../component/user/FollowersContainer";

export default function DashboardPage({ loggedUser, users, followers, events, bookings }) {

  const [indexSection, setIndexSection] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const handleSections = (index) => {
    setIndexSection(index);
  };

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

  useEffect(() => {
    handleBookedEvents();
  }, [events]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard" />
      <FollowersContainer followers={followers} users={users} loggedUser={loggedUser}/>
      <div className="w-full pt-10">
        <TabMenu
          firstSectionName="Next events"
          secondSectionName="Past events"
          handleSections={handleSections}
        />
      </div>
      <EventsContainer
        indexSection={indexSection}
        loggedUser={loggedUser}
        events={calendarEvents}
        users={users}
        followers={followers}
      />
    </div>
  );
}

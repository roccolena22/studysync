import React, { useEffect, useState } from "react";
import TabMenu from "../component/navigation/TabMenu";
import Title from "../component/shared/Title";
import { useDispatch } from "react-redux";
import { getListFromDatabase } from "../../api/apiRequest";
import { setFollowers } from "../../redux/slices/followersSlice";
import ManageUsers from "../component/user/ManageUsers"
import EventList from "../component/card/EventList";
import NewEvent from "../component/shared/NewEvent";
import Gadget from "../component/user/Gadget";

export default function DashboardPage({ loggedUser, users, followers, events, bookings }) {
  const [indexSection, setIndexSection] = useState(0);
  const [pastEvents, setPastEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);

  const currentDate = new Date();
  const dispatch = useDispatch()


  const handleSections = (index) => {
    setIndexSection(index);
  };

  const fetchFollowers = async () => {
    try {
      const followersFromDatabase = await getListFromDatabase("followers");
      dispatch(setFollowers(followersFromDatabase));
    } catch (error) {
      console.error("Error retrieving followers from database", error);
    }
  };
  useEffect(() => {
    fetchFollowers()
  }, []);

  useEffect(() => {
    const handleBookedEvents = async () => { //questa logica è già presnte in eventPage
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

      const nextEventsFiltered = eventsByAuthor.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
      );
      const pastEventsFiltered = eventsByAuthor.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
      );

      setFutureEvents(nextEventsFiltered);
      setPastEvents(pastEventsFiltered);
    };

    handleBookedEvents();
  }, [events, bookings, loggedUser]);


  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard" >
        <NewEvent loggedUser={loggedUser} name="New Event" />
      </Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 w-full">
        <div className="w-full">
          <ManageUsers
            users={users}
            followers={followers}
            loggedUser={loggedUser}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <Gadget title="The next event is in:" value="6 hours" />
          <Gadget title="Next events:" value={events && futureEvents.length} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 w-full">
          <Gadget title="Events created by me:" value={loggedUser.eventIds && loggedUser.eventIds.length} />
          <Gadget title="Events I am booked for:" value={events && futureEvents.length} />
        </div>
      </div>
      <div className="w-full pt-10">
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
            events={futureEvents}
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
    </div>
  );
}

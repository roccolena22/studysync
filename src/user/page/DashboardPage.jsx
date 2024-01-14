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
  const [activeEvents, setActiveEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

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
  }, [users, loggedUser]);


  useEffect(() => {
    const handleBookedEvents = async () => {
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

      setBookedEvents(eventsByBooked)

      const eventsByAuthor = events && events.filter(
        (event) => event.authorId === loggedUser.id
      );

      const activeEventsFiltered = eventsByAuthor.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
      );
      const pastEventsFiltered = eventsByAuthor.filter(
        (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
      );

      setActiveEvents(activeEventsFiltered);
      setPastEvents(pastEventsFiltered);
    };

    handleBookedEvents();
  }, [events, bookings, loggedUser]);

console.log(activeEvents)

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard" >
        <NewEvent loggedUser={loggedUser} name="New Event" />
      </Title>
      <div className="grid grid-cols-1 gap-2 pt-6 w-full">
        <div className="grid gap-2 sm:grid-cols-2">
          <ManageUsers
            users={users}
            followers={followers}
            loggedUser={loggedUser}
          />
          <div className="grid grid-cols-1 gap-2">
            <Gadget title="Today's events:" value="0" />
            <Gadget title="The next event is in:" value="you don't have any events" />
          </div>

        </div>
        <div className="grid gap-2 sm:grid-cols-2 w-full">
          <Gadget title="My active events:" value={events ? activeEvents.length : "0"} />
          <Gadget title="Events I am booked for:" value={bookedEvents ? bookedEvents.length : "0"} />
        </div>
      </div>
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

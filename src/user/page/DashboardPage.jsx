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
import StatisticsSection from "../component/user/StatisticsSection";

export default function DashboardPage({ loggedUser, users, followers, events, bookings }) {
  const [indexSection, setIndexSection] = useState(0);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeEvents, setActiveEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  const dispatch = useDispatch()
  console.log(events) //si aggiorna all'istante non appena viene aggiunto un evento
  console.log(activeEvents) //si aggiorna solo dopo aver ricaricato la pagina

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
    };

    handleBookedEvents();
  }, [events.length, bookings, loggedUser]);


  useEffect(() => {
    const eventsByAuthor = events && events.filter(
      (event) => event.authorId === loggedUser.id
    );

    const currentDate = new Date();

    const activeEventsFiltered = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) >= currentDate
    );
    setActiveEvents(activeEventsFiltered);

    const pastEventsFiltered = eventsByAuthor.filter(
      (event) => new Date(`${event.endDate} ${event.endTime}`) < currentDate
    );
    setPastEvents(pastEventsFiltered);
  }, [events.length, loggedUser]); //essendoci events come dipendenza mi aspetto si aggiornino subito

  return (
    <div className="flex flex-col items-center justify-center">
      <Title title="Dashboard" >
        <NewEvent loggedUser={loggedUser} name="New Event" />
      </Title>
      <StatisticsSection
        users={users}
        followers={followers}
        loggedUser={loggedUser}
        activeEvents={activeEvents}
        bookedEvents={bookedEvents}
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

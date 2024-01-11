import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import { addRecordToDatabase, deleteRecordFromDatabase, getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { deleteEvent, setEvent } from "../../../redux/slices/eventsSlice";
import { addBooking, deleteBooking, setBookings } from "../../../redux/slices/bookingsSlice";

export default function EventList({
  loggedUser,
  events,
  users,
  bookings,
}) {

  const [searchedEvents, setSearchedEvents] = useState([]);
  const dispatch = useDispatch()

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
  };

  const handleDelete = async (event) => {
    await deleteRecordFromDatabase("events", event.id);
    dispatch(deleteEvent(event));
  };

  const fetchEvents = async () => {
    const eventsFromDatabase = await getListFromDatabase("events");
    const transformArray = (eventsFromDatabase) =>
      eventsFromDatabase.map(({ authorId, lastName, firstName, email, role, ...rest }) => ({
        ...rest,
        authorId: authorId[0],
        lastName: lastName[0],
        firstName: firstName[0],
        email: email[0],
        role: role[0],
      }));

    const transformedEventsArray = transformArray(eventsFromDatabase);
    dispatch(setEvent(transformedEventsArray));
  };

  const fetchBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings))
    } catch (error) {
      console.error("Error handling reservations:", error);
    }
  };

  const toggleBooking = async (eventId, isAdding) => {
    const bookingReduxAction = isAdding ? addBooking : deleteBooking;

    const bookingData = isAdding
      ? {
        eventId: [eventId],
        bookedId: loggedUser.id,
      }
      : bookings.find((item) => item.bookedId === loggedUser.id);

    try {
      if (isAdding) {
        await addRecordToDatabase("bookings", bookingData);
        dispatch(addBooking(bookingData));
      } else {
        await deleteRecordFromDatabase("bookings", bookingData.id);
        dispatch(deleteBooking(bookingData.id));
      }
      fetchBookings();
      fetchEvents();
      bookingReduxAction(isAdding ? bookingData : bookingData.id);
    } catch (error) {
      console.error(`Error ${isAdding ? 'adding' : 'removing'} booking`, error);
    } finally {
      fetchBookings();
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [dispatch]);

  useEffect(() => {
    fetchBookings();
  }, [dispatch]);

  const sortedEvents = events && events.sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`);
    const dateB = new Date(`${b.endDate} ${b.endTime}`);
    return dateA - dateB;
  });

  return (
    <div className="bg-white shadow-xl px-6 rounded-b-lg">
      <div className="sticky top-20 w-full z-10">
        {sortedEvents.length > 0 && (
          <SearchBar
            placeholder="Search by event date, title or author"
            data={sortedEvents}
            dataFromSearch={handleSearch}
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
        {(searchedEvents.length > 0 ? searchedEvents : sortedEvents).map(
          (event, index) => (
            <div
              className={
                sortedEvents.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
              key={index}
            >
              <EventCard
                users={users}
                loggedUser={loggedUser}
                event={event}
                handleDelete={handleDelete}
                toggleBooking={toggleBooking}
                fetchBookings={() => fetchBookings(event)}
                bookings={bookings}
                fetchEvents={fetchEvents}
              />
            </div>
          )
        )}
        {(events.length <= 0) && (
          <span className="text-lg text-gray-400">No events to show</span>

        )}
      </div>
    </div>
  );
}

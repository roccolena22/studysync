import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import { addRecordToDatabase, deleteRecordFromDatabase, getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { deleteEvent, setEvent } from "../../../redux/eventsSlice";
import { addBooking, deleteBooking, setBookings } from "../../../redux/bookingsSlice";

export default function EventList({
  loggedUser,
  events,
  users,
  indexSection,
  bookings,
}) {
  const [searchedEvents, setSearchedEvents] = useState([]);

  const dispatch = useDispatch()

  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`);
    const dateB = new Date(`${b.endDate} ${b.endTime}`);
    return dateA - dateB;
  });

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
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

  const handleDelete = async (event) => {
    await deleteRecordFromDatabase("events", event.id);
    dispatch(deleteEvent(event));
  };

  const fetchBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings))
    } catch (error) {
      console.error("Error handling reservations:", error);
    }
  };

  const addToBookings = async (event) => {
    const newBooking = {
      eventId: [event.id],
      bookedId: loggedUser.id,
    }
    await addRecordToDatabase("bookings", newBooking);
    dispatch(addBooking(newBooking));
  };

  const deleteToBookings = async (eventId) => {
    if (bookings && bookings.length > 0) {
      const booking = bookings.find((item) =>
        item.eventId.includes(eventId)
      );

      if (booking && booking.id && booking.bookedId === loggedUser.id) {
        try {
          await deleteRecordFromDatabase("bookings", booking.id);
          dispatch(deleteBooking(booking));
        } catch (error) {
          console.error("Error removing follower", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [dispatch, loggedUser, users, bookings]);

  useEffect(() => {
    fetchBookings();
  }, [dispatch]);

  return (
    <div>
      <div className="sticky top-20 w-full z-10">
        {sortedEvents.length > 1 && (
          <SearchBar
            placeholder="Search by event date, title or author"
            data={sortedEvents}
            dataFromSearch={handleSearch}
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
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
                addToBookings={addToBookings}
                deleteToBookings={deleteToBookings}
                indexSection={indexSection}
                fetchBookings={() => fetchBookings(event)}
                bookings={bookings}
              />
            </div>
          )
        )}
        {(events.length <= 0) && (
          <div className="col-span-2">
            <NoEvents />
          </div>
        )}
      </div>
    </div>
  );
}

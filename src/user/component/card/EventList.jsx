import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import { getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "../../../redux/slices/eventsSlice";
import { setBookings } from "../../../redux/slices/bookingsSlice";
import { sortEvents } from "../../Utilities/timeutils";
import Noitems from "../NoItems";

export default function EventList({ events }) {
  const bookings = useSelector((state) => state.bookings);
  const [searchedEvents, setSearchedEvents] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
  };

  const fetchEvents = async () => {
    const eventsFromDatabase = await getListFromDatabase("events");
    const transformArray = (eventsFromDatabase) =>
      eventsFromDatabase.map(
        ({ authorId, lastName, firstName, email, role, ...rest }) => ({
          ...rest,
          authorId: authorId[0],
          lastName: lastName[0],
          firstName: firstName[0],
          email: email[0],
          role: role[0],
        })
      );
    const transformedEventsArray = transformArray(eventsFromDatabase);
    dispatch(setEvents(transformedEventsArray));
  };

  const fetchBookings = async () => {
    try {
      const bookings = await getListFromDatabase("bookings");
      dispatch(setBookings(bookings));
    } catch (error) {
      console.error("Error handling reservations:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [events.length]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const sortedEvents = sortEvents(events);

  return (
    <div className="bg-white shadow-xl px-6 rounded-b-lg">
      {sortedEvents.length > 0 && (
        <div className="sticky top-20 w-full z-10">
          <SearchBar
            placeholder="Search by event date, title or author"
            data={sortedEvents}
            dataFromSearch={handleSearch}
          />
        </div>
      )}
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
                event={event}
                fetchBookings={() => fetchBookings(event)}
                bookings={bookings}
                fetchEvents={fetchEvents}
              />
            </div>
          )
        )}
      </div>
      {events.length <= 0 && <Noitems text="No events to show." />}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import { deleteRecordFromDatabase, getListFromDatabase } from "../../../api/apiRequest";
import { useDispatch } from "react-redux";
import { setEvent } from "../../../redux/eventsSlice";

export default function EventList({
  loggedUser,
  events,
  users,
  addToBookings,
  removeToBookings,
  indexSection,
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


  useEffect(() => {
    fetchEvents();
  }, [dispatch, loggedUser]);


  const handleDelete = async (eventId) => {
    await deleteRecordFromDatabase("events", eventId);
    fetchEvents();
  };


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
              key={index}
              className={
                sortedEvents.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
            >
                <EventCard
                  users={users}
                  fetchEvents={fetchEvents}
                  loggedUser={loggedUser}
                  event={event}
                  handleDelete={handleDelete}
                  addToBookings={addToBookings}
                  removeToBookings={removeToBookings}
                  indexSection={indexSection}
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

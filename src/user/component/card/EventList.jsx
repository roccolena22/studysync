import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import GadgetBox from "../shared/GadgetBox";

export default function EventCardList({
  loggedUser,
  events,
  users,
  handleDelete,
  handleUpdatePopup,
  handleReservationsPopup,
  addToBooked,
  indexSection,
}) {
  const [searchedEvents, setSearchedEvents] = useState([]);

  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.endDate} ${a.endTime}`);
    const dateB = new Date(`${b.endDate} ${b.endTime}`);
    return dateA - dateB;
  });

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
  };

  return (
    <div>
      <div className="sticky top-16 w-full z-20">
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
              <GadgetBox>
                <EventCard
                users={users}
                  loggedUser={loggedUser}
                  event={event}
                  handleDelete={handleDelete}
                  handleEditPopup={() => handleUpdatePopup(event)}
                  handleReservationsPopup={handleReservationsPopup}
                  addToBooked={addToBooked}
                  indexSection={indexSection}
                />
              </GadgetBox>
            </div>
          )
        )}
        {((searchedEvents.length === 0) === sortedEvents) === 0 && (
          <div className="col-span-2">
            <NoEvents />
          </div>
        )}
      </div>
    </div>
  );
}

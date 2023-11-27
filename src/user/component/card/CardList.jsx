import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import GadgetBox from "../shared/GadgetBox";

export default function CardList({
  loggedUser,
  events,
  handleDelete,
  handleUpdatePopup,
  handleReservationsPopup,
}) {
  const [eventsSearched, setEventsSearched] = useState(null);

  const handleSearch = (dataFromSearch) => {
    setEventsSearched(dataFromSearch);
  };

  return (
    <div>
      <div className="sticky top-16 w-full z-20">
        {events.length > 1 && (
          <SearchBar
            placeholder="Search by event date, title or author"
            data={events}
            dataFromSearch={handleSearch}
          />
        )}
      </div>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index}>
            <div className="w-full pt-6">
              <GadgetBox>
                <EventCard
                  loggedUser={loggedUser}
                  event={event}
                  handleDelete={handleDelete}
                  handleEditPopup={() => handleUpdatePopup(event)}
                  handleReservationsPopup={handleReservationsPopup}
                />
              </GadgetBox>
            </div>
          </div>
        ))
      ) : (
        <NoEvents />
      )}
    </div>
  );
}

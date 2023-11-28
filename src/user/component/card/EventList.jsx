import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import GadgetBox from "../shared/GadgetBox";

export default function EventCardList({
  loggedUser,
  events,
  handleDelete,
  handleUpdatePopup,
  handleReservationsPopup,
  indexSection,
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
          <div key={index} className="py-6">
              <GadgetBox>
                <EventCard
                  loggedUser={loggedUser}
                  event={event}
                  handleDelete={handleDelete}
                  handleEditPopup={() => handleUpdatePopup(event)}
                  handleReservationsPopup={handleReservationsPopup}
                  indexSection={indexSection}
                />
              </GadgetBox>
          </div>
        ))
      ) : (
        <NoEvents />
      )}
    </div>
  );
}

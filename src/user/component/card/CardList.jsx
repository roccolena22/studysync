import React, { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import GadgetBox from "../shared/GadgetBox";

export default function CardList({
  events,
  handleDelete,
  handlePartecipantPopup,
  handleUpdatePopup,
}) {
  const [eventsSearched, setEventsSearched] = useState(null);

  const handleSearch = (dataFromSearch) => {
    setEventsSearched(dataFromSearch);
  };

  const sortEventsByDateAndTime = (events) => {
    return events
      .filter((event) => event && event.start && event.startTime)
      .slice()
      .sort((event1, event2) => {
        const date1 = new Date(event1.start + " " + event1.startTime);
        const date2 = new Date(event2.start + " " + event2.startTime);
        return date1 - date2;
      });
  };
  
  const list =
    eventsSearched && eventsSearched.length > 0
      ? eventsSearched
      : sortEventsByDateAndTime(events);

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
      {list.length > 0 ? (
        list.map((event, index) => (
          <div key={index}>
            <div className="w-full pt-6">
              <GadgetBox>
                  <EventCard
                    event={event}
                    handleDelete={handleDelete}
                    handlePartecipantPopup={handlePartecipantPopup}
                    handleEditPopup={() => handleUpdatePopup(event)}
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

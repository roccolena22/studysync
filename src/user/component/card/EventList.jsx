import EventCard from "./EventCard";
import SearchBar from "../shared/SearchBar";
import NoEvents from "../shared/NoEvents";
import GadgetBox from "../shared/GadgetBox";
import { useState } from "react";

export default function EventCardList({
  loggedUser,
  events,
  handleDelete,
  handleUpdatePopup,
  handleReservationsPopup,
  indexSection,
  addToBooked,
}) {
  const [searchedEvents, setSearchedEvents] = useState([]);

  const handleSearch = (dataFromSearch) => {
    setSearchedEvents(dataFromSearch);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        {(searchedEvents.length > 0 ? searchedEvents : events).map(
          (event, index) => (
            <div
              key={index}
              className={
                events.length % 2 === 1 && index === 0
                  ? "sm:col-span-2"
                  : "sm:col-span-1"
              }
            >
              <GadgetBox>
                <EventCard
                  loggedUser={loggedUser}
                  event={event}
                  handleDelete={handleDelete}
                  handleEditPopup={() => handleUpdatePopup(event)}
                  handleReservationsPopup={handleReservationsPopup}
                  indexSection={indexSection}
                  addToBooked={addToBooked}
                />
              </GadgetBox>
            </div>
          )
        )}
        {searchedEvents.length === 0 === events === 0 && (
          <div className="col-span-2">
            <NoEvents />
          </div>
        )}
      </div>
    </div>
  );
}
